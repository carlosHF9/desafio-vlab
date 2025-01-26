import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalysisComponent } from './pages/analysis/analysis.component';

import { AnalysisState } from './state/analysis-state/analysis.state';
import { AnalysisApi } from './api/analysis.api';
import { AnalysisFacade } from './analysis.facade';
import { analysisInitializerProvider } from './analysis.initializer';
import { AnalysisRoutingModule } from './analysis-routing.module';
import { AnalysisTableComponent } from './components/analysis-table/analysis-table.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { FlowChartsComponent } from './pages/flow-charts/flow-charts.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  providers: [
    AnalysisState,
    AnalysisApi,
    AnalysisFacade,
    analysisInitializerProvider
  ],
  declarations: [
    AnalysisComponent,
    AnalysisTableComponent,
    FlowChartsComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatSortModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    AnalysisRoutingModule,
    HttpClientModule,
    MatButtonModule,
  ],
  exports: [
    AnalysisComponent,
    FlowChartsComponent
  ]
})
export class AnalysisModule { }
