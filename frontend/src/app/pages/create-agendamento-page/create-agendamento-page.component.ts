import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-create-agendamento-page',
  templateUrl: './create-agendamento-page.component.html',
  styleUrls: ['./create-agendamento-page.component.css']
})
export class CreateAgendamentoPageComponent  implements OnInit {
  estabelecimentoid!: string;


  constructor(
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let estabelecimentoid = params.get('estabelecimentoid')
      if (estabelecimentoid) {
        this.estabelecimentoid = estabelecimentoid;
      }
    })

  }
}
