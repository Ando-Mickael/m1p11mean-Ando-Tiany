import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <div class="loader-container" *ngIf="isLoading">
      <div class="loader"></div>
    </div>
  `,
  styles: [`
    .loader-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.5); /* Semi-transparent white background */
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999; /* Ensure it appears on top of other elements */
    }

    .loader {
      border: 4px solid #f3f3f3; /* Light grey border */
      border-top: 4px solid #3498db; /* Blue border */
      border-radius: 50%;
      width: 50px;
      height: 50px;
      animation: spin 1s linear infinite; /* Spin animation */
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class LoaderComponent {
  @Input() isLoading: boolean = false;
}
