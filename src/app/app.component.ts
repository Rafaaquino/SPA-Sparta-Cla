import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, pairwise } from 'rxjs/operators';
import { User } from './_models/user';
import { AccountService } from './_services';
import { ModalControlService } from './_services/modal-control.service';
import * as $ from 'jquery';
import { LoginComponent } from './pages/account/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { PreviousURLService } from './_services/previous-url.service';
import { ConfirmTournamentComponent } from './pages/admin/logged-pages/confirm-tournament/confirm-tournament.component';
//declare var $ : any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user: User;
  validationCode: string;
  isCheckingConfirmTournament = false;

  isMessage: boolean = true;

  // save the previous route
  public previousRoutePath = new BehaviorSubject<string>('');

  constructor(private accountService: AccountService, private router: Router,
    private modalControl: ModalControlService,
    private location: Location, public dialog: MatDialog,
    private previousUrlService: PreviousURLService,
    private activatedRoute: ActivatedRoute) {

    this.accountService.user.subscribe(x => this.user = x);

  }

  title = 'Sparta Clã';

  ngOnInit(): void {

    this.modalControl.closeAllModals();

    this.checkConfirmTournament();

    //se logado direciona para a pagina inicial welcome
    if (this.user && !this.user.changePassword && !this.isCheckingConfirmTournament) {

      this.router.navigate(['/welcome']);

    }

  }

  checkConfirmTournament() {

    this.isCheckingConfirmTournament = true;

    this.previousRoutePath.next(this.location.path());

    this.router.events.pipe(
      filter(e => e instanceof RoutesRecognized),
      pairwise(),
    )
      .subscribe((event: any[]) => {

        this.isCheckingConfirmTournament = false;

        if (event[0].urlAfterRedirects.startsWith('/confirm-tournament')) {

          //SET SERVICE URL
          this.previousUrlService.setPreviousURL(event[0].urlAfterRedirects);

          if (!this.user) {

            this.dialog.open(LoginComponent);

          } else {

            this.dialog.open(ConfirmTournamentComponent);
          }

        }else{

          this.previousUrlService.getPreviousURL().subscribe(res =>{
            console.log(res)
          })

          console.log(event[0].urlAfterRedirects);
        }
      });
  }
}
