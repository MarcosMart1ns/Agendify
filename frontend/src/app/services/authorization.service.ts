import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {AuthRequest} from "../model/request/AuthRequest";
import {Authresponse} from "../model/response/Authresponse";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  url = 'http://localhost:80/auth/login'

  constructor(private httpClient: HttpClient, private router: Router) {
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

            localStorage.setItem("session", JSON.stringify(<Authresponse>response));
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

  getToken(): string {
    const activeSession = this.getActiveSession();
    if (activeSession) {
      return activeSession.token;
    }
    return "";
  }

  isUserLogged(): boolean {
    return localStorage.getItem("authenticated") === 'true';
  }

  setAutheticated() {
    localStorage.setItem("authenticated", "true");
  }

  getActiveSession(): Authresponse {

    let session = localStorage.getItem("session");

    if (session != null) {
      return JSON.parse(session);
    }

    console.debug("Not found any active session, please verify")
    return {
      email: "",
      id: "",
      token: "",
      tipo: 1
    };
  }

  logoutUser() {
    localStorage.removeItem("session");
    localStorage.setItem("authenticated", "false");

    this.router.navigateByUrl('/').then(() => window.location.reload());
  }

}
