import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {AuthRequest} from "../model/request/AuthRequest";
import {Authresponse} from "../model/response/Authresponse";
import {Cliente} from "../model/response/Cliente";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  url = 'http://localhost:9090/auth/login'

  constructor(private httpClient: HttpClient,private router:Router) {
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
        (response) => {
          if (response) {

            localStorage.setItem("session",JSON.stringify(<Authresponse>response));
            this.setAutheticated();

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

  getActiveUser():Cliente{

    const activeSession:Authresponse | null = this.getActiveSession()

    if (activeSession) {
      this.httpClient.get(
        `http://localhost:9090/cliente/${activeSession.id}`,
        {
          headers: new HttpHeaders({'Content-Type': 'application/json','Authorization':`Bearer ${this.getToken()}`})
        }
      )
        .subscribe(
          (response)=>{
            localStorage.setItem("activeUser",JSON.stringify(<Cliente>response));
          }
        )
    }

    return this.getLoggedUser();
  }

  getToken(): string {
    const activeSession = this.getActiveSession();
    if (activeSession) {
      return activeSession.token;
    }
    return "";
  }

  isUserLogged(): boolean{
    return localStorage.getItem("authenticated") === 'true';
  }

  setAutheticated(){
    localStorage.setItem("authenticated","true");
  }

  getActiveSession():Authresponse | null {

    let session =  localStorage.getItem("session");

    if( session != null){
      return JSON.parse(session);
    }

    return null;
  }

  getLoggedUser(){

    let activeUser =  localStorage.getItem("activeUser");

    if( activeUser != null){
      return JSON.parse(activeUser);
    }

    return null;
  }

  logoutUser(){
    localStorage.removeItem("activeUser");
    localStorage.removeItem("session");
    localStorage.setItem("authenticated","false");
  }

}
