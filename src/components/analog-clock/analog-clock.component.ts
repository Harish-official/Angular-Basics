import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-analog-clock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analog-clock.component.html',
  styleUrl: './analog-clock.component.scss',
})
export class AnalogClockComponent implements OnInit, AfterViewInit, OnDestroy {
  time = {
    second: 0,
    minute: 0,
    hour: 0,
  };

  isBrowser = signal(false);

  subscription: Subscription | undefined;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser.set(isPlatformBrowser(platformId));
  }

  ngOnInit(): void {
    this.updateClock();
  }

  ngAfterViewInit(): void {
    if (this.isBrowser()) {
      this.subscription = interval(1000).subscribe(() => this.updateClock());
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  updateClock() {
    const now = new Date();

    const second = now.getSeconds();
    const minute = now.getMinutes() + second / 60;
    const hour = (now.getHours() % 12) + minute / 60;

    this.time.hour = (hour * 30 + 180) % 360;
    this.time.minute = (minute * 6 + 180) % 360;
    this.time.second = (second * 6 + 180) % 360;
  }
}
