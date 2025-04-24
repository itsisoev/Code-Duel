import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ThemeToggleComponent} from "../../features/theme-toggle/theme-toggle.component";

@Component({
  selector: 'uc-header',
  standalone: true,
  imports: [
    ThemeToggleComponent
  ],
  templateUrl: './uc-header.component.html',
  styleUrl: './uc-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UcHeaderComponent {

}
