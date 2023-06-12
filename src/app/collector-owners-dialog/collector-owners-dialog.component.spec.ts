import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectorOwnersDialogComponent } from './collector-owners-dialog.component';

describe('CollectorOwnersDialogComponent', () => {
  let component: CollectorOwnersDialogComponent;
  let fixture: ComponentFixture<CollectorOwnersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectorOwnersDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorOwnersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
