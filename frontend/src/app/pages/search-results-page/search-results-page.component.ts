import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {query} from "@angular/animations";

@Component({
  selector: 'app-search-results-page',
  templateUrl: './search-results-page.component.html',
  styleUrls: ['./search-results-page.component.css']
})
export class SearchResultsPageComponent implements OnInit {

  queryText!: string

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let queryParam = params.get('query')
      if (queryParam) {
        this.queryText = queryParam;
      }
    })
  }

  protected readonly query = query;
}
