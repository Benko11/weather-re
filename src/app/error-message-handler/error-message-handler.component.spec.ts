import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorMessageHandlerComponent } from './error-message-handler.component';

describe('ErrorMessageHandlerComponent', () => {
  let component: ErrorMessageHandlerComponent;
  let fixture: ComponentFixture<ErrorMessageHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorMessageHandlerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorMessageHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
