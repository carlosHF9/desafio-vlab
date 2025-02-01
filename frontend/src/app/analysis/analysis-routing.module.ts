import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalysisComponent } from './pages/analysis/analysis.component';
import { FlowChartsComponent } from './pages/flow-charts/flow-charts.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/flow-graph',
    pathMatch: 'full'
  },
  {
    path: 'flow-graph',
    component: FlowChartsComponent,
  },
  {
    path: 'analysis/:atividadeSelecionada',
    component: AnalysisComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalysisRoutingModule { }
