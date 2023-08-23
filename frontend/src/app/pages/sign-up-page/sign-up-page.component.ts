import {Component, OnInit} from '@angular/core';
import {FieldModel} from "../../model/field-model/FieldModel";
import {ClienteFormModel} from "../../model/form-model/ClienteFormModel";
import {ClienteFieldModel} from "../../model/field-model/ClienteFieldModel";
import {EstabelecimentoFieldModel} from "../../model/field-model/EstabelecimentoFieldModel";
import {ClienteService} from "../../services/cliente.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-sign-up-page',
    templateUrl: './sign-up-page.component.html',
    styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent {
    clienteModel = new ClienteFormModel().model;
    formClientModel: FieldModel[] = new ClienteFieldModel().fields;
    formEstabelecimentoModel: FieldModel[] = new EstabelecimentoFieldModel().fields;

    constructor(
        private clienteService: ClienteService
    ) {
    }

    formSubmit(cliente: ClienteFormModel) {
        return this.clienteService.createCliente(cliente).subscribe(
            response => {
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
