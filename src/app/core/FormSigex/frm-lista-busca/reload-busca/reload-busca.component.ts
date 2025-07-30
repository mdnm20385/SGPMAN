import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reload-busca',
  standalone: true,
  imports: [],
  templateUrl: './reload-busca.component.html',
  styleUrl: './reload-busca.component.scss'
})
export class ReloadBuscaComponent implements OnInit {


  private readonly router = inject(Router);
  constructor(private route: ActivatedRoute) {
    if(localStorage.getItem('currentid')!==JSON.stringify(this.route.snapshot.paramMap.get('id')) && this.route.snapshot.paramMap.get('id')!==null){
      localStorage.setItem('currentid', JSON.stringify(this.route.snapshot.paramMap.get('id')));
         window.location.reload();
      return;
    }
  }

  ngOnInit(): void {

    this.router.navigate(['/parametrizacao/listabuscaparamBucas', this.route.snapshot.paramMap.get('id')]);
    //this.router.navigate(['/parametrizacao/listabuscaparamBucas'], { queryParams: { id: this.route.snapshot.paramMap.get('id') } });
  }




}
