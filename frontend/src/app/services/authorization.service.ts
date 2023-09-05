import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {AuthRequest} from "../model/request/AuthRequest";
import {Authresponse} from "../model/response/Authresponse";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  url = 'http://localhost:9090/auth/login'

  authenticated: boolean = false;
  sessionActive!: Authresponse | any;

  constructor(private httpClient: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  login(user: AuthRequest, onSuccess: ((response: Authresponse) => void) | undefined, onError: (error: HttpErrorResponse) => void) {
    this.httpClient.post(
      this.url,
      JSON.stringify(user),
      this.httpOptions
    )
    .subscribe(
      ( response) => {
        if(response){
          this.sessionActive = response;

          this.authenticated = true;
          if (onSuccess) {
            onSuccess(<Authresponse>response);
          }
        }
      },
      (error: HttpErrorResponse) => {
        onError(error);
      }
    )
  }


}
