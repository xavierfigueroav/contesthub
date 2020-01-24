import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EventCreationPage } from './event-creation.page';

describe('EventCreationPage', () => {
  let component: EventCreationPage;
  let fixture: ComponentFixture<EventCreationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCreationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EventCreationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
