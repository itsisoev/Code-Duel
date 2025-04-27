import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../auth.service";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  authForm = this.fb.group({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
  });

  private router = inject(Router);
  private authService = inject(AuthService);

  onSubmit() {
    const {username, password} = this.authForm.value;
    const userData = {
      username: username ?? '',
      password: password ?? '',
    };

    this.authService.register(userData).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
