import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@core/authentication';

@Component({
  selector: 'app-photo-capture',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTabsModule
  ],
  template: `
    <div class="photo-capture-container">
      <h2 mat-dialog-title>
        <mat-icon>camera_alt</mat-icon>
        Capturar ou Selecionar Foto
      </h2>

      <mat-dialog-content class="dialog-content">
        <mat-tab-group>
          <!-- Tab Webcam -->
          <mat-tab label="Webcam">
            <div class="webcam-container">
              <div class="video-container" [class.has-photo]="capturedPhoto">
                <video #videoElement
                       [style.display]="capturedPhoto ? 'none' : 'block'"
                       autoplay
                       playsinline>
                </video>

                <canvas #canvasElement style="display: none;"></canvas>

                <img *ngIf="capturedPhoto"
                     [src]="capturedPhoto"
                     class="captured-image"
                     alt="Foto capturada">
              </div>

              <div class="webcam-controls">
                <button mat-raised-button
                        color="primary"
                        (click)="startCamera()"
                        [disabled]="cameraActive"
                        *ngIf="!cameraActive">
                  <mat-icon>videocam</mat-icon>
                  Iniciar Câmera
                </button>

                <button mat-raised-button
                        color="accent"
                        (click)="capturePhoto()"
                        [disabled]="!cameraActive || capturedPhoto"
                        *ngIf="cameraActive">
                  <mat-icon>camera_alt</mat-icon>
                  Capturar Foto
                </button>

                <button mat-button
                        color="warn"
                        (click)="retakePhoto()"
                        *ngIf="capturedPhoto">
                  <mat-icon>refresh</mat-icon>
                  Tirar Novamente
                </button>

                <button mat-button
                        color="warn"
                        (click)="stopCamera()"
                        *ngIf="cameraActive">
                  <mat-icon>stop</mat-icon>
                  Parar Câmera
                </button>
              </div>
            </div>
          </mat-tab>

          <!-- Tab Upload -->
          <mat-tab label="Upload">
            <div class="upload-container">
              <div class="upload-area"
                   [class.dragover]="isDragOver"
                   (dragover)="onDragOver($event)"
                   (dragleave)="onDragLeave($event)"
                   (drop)="onDrop($event)"
                   (click)="fileInput.click()">

                <input #fileInput
                       type="file"
                       accept="image/*"
                       (change)="onFileSelected($event)"
                       style="display: none;">

                <div *ngIf="!selectedFile" class="upload-prompt">
                  <mat-icon class="upload-icon">cloud_upload</mat-icon>
                  <p>Clique aqui ou arraste uma imagem</p>
                  <small>Formatos suportados: JPG, PNG, GIF (máx. 5MB)</small>
                </div>

                <div *ngIf="selectedFile" class="file-preview">
                  <img [src]="filePreview" alt="Preview" class="preview-image">
                  <p class="file-info">
                    <strong>{{ selectedFile.name }}</strong><br>
                    <small>{{ getFileSize(selectedFile.size) }}</small>
                  </p>
                  <button mat-icon-button
                          color="warn"
                          (click)="removeFile(); $event.stopPropagation()">
                    <mat-icon>delete</mat-icon>
                  </button>
                </div>
              </div>
            </div>
          </mat-tab>
        </mat-tab-group>
      </mat-dialog-content>

      <mat-dialog-actions class="dialog-actions">
        <button mat-button (click)="onCancel()">
          <mat-icon>cancel</mat-icon>
          Cancelar
        </button>

        <button mat-raised-button
                color="primary"
                (click)="onConfirm()"
                [disabled]="!hasPhoto()">
          <mat-icon>check</mat-icon>
          Confirmar
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styleUrls: ['./photo-capture.component.scss']
})
export class PhotoCaptureComponent implements OnDestroy {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  @Input() existingPhoto?: string;
  @Output() photoSelected = new EventEmitter<string>();

  cameraActive = false;
  capturedPhoto?: string;
  selectedFile?: File;
  filePreview?: string;
  isDragOver = false;
  mediaStream?: MediaStream;

  constructor(
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<PhotoCaptureComponent>
  ) {}

  ngOnDestroy() {
    this.stopCamera();
  }

  // Webcam Methods
  async startCamera() {
    try {
      this.mediaStream = await navigator.mediaDevices.
      getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }
      });

      this.videoElement.nativeElement.srcObject = this.mediaStream;
      this.cameraActive = true;
      this.capturedPhoto = undefined;
    } catch (error) {
      console.error('Erro ao acessar câmera:', error);
      this.auth.showSnackBar('Erro ao acessar a câmera. Verifique as permissões.');
    }
  }

  private readonly auth = inject(AuthService);
  capturePhoto() {
    if (!this.cameraActive) return;

    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d')!;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    this.capturedPhoto = canvas.toDataURL('image/jpeg', 0.8);
    this.stopCamera();
  }

  retakePhoto() {
    this.capturedPhoto = undefined;
    this.startCamera();
  }

  stopCamera() {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = undefined;
    }
    this.cameraActive = false;
  }

  // File Upload Methods
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.processFile(input.files[0]);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.processFile(event.dataTransfer.files[0]);
    }
  }

  processFile(file: File) {
    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      this.auth.showSnackBar('Por favor, selecione apenas arquivos de imagem.');
      return;
    }

    // Validar tamanho (5MB máximo)
    if (file.size > 5 * 1024 * 1024) {
      this.auth.showSnackBar('O arquivo deve ter no máximo 5MB.');
      return;
    }

    this.selectedFile = file;

    // Criar preview
    const reader = new FileReader();
    reader.onload = (e) => {
      this.filePreview = e.target?.result as string;
    };
    reader.readAsDataURL(file);

    // Limpar captura da webcam se houver
    this.capturedPhoto = undefined;
  }

  removeFile() {
    this.selectedFile = undefined;
    this.filePreview = undefined;
    this.fileInput.nativeElement.value = '';
  }

  // Utility Methods
  getFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  hasPhoto(): boolean {
    return !!(this.capturedPhoto || this.selectedFile);
  }

  // Dialog Actions
  onConfirm() {
    let photoData: string;

    if (this.capturedPhoto) {
      photoData = this.capturedPhoto;
    } else if (this.selectedFile && this.filePreview) {
      photoData = this.filePreview;
    } else {
      this.auth.showSnackBar('Selecione ou capture uma foto primeiro.');
      return;
    }

    this.photoSelected.emit(photoData);
    this.dialogRef.close(photoData);
  }

  onCancel() {
    this.stopCamera();
    this.dialogRef.close();
  }

  private showMessage(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}
