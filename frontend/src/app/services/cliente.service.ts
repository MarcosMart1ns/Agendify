import {Injectable} from '@angular/core';
import {ClienteFormGroup} from "../model/form-model/signup/ClienteFormGroup";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ClienteService {

    url = 'http://localhost:9090/cliente'

    constructor(private httpClient: HttpClient) {
    }

    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    createCliente(cliente: ClienteFormGroup) {

        return this.httpClient.post(
            this.url,
            JSON.stringify(cliente),
            this.httpOptions
        );

    }

}
