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
  url = 'https://agendify.azurewebsites.net/estabelecimento'

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

  getEstabelecimento(id: string):Observable<Estabelecimento>{

    return <Observable<Estabelecimento>> this.httpClient.get(
      `https://agendify.azurewebsites.net/estabelecimento/${id}`,
        this.httpOptions
      );
  }

  searchEstabelecimentos(queryText: string) {
    return this.httpClient.get(
      `${this.url}?searchText=${queryText}`,
      this.httpOptions
    )
  }
}
