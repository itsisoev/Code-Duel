import { ChangeDetectionStrategy, Component } from '@angular/core';
import {TaskDisplayComponent} from "../task-display/task-display.component";
import {CodeEditorComponents} from "../code-editor/code-editor.component";

@Component({
  selector: 'app-page-duel',
  standalone: true,
  imports: [
    TaskDisplayComponent,
    CodeEditorComponents
  ],
  templateUrl: './page-duel.component.html',
  styleUrl: './page-duel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageDuelComponent {

}
