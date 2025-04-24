import { ChangeDetectionStrategy, Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'register',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {

}
