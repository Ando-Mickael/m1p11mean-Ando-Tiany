import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MatFileUploadQueueService {
  private _uploadQueue: File[] = [];
  private _uploadQueueSubject = new BehaviorSubject<File[]>([]);

  get uploadQueue$() {
    return this._uploadQueueSubject.asObservable();
  }

  get uploadQueue() {
    return this._uploadQueue.slice();
  }

  addToQueue(files: File[]) {
    this._uploadQueue = this._uploadQueue.concat(files);
    this._uploadQueueSubject.next(this._uploadQueue);
  }

  removeFromQueue(file: File) {
    this._uploadQueue = this._uploadQueue.filter((f) => f !== file);
    this._uploadQueueSubject.next(this._uploadQueue);
  }

  clearQueue() {
    this._uploadQueue = [];
    this._uploadQueueSubject.next(this._uploadQueue);
  }
}
