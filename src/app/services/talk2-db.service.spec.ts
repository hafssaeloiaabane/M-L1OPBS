/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Talk2DBService } from './talk2-db.service';

describe('Talk2DBService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Talk2DBService]
    });
  });

  it('should ...', inject([Talk2DBService], (service: Talk2DBService) => {
    expect(service).toBeTruthy();
  }));
});
