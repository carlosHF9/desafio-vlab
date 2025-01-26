import { Component } from '@angular/core';

@Component({
  selector: 'app-flow-charts',
  templateUrl: './flow-charts.component.html',
  styleUrls: ['./flow-charts.component.scss']
})
export class FlowChartsComponent   {
  availableSizes = [
    {name: 'Pequeno', color: 'primary'},
    {name: 'Médio', color: 'accent'},
    {name: 'Grande', color: 'warn'},
  ];
  selectedSize: String = 'Pequeno'

  public selectSize(size: string) {
    this.selectedSize = size;
  }

  public downloadFlowchart() {

  }

}
