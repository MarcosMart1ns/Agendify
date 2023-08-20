import {Injectable} from '@angular/core';
import {ClienteFormModel} from "../model/ClienteFormModel";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";

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

    createCliente(cliente: ClienteFormModel) {

        this.httpClient.post(
            this.url,
            JSON.stringify(cliente),
            this.httpOptions
        )
            .toPromise()
            .then(
                (response) => {
                    // TODO: Criar classe que representa o response
                    // @ts-ignore
                    window.alert(`Cadastro efetuado com sucesso, seja bem vindo ${response.nome}`)
                    return response;
                },
                (error: HttpErrorResponse) => {
                    window.alert(`Erro ao criar usuário: ${error.error.message}`)
                }
            )

    }

}
