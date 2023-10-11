import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {EstabelecimentoService} from "../../services/estabelecimento.service";
import {Estabelecimento} from "../../model/response/Estabelecimento";
import {Constants} from "../../Constants";

@Component({
  selector: 'app-search-results-page',
  templateUrl: './search-results-page.component.html',
  styleUrls: ['./search-results-page.component.css']
})
export class SearchResultsPageComponent implements OnInit {

  queryText!: string
  estabelecimentoList!:Estabelecimento[];

  constructor(
    private route: ActivatedRoute,
    private estabelecimentoService: EstabelecimentoService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let queryParam = params.get('query')
      if (queryParam) {
        this.queryText = queryParam;
      }
    })

    this.searchText()
  }

  searchText(){
    this.estabelecimentoService.searchEstabelecimentos(this.queryText)
      .subscribe(
        (response)=>{
          this.estabelecimentoList = <Estabelecimento[]> response;
        }
      )
  }

  protected readonly Constants = Constants;

}
