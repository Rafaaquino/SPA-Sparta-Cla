import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertService } from './alert.service';


@Injectable({ providedIn: 'root' })
export class ActivisionService {

    declare require: any;

    constructor(
        private router: Router,
        private http: HttpClient,
        private alertService: AlertService

    ) {
    }

    /** Log a message with the MessageService */
    private log(message: string) {
        console.log(message);
    }

    /*
    https://docs.codapi.dev/
    */

    getWarzoneInfo(user: string, platform: string){

        //const API = require('call-of-duty-api')({ platform: platform });


    }

}
