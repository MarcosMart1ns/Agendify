import {Injectable} from '@angular/core';
import {ClienteModel} from "../model/ClienteModel";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, retry, throwError} from "rxjs";

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

  createCliente(cliente: ClienteModel) {

    try {
      console.log(cliente);
      let response = this.httpClient.post(
        this.url,
        JSON.stringify(cliente),
        this.httpOptions
      ).pipe(
        retry(2),
        catchError(this.handleError)
      )
      .toPromise()
      .then(
        (response) => {
          // @ts-ignore
          window.alert(`Cadastro efetuado com sucesso, seja bem vindo ${response.nome}`)
        },
        error => {
          window.alert("Ocorreu um erro ao efetuar cadastro: " + error)
        }
      )
    } catch (e) {
      window.alert("erro ao efetuar o cadastro: " + e);
    }

  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => new Error(errorMessage))
  };
}
