import { Injectable } from '@angular/core';
import {EstabelecimentoFormGroup} from "../model/form-model/signup/EstabelecimentoFormGroup";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthorizationService} from "./authorization.service";
import {Estabelecimento} from "../model/response/Estabelecimento";

@Injectable({
  providedIn: 'root'
})
export class EstabelecimentoService {
  url = 'http://localhost:9090/estabelecimento'

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private httpClient: HttpClient, private authService: AuthorizationService) { }

  createEstabelecimento(estabelecimento: EstabelecimentoFormGroup) {
    return this.httpClient.post(
      this.url,
      JSON.stringify(estabelecimento),
      this.httpOptions
    );
  }

  updateCliente(estabelecimento: EstabelecimentoFormGroup, id:any) {
    return this.httpClient.patch(
      this.url+`/${id}`,
      JSON.stringify(estabelecimento),
      this.httpOptions
    )
  }

  getEstabelecimentoLogado(id: string):Observable<Estabelecimento>{

    return <Observable<Estabelecimento>> this.httpClient.get(
      `http://localhost:9090/estabelecimento/${id}`,
      {
        headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${this.authService.getToken()}`})
      });
  }

  searchEstabelecimentos(queryText: string) {
    return this.httpClient.get(
      `${this.url}?searchText=${queryText}`,
      this.httpOptions
    )
  }
}
