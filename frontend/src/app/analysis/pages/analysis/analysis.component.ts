import { Component, OnInit } from '@angular/core';
import { AnalysisFacade } from '../../analysis.facade';
import { Processo } from '../../types/Processo';
import { AnalysisState } from '../../state/analysis-state/analysis.state';
import { AnalysisApi } from '../../api/analysis.api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {
  selectedMovimento: string = 'Expedição de movimento';
  processoList: Processo[] = [];
  api: AnalysisApi;
  state: AnalysisState = new AnalysisState();
  facade: AnalysisFacade;

  constructor(private http: HttpClient, private analysisState: AnalysisState) {
    this.state = analysisState;
    this.api = new AnalysisApi(http);
    this.facade = new AnalysisFacade(this.state, this.api);
  }

  ngOnInit() {
    this.facade.getProcessoData().subscribe((processoData) => {
      this.processoList = processoData;
    });
  }
}
