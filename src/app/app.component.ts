import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsComponent } from '../components/reactive-forms/reactive-forms.component';
import { AnalogClockComponent } from '../components/analog-clock/analog-clock.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, ReactiveFormsComponent, AnalogClockComponent],
})
export class AppComponent {
  title = 'Angular 17 App';
}
