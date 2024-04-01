import {Component, OnInit} from '@angular/core';
import { TokenService } from "../../services/auth/token.service";
import {Router} from "@angular/router";
import {AuthService, AuthResponse} from "../../services/auth/auth.service";
import {ToastService} from "../../services/ui/toast/toast.service";

@Component({
  selector: 'app-home',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {
  tasks: Task[] = [];
  login = {
    email: "",
    password: ""
  };
  requesting = false;

  constructor(private readonly tokenService: TokenService,
              private readonly router: Router,
              private readonly auth: AuthService,
              private readonly toastService: ToastService) {}

  ngOnInit() {
    if (this.tokenService.hasToken()) {
      this.router.navigate(['/home'], { replaceUrl: true });
    }
  }

  performLogin() {
    this.requesting = true;
    this.auth.login(this.login).subscribe((data: AuthResponse) => {
      this.requesting = false;
      this.tokenService.setAuthToken(data.access_token)
      this.router.navigate(['/home'], { replaceUrl: true });
    }, () => {
      this.requesting = false;
      this.toastService.present('Conta não confirmada ou credenciais inválidas.')
    });
  }

  isButtonDisabled() {
    return !this.login.email.length || !this.login.password.length || this.requesting;
  }
}
