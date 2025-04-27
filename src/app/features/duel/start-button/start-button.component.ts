import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-start-button',
  standalone: true,
  imports: [],
  templateUrl: './start-button.component.html',
  styleUrl: './start-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartButtonComponent {

  router = inject(Router);

  goStartDuel() {
    this.router.navigate(['/duel']);
  }
}
