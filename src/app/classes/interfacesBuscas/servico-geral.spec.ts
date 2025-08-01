import { HttpRequest } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AuthService, LoginService, TokenService, User } from '@core';
import { LocalStorageService, MemoryStorageService } from '@shared';
import { Observable, skip } from 'rxjs';
import { ServicoGeral } from './servico-geral';

describe('ServicoGeral', () => {
  let authService: AuthService;
  let loginService: LoginService;
  let tokenService: TokenService;
  let httpMock: HttpTestingController;
  let servicoGeral: ServicoGeral;
  let user$: Observable<User>;
  const email = 'foo@bar.com';
  const token = { access_token: 'token', token_type: 'bearer' };
  const user = { id: 1, email };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: LocalStorageService, useClass: MemoryStorageService }],
    });
    loginService = TestBed.inject(LoginService);
    authService = TestBed.inject(AuthService);

    servicoGeral = TestBed.inject(ServicoGeral);
    tokenService = TestBed.inject(TokenService);
    httpMock = TestBed.inject(HttpTestingController);

    user$ = authService.user();
    authService.change().subscribe(user => {
      expect(user).toBeInstanceOf(Object);
    });
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should log in failed', () => {
    authService.login(email, 'password', false).subscribe(isLogin => expect(isLogin).toBeFalse());
    httpMock.expectOne('/auth/login').flush({});

    expect(authService.check()).toBeFalse();
  });

  it('should log in successful and get user info', () => {
    user$.pipe(skip(1)).subscribe(currentUser => expect(currentUser.id).toEqual(user.id));
    authService.login(email, 'password', false).subscribe(isLogin => expect(isLogin).toBeTrue());
    httpMock.expectOne('/auth/login').flush(token);
console.log(token);
    expect(authService.check()).toBeTrue();
    httpMock.expectOne('/me').flush(user);
  });

  it('should log out failed when user is not login', () => {
    spyOn(loginService, 'logout').and.callThrough();
    expect(authService.check()).toBeFalse();

    authService.logout().subscribe();
    httpMock.expectOne('/auth/logout');

    expect(authService.check()).toBeFalse();
    expect(loginService.logout).toHaveBeenCalled();
  });

  it('should log out successful when user is login', () => {
    tokenService.set(token);
    expect(authService.check()).toBeTrue();
    httpMock.expectOne('/me').flush(user);

    user$.pipe(skip(1)).subscribe(currentUser => expect(currentUser.id).toBeUndefined());
    authService.logout().subscribe();
    httpMock.expectOne('/auth/logout').flush({});

    expect(authService.check()).toBeFalse();
  });

  it('should refresh token when access_token is valid', fakeAsync(() => {
    tokenService.set(Object.assign({ expires_in: 5 }, token));
    expect(authService.check()).toBeTrue();
    httpMock.expectOne('/me').flush(user);
    const match = (req: HttpRequest<any>) => req.url === '/auth/refresh' && !req.body.refresh_token;

    tick(4000);
    expect(authService.check()).toBeTrue();
    httpMock.match(match)[0].flush(token);

    expect(authService.check()).toBeTrue();
    httpMock.expectNone('/me');
    tokenService.ngOnDestroy();
  }));

  it('should refresh token when access_token is invalid and refresh_token is valid', fakeAsync(() => {
    tokenService.set(Object.assign({ expires_in: 5, refresh_token: 'foo' }, token));
    const match = (req: HttpRequest<any>) =>
      req.url === '/auth/refresh' && req.body.refresh_token === 'foo';

    expect(authService.check()).toBeTrue();
    httpMock.expectOne('/me').flush(user);
    tick(10000);
    expect(authService.check()).toBeFalse();
    httpMock.match(match)[0].flush(token);

    expect(authService.check()).toBeTrue();
    httpMock.expectNone('/me');
    tokenService.ngOnDestroy();
  }));

  it('it should clear token when access_token is invalid and refresh token response is 401', fakeAsync(() => {
    spyOn(tokenService, 'set').and.callThrough();
    tokenService.set(Object.assign({ expires_in: 5, refresh_token: 'foo' }, token));
    const match = (req: HttpRequest<any>) =>
      req.url === '/auth/refresh' && req.body.refresh_token === 'foo';

    tick(10000);
    expect(authService.check()).toBeFalse();
    httpMock.expectOne('/me').flush({});
    httpMock.match(match)[0].flush({}, { status: 401, statusText: 'Unauthorized' });

    expect(authService.check()).toBeFalse();
    expect(tokenService.set).toHaveBeenCalledWith(undefined);
    tokenService.ngOnDestroy();
  }));

  it('it only call http request once when on change subscribe twice', () => {
    authService.change().subscribe();
    tokenService.set(token);
    httpMock.expectOne('/me').flush({});
  });
});

// describe('ServicoGeral', () => {
//   it('should create an instance', () => {
//     expect(new ServicoGeral()).toBeTruthy();
//   });
// });
