import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextmsgComponent } from './textmsg.component';

describe('TextmsgComponent', () => {
  let component: TextmsgComponent;
  let fixture: ComponentFixture<TextmsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextmsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextmsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
