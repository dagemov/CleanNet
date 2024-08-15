import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSpecialityComponent } from './modal-speciality.component';

describe('ModalSpecialityComponent', () => {
  let component: ModalSpecialityComponent;
  let fixture: ComponentFixture<ModalSpecialityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalSpecialityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSpecialityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
