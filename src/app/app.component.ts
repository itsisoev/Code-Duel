import {Component, DestroyRef, inject, signal} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {UcHeaderComponent} from "./components/uc-header/uc-header.component";
import {filter, map, mergeMap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UcHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  showHeader = signal<boolean>(true);

  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      mergeMap(route => route.data),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (data) => {
        this.showHeader.set(data['showHeader'] !== false);
      },
      error: (error) => {
        console.error('Ошибка при получении данных маршрута:', error);
      }
    });
  }
}
