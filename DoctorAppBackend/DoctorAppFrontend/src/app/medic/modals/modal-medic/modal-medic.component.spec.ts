import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMedicComponent } from './modal-medic.component';

describe('ModalMedicComponent', () => {
  let component: ModalMedicComponent;
  let fixture: ComponentFixture<ModalMedicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalMedicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMedicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
