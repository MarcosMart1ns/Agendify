import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AuthorizationService {

    url = 'http://localhost:9090/auth/login'

    constructor(private httpClient: HttpClient) {
    }

    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    login(user: any) {
        return this.httpClient.post(
            this.url,
            JSON.stringify(user),
            this.httpOptions
        );
    }
}
