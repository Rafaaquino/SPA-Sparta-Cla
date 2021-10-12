import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService, AlertService } from 'src/app/_services';
import * as $ from 'jquery';
import { ModalControlService } from 'src/app/_services/modal-control.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  emailNewPassword: string;


  isLoading = false;

  user: User;

  constructor(private fb: FormBuilder,
    private alertService: AlertService, private router: Router,
    private accountService: AccountService, private modalControl: ModalControlService) {
  }

  ngOnInit(): void {

    this.formLogin = this.fb.group({
      emailLogin: ['', [Validators.required, Validators.email]],
      senhaLogin: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  enviar() {
    if (this.formLogin.invalid) {

      this.alertService.error('Dados incorretos', 'tente novamente', { keepAfterRouteChange: true });

    } else {

      this.postLogin(this.formLogin)

    }

  }

  resetForm() {

    this.formLogin.reset();

  }

  postLogin(formLogin: FormGroup) {

    this.isLoading = true;

    this.accountService.login(formLogin.value.emailLogin, formLogin.value.senhaLogin).subscribe(resposta => {

      this.accountService.user.subscribe(x => this.user = x);

      this.isLoading = false;

      //REMOVE FADE BUGADO QUE CONTINUAVA AO LOGAR
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();

      //this.user = JSON.parse(localStorage.getItem('user'));

      if (this.user.pendingEmailConfirmation) {
        this.accountService.logout();
        this.alertService.info("Sua conta foi criada mas você ainda não confirmou seu email cadastrado.", "Verifique sua caixa de emails ou clique <a (click)='resendEmailConfirmation()'>aqui</a> para reenviar.", { keepAfterRouteChange: true })
      } else {
        if (this.user.changePassword) {
          this.accountService.setEmailNewPassword(this.user.email);
          this.accountService.logout();
          this.router.navigate(['/new-password']);

        } else {
          this.router.navigate(['/welcome']);
        }
      }




    }, err => {

      this.isLoading = false;

      if (err.status === 401) {

        this.alertService.error('Acesso Negado', 'Verifique seu email e senha', { keepAfterRouteChange: true });

      } else {

        this.alertService.error('Erro ' + err.status, 'Tente novamente mais tarde', { keepAfterRouteChange: true });

      }


    })
  }

  setModalResetAsOpen() {

    //REMOVE FADE BUGADO QUE CONTINUAVA
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();

    this.modalControl.setModalReset(true);
    this.modalControl.setModalRegister(false);
    this.modalControl.setModalLogin(false);

  }

  setModalRegisterAsOpen() {

    //REMOVE FADE BUGADO QUE CONTINUAVA
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();

    this.modalControl.setModalRegister(true);
    this.modalControl.setModalReset(false);
    this.modalControl.setModalLogin(false);

  }

}
