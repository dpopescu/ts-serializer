import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

enum EXTERNAL_PAGES{
  DOCS = <any>'/reports/doc/',
  UNIT_TESTS = <any>'/reports/tests/unit-tests-results/',
  COVERAGE = <any>'/reports/coverage/PhantomJS 2.1.1 (Mac OS X 0.0.0)/html/'
}

@Component({
  selector: 'app-external-page',
  templateUrl: './external-page.component.html',
  styleUrls: ['./external-page.component.scss']
})
export class ExternalPageComponent implements OnInit {
  public pageUrl: string;
  private routeUrl:any = 'docs';

  constructor(private activatedRoute: ActivatedRoute) {
    this.routeUrl = <any>this.activatedRoute.snapshot.url.map(item => item.path).join('').toUpperCase();
    this.pageUrl = EXTERNAL_PAGES[this.routeUrl];
  }

  ngOnInit() {
  }

}
