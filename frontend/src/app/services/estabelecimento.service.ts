import { Injectable } from '@angular/core';
import {EstabelecimentoFormGroup} from "../model/form-model/signup/EstabelecimentoFormGroup";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EstabelecimentoService {
  url = 'http://localhost:9090/estabelecimento'

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private httpClient: HttpClient) { }

  createEstabelecimento(estabelecimento: EstabelecimentoFormGroup) {
    return this.httpClient.post(
      this.url,
      JSON.stringify(estabelecimento),
      this.httpOptions
    );
  }
}
