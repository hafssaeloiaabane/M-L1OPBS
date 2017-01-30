/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FeebacksComponent } from './feebacks.component';

describe('FeebacksComponent', () => {
  let component: FeebacksComponent;
  let fixture: ComponentFixture<FeebacksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeebacksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeebacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
