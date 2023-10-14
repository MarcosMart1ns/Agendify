import {Component} from '@angular/core';
import {ClienteFormGroup} from "../../model/form-model/signup/ClienteFormGroup";
import {FieldModel} from "../../model/field-model/FieldModel";
import {AuthorizationService} from "../../services/authorization.service";
import {Router} from "@angular/router";
import {Cliente} from "../../model/response/Cliente";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClienteService} from "../../services/cliente.service";
import {ValidationUtils} from "../../util/ValidationUtils";
import {HttpErrorResponse} from "@angular/common/http";
import {Authresponse} from "../../model/response/Authresponse";
import {Estabelecimento} from "../../model/response/Estabelecimento";
import {EstabelecimentoService} from "../../services/estabelecimento.service";
import {Observable} from "rxjs";
import {Servico} from "../../model/response/Servico";
import {Constants} from "../../Constants";
import {PeriodoAtendimento} from "../../model/response/PeriodoAtendimento";
import {DiaDaSemana} from "../../model/response/DiaDaSemana";

@Component({
  selector: 'app-profile-edit-page',
  templateUrl: './profile-edit-page.component.html',
  styleUrls: ['./profile-edit-page.component.css', '../../components/form-component/form-component.component.css', '../../pages/sign-up-page/sign-up-page.component.css']
})
export class ProfileEditPageComponent {
  userDetails!: Cliente | Estabelecimento;

  profileImgUrl: string = Constants.DEFAULT_AVATAR;

  userType!: number;

  showErrorDialog: boolean = false;
  errorMessage: string = 'Exemplo';

  showSuccessDialog: boolean = false;
  sucessMessage: string = "Dados alterados com sucesso";

  enableDadosPessoais: boolean = true;
  enableBioDescription: boolean = false;

  servicos!: Servico[];
  agendas!: PeriodoAtendimento[];

  onConfirmAction = () => {
    window.location.reload();
  }

  clienteFormGroup = {
    nome: ['', Validators.required],
    cpf: ['', Validators.compose([Validators.required, ValidationUtils.validateCPF()])],
    email: ['', [Validators.required, Validators.email]],
    logradouro: '',
    bairro: '',
    cidade: ''
  };

  clienteFormField: FieldModel[] = [
    {
      fieldName: "Nome",
      controlName: "nome",
      iconUrl: "",
      fieldType: "text",
      errorMessage: "Insira um nome válido"
    },
    {
      fieldName: "CPF",
      controlName: "cpf",
      iconUrl: "",
      fieldType: "number",
      errorMessage: "CPF inválido"
    },
    {
      fieldName: "Email",
      controlName: "email",
      iconUrl: "",
      fieldType: "email",
      errorMessage: "Insira um e-mail válido"
    },
    {
      fieldName: "Logradouro",
      controlName: "logradouro",
      iconUrl: "",
      fieldType: "text",
      errorMessage: ""
    },
    {
      fieldName: "Bairro",
      controlName: "bairro",
      iconUrl: "",
      fieldType: "text",
      errorMessage: ""
    },
    {
      fieldName: "Cidade",
      controlName: "cidade",
      iconUrl: "",
      fieldType: "text",
      errorMessage: ""
    }
  ]


  estabelecimentoFormGroup = {
    nome: ['', Validators.required],
    cnpj: ['', Validators.compose([Validators.required, ValidationUtils.validateCNPJ()])],
    email: ['', [Validators.required, Validators.email]],
    logradouro: '',
    bairro: '',
    cidade: '',
  };

  estabelecimentoFormField: FieldModel[] = [
    {
      fieldName: "Nome",
      controlName: "nome",
      iconUrl: "",
      fieldType: "text",
      errorMessage: "Insira um nome válido"
    },
    {
      fieldName: "CNPJ",
      controlName: "cnpj",
      iconUrl: "",
      fieldType: "number",
      errorMessage: "cnpj inválido"
    },
    {
      fieldName: "Email",
      controlName: "email",
      iconUrl: "",
      fieldType: "email",
      errorMessage: "Insira um e-mail válido"
    },
    {
      fieldName: "Logradouro",
      controlName: "logradouro",
      iconUrl: "",
      fieldType: "text",
      errorMessage: ""
    },
    {
      fieldName: "Bairro",
      controlName: "bairro",
      iconUrl: "",
      fieldType: "text",
      errorMessage: ""
    },
    {
      fieldName: "Cidade",
      controlName: "cidade",
      iconUrl: "",
      fieldType: "text",
      errorMessage: ""
    }
  ]

  estabelecimentoExtraFormGroup = new FormBuilder().group({
    descricao: ''
  });

  private form: FormGroup | any;

  addServicoFormGroup = new FormBuilder().group({
    nome: ['', Validators.required],
    duracao: ['', Validators.required]
  });

  addAgendaFormGroup = new FormBuilder().group({
    diaDaSemana: ['', Validators.required],
    horaInicio: ['', Validators.required],
    horaFim: ['', Validators.required]
  });

  diasDaSemanaOptions =Object.keys(DiaDaSemana).filter((f) => isNaN(Number(f)));
  diaDaSemanaSelected!: string | DiaDaSemana[];

  constructor(
    private authService: AuthorizationService,
    private router: Router,
    private clienteService: ClienteService,
    private estabelecimentoService: EstabelecimentoService
  ) {
    if (!this.authService.isUserLogged()) {
      this.router.navigateByUrl('/login');
    }

    let activeSession: Authresponse = this.authService.getActiveSession();
    this.userType = activeSession.tipo;

    if (activeSession.tipo == 1) {
      this.clienteService.getClienteLogado(activeSession.id).subscribe(
        (response) => this.setUserOnForm(response),
        (error: HttpErrorResponse) => {
          this.errorMessage = `Erro ao atualizar usuário:  \n ${error.error.message}`;
          this.showErrorDialog = true;

          this.authService.logoutUser();
        }
      )
    }

    if (activeSession.tipo == 2) {
      this.estabelecimentoService.getEstabelecimento(activeSession.id).subscribe(
        (response) => this.setUserOnForm(response),
        (error: HttpErrorResponse) => {
          this.errorMessage = `Erro ao atualizar usuário:  \n ${error.error.message}`;
          this.showErrorDialog = true;

          this.authService.logoutUser();
        }
      )
    }

  }

  saveProfile(cliente: ClienteFormGroup) {
    const clienteToSave: Cliente | Estabelecimento = this.userDetails;

    for (const clienteProp in cliente) {
      // @ts-ignore
      if (clienteToSave[clienteProp] != undefined && clienteProp != "senha") {
        // @ts-ignore
        if (cliente[clienteProp] != clienteToSave[clienteProp]) {
          // @ts-ignore
          clienteToSave[clienteProp] = cliente[clienteProp];
        }
      }

    }

    if (this.userType == 1) {
      this.handleUserRespons(this.clienteService.updateCliente(clienteToSave, this.userDetails.id))
    }

    if (this.userType == 2) {
      this.handleUserRespons(this.estabelecimentoService.updateCliente(clienteToSave, this.userDetails.id))
    }

  }

  receiveForm(formGroup: FormGroup) {
    this.form = formGroup;
  }

  setUserOnForm(cliente: Cliente | Estabelecimento) {

    this.userDetails = cliente

    if (this.userDetails.urlFotoPerfil) {
      this.profileImgUrl = this.userDetails.urlFotoPerfil;
    }

    this.form.get("nome").patchValue(this.userDetails.nome);

    if ("cpf" in this.userDetails) {
      this.form.get("cpf").patchValue(this.userDetails.cpf);
    }

    if ("cnpj" in this.userDetails) {
      this.form.get("cnpj").patchValue(this.userDetails.cnpj);
    }

    if ("descricao" in this.userDetails) {
      // @ts-ignore
      this.estabelecimentoExtraFormGroup.get("descricao").patchValue(this.userDetails.descricao);
    }

    if ("servicos" in this.userDetails) {
      this.servicos = this.userDetails.servicos;
    }

    if ("periodosAtendimento" in this.userDetails) {
      this.agendas = this.userDetails.periodosAtendimento;
    }

    this.form.get("email").patchValue(this.userDetails.email);

    if (this.userDetails.endereco != null) {
      this.form.get("logradouro").patchValue(this.userDetails.endereco.logradouro);
      this.form.get("bairro").patchValue(this.userDetails.endereco.bairro);
      this.form.get("cidade").patchValue(this.userDetails.endereco.cidade.nome);
    }

  }

  handleUserRespons(user: Observable<object>) {
    user.subscribe(
      (response) => {
        this.setUserOnForm(<Cliente>response);
        this.showSuccessDialog = true;
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = `Erro ao atualizar usuário:  \n ${error.error.message}`;
        this.showErrorDialog = true;
      }
    );
  }

  toggleDadosPessoais() {
    window.location.reload()
    this.enableDadosPessoais = true;
    this.enableBioDescription = false;
  }

  toggleBioDescription() {
    this.enableDadosPessoais = false;
    this.enableBioDescription = true;
  }

  saveBio() {
    let estabelecimentoToSave: Estabelecimento = <Estabelecimento>this.userDetails;

    estabelecimentoToSave.descricao = <string>this.estabelecimentoExtraFormGroup.value.descricao;
    estabelecimentoToSave.servicos = [...this.servicos];
    estabelecimentoToSave.periodosAtendimento = [...this.agendas];

    this.estabelecimentoService.updateCliente(estabelecimentoToSave, this.userDetails.id)
      .subscribe(
        (response) => {
          this.setUserOnForm(<Cliente>response);
          this.showSuccessDialog = true;
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = `Erro ao atualizar usuário:  \n ${error.error.message}`;
          this.showErrorDialog = true;
        }
      );
  }

  addServico() {
    let newServicos = [...this.servicos]

    newServicos.push({
      id: "",
      duracao: `${this.addServicoFormGroup.get("duracao")?.value}:00`,
      nome: `${this.addServicoFormGroup.get("nome")?.value}`,
      estabelecimentoId: this.userDetails.id
    })

    this.servicos = newServicos;

    this.estabelecimentoExtraFormGroup.markAsDirty();
  }

  removeServico(servico: Servico) {
    let newServicos: Servico[] = [...this.servicos]

    const index = newServicos.findIndex(s => s === servico);

    if (index !== -1) {
      newServicos.splice(index, 1);
      this.servicos = newServicos;
    }
    this.estabelecimentoExtraFormGroup.markAsDirty();
  }

  addAgenda() {
    let newAgenda = [...this.agendas]

    console.log(this.addAgendaFormGroup.get("diaDaSemana")?.value)

    newAgenda.push({
      id: "",
      // @ts-ignore
      diaDaSemana: this.obterDiaDaSemanaPelaString(this.addAgendaFormGroup.get("diaDaSemana")?.value),
      horaFim: `${this.addAgendaFormGroup.get("horaFim")?.value}:00.000`,
      horaInicio: `${this.addAgendaFormGroup.get("horaInicio")?.value}:00.000`,
      estabelecimentoId: this.userDetails.id
    })

    this.agendas = newAgenda;

    this.estabelecimentoExtraFormGroup.markAsDirty();
  }

  removeAgenda(agenda: PeriodoAtendimento) {
    let periodoAtendimentos: PeriodoAtendimento[] = [...this.agendas]

    const index = periodoAtendimentos.findIndex(s => s === agenda);

    if (index !== -1) {
      periodoAtendimentos.splice(index, 1);
      this.agendas = periodoAtendimentos;
    }
    this.estabelecimentoExtraFormGroup.markAsDirty();
  }


  obterDiaDaSemanaPelaString(nomeDoDia: string): DiaDaSemana | undefined {
    nomeDoDia = nomeDoDia.toUpperCase();

    for (const dia in DiaDaSemana) {
      if (DiaDaSemana[dia].toString() === nomeDoDia) {
        // @ts-ignore
        return DiaDaSemana[dia] as DiaDaSemana;
      }
    }

    return undefined;
  }

}
