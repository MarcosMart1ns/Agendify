import {Injectable} from '@angular/core';
import {ClienteFormGroup} from "../model/form-model/signup/ClienteFormGroup";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthorizationService} from "./authorization.service";
import {Observable} from "rxjs";
import {Cliente} from "../model/response/Cliente";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url = 'http://localhost:80/cliente'

  constructor(private httpClient: HttpClient, private authService: AuthorizationService) {
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

  updateCliente(cliente: ClienteFormGroup, id: any) {
    return this.httpClient.patch(
      this.url + `/${id}`,
      JSON.stringify(cliente),
      this.httpOptions
    )
  }

  getClienteLogado(id: string): Observable<Cliente> {

    return <Observable<Cliente>>this.httpClient.get(
      `http://localhost:80/cliente/${id}`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authService.getToken()}`
        })
      });
  }

}
