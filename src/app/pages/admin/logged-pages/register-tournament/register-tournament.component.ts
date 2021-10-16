import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tournament } from 'src/app/_models/tournament';
import { User } from 'src/app/_models/user';
import { TournamentService } from 'src/app/_services/tournament.service';
import { AccountService, AlertService } from 'src/app/_services';
import * as $ from 'jquery';

@Component({
  selector: 'app-register-tournament',
  templateUrl: './register-tournament.component.html',
  styleUrls: ['./register-tournament.component.css']
})
export class RegisterTournamentComponent implements OnInit {

  isLoading = false;

  formRegister: FormGroup;

  membrosTime: string[] = []

  membroTime: string;

  tournament: Tournament;

  user: User;

  @Input() idCamp: number;


  constructor(private fb: FormBuilder, private tournamentService: TournamentService,
    private accountService: AccountService, private alertService: AlertService) {

    this.accountService.user.subscribe(x => this.user = x);

   }

  ngOnInit(): void {

    this.formRegister = this.fb.group({
      idCamp: ['', [Validators.required]],
      idUser: [this.user.idUser, [Validators.required]],
      nomeTime: ['', [Validators.required]],
      membrosTime: [this.membrosTime, [Validators.required]],
      membroTime: [''],
    })

  }

  ngOnChanges(){

    if(this.idCamp){

      this.isLoading = true;

      this.tournamentService.getTournamentById(this.idCamp).subscribe(tournament=>{

        this.isLoading = false;
        this.tournament = tournament;

      }, err=>{
        this.isLoading = false;
        console.log(err)
      })
    }
  }

  enviar(){

    this.isLoading = true;

    this.formRegister.patchValue({idCamp: this.idCamp});

    //FORMATA LISTA SIMPLES PARA UMA LISTA DE OBJETO JSON
    let membrosTime: { email: string}[] = []

    this.membrosTime.forEach(element => {

      let membro = {
        email : element
      }

      membrosTime.push(membro)

    });

    this.formRegister.patchValue({membrosTime: membrosTime});


    this.tournamentService.registerTournament(this.formRegister.value).subscribe(res => {


      this.formRegister.reset();

      this.isLoading = false;

      //REMOVE FADE BUGADO QUE CONTINUAVA
      $('body').removeClass('modal-open');
      $('.modal-backdrop').remove();
      $('#modalRegister').toggle();

      this.alertService.success(res.text, res.subText, { keepAfterRouteChange: true });

    }, err =>{

      this.isLoading = false;

      this.alertService.error(err.text, err.subText, { keepAfterRouteChange: true });

    })

    console.log(this.formRegister.value);


  }

  addTeamMember(){

    if(this.membroTime.includes('@') && this.membroTime.includes('.com')){

      if(!this.membrosTime.includes(this.membroTime)){

        this.membrosTime.push(this.membroTime);

        this.membroTime = '';

      }


    }

  }

}
