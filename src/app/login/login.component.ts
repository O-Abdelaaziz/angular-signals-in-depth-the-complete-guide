import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessagesService } from '../messages/messages.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private messagesService = inject(MessagesService);
  private authService=inject(AuthService);
  private router = inject(Router);

  public loginFormGroup = this.formBuilder.group({
    email: [''],
    password: [''],
  });

  public async onLogin() {
    try {
      const { email, password } = this.loginFormGroup.value;
      if (!email || !password) {
        this.messagesService.showMessage(
          'email or password is mandatory!',
          'warning'
        );
        return;
      }

      await this.authService.login(email, password);
      await this.router.navigate(['/home']);

    } catch (error) {
      this.messagesService.showMessage(
        'Login failed, please try again: ' + error,
        'error'
      );
    }
  }
}
