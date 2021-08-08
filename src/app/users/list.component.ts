import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';


import { Injectable } from '@angular/core';
import { AccountService } from '../_services';

@Injectable()
export class AuthService {

  public getToken(): string {
    return localStorage.getItem('token');
  }

}

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    users = null;

    constructor(private accountService: AccountService) {}

    ngOnInit() {

        //this.accountService.getAll().pipe(first())
           // .subscribe(users => this.users = users);

    }

    deleteUser(id: string) {
        const user = this.users.find(x => x.id === id);
        user.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => {
                this.users = this.users.filter(x => x.id !== id)
            });
    }
}
