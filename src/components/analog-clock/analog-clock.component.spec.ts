import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { AnalogClockComponent } from './analog-clock.component';
import { of } from 'rxjs';

describe('AnalogClockComponent', () => {
  let component: AnalogClockComponent;
  let fixture: ComponentFixture<AnalogClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalogClockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalogClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateClock every 1s', fakeAsync(() => {
    spyOn(component, 'isBrowser').and.returnValue(true);
    spyOn(component, 'updateClock').and.callThrough();

    component.ngAfterViewInit();
    expect(component.updateClock).not.toHaveBeenCalled();
    tick(1000);
    expect(component.updateClock).toHaveBeenCalledTimes(1);

    component.subscription?.unsubscribe();
  }));
});
