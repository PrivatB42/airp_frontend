import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageErreurComponent } from './message-erreur.component';

describe('MessageComponent', () => {
  let component: MessageErreurComponent;
  let fixture: ComponentFixture<MessageErreurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageErreurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageErreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
