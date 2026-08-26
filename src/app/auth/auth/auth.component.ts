import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { RecipeService } from '../../recipes/recipe.service';
import { AuthResponseData, AuthService } from '../auth.service';

declare const google: any;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {

  private googleBtnRef: ElementRef<HTMLDivElement>;

  // Fires whenever the button element enters/leaves the DOM (it lives inside a
  // form that is hidden while loading), so the button re-renders after errors.
  @ViewChild('googleBtn') set googleBtn(el: ElementRef<HTMLDivElement>) {
    this.googleBtnRef = el;
    if (el) {
      this.initGoogleButton();
    }
  }

  constructor(private authService: AuthService,
              private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) {}

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  info: string = null;
  reason: string = null;

  ngOnInit() {
    // When redirected here to save a recipe, start in Sign Up mode and show why.
    this.reason = this.route.snapshot.queryParams['reason'] || null;
    if (this.reason === 'save-recipe') {
      this.isLoginMode = false;
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if(!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if(this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      () => {
        this.isLoading = false;
        this.completeLogin();
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  onForgotPassword() {
    this.info = 'Password reset isn\'t available yet — please contact support.';
  }

  onHandleInfo() {
    this.info = null;
  }

  // The Google Identity Services script is loaded async, so it may not be ready
  // when the view initializes. Poll briefly until it is, then render the button.
  private initGoogleButton(attempt = 0) {
    if (!this.googleBtnRef) {
      return;
    }
    const ready = typeof google !== 'undefined' && google.accounts && google.accounts.id;
    if (!ready) {
      if (attempt < 50) {
        setTimeout(() => this.initGoogleButton(attempt + 1), 100);
      }
      return;
    }
    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: (response: { credential: string }) => this.onGoogleCredential(response.credential),
    });
    google.accounts.id.renderButton(this.googleBtnRef.nativeElement, {
      theme: 'filled_white',
      size: 'large',
      shape: 'pill',
      text: 'continue_with',
      logo_alignment: 'center',
      width: 260,
    });
  }

  private onGoogleCredential(idToken: string) {
    this.isLoading = true;
    this.authService.loginWithGoogle(idToken).subscribe(
      () => {
        this.isLoading = false;
        this.completeLogin();
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
  }

  // After a successful login, commit any recipe the user drafted as a guest and
  // send them to it; otherwise go home.
  private completeLogin() {
    const savedIndex = this.recipeService.commitPendingRecipe();
    if (savedIndex !== null) {
      this.router.navigate(['/recipes', savedIndex]);
    } else {
      this.router.navigate(['/home']);
    }
  }

}
