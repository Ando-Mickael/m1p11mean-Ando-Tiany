import { TestBed } from '@angular/core/testing';

import { MatFileUploadQueueService } from './mat-file-upload-queue.service';

describe('MatFileUploadQueueService', () => {
  let service: MatFileUploadQueueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatFileUploadQueueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
