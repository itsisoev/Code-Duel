import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
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

    this.authService.login(userData).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
