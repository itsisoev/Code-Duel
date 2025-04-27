import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-task-display',
  standalone: true,
  imports: [],
  templateUrl: './task-display.component.html',
  styleUrl: './task-display.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDisplayComponent {

}
