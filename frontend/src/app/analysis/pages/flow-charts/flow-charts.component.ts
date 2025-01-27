import { Component, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ImageApiService } from 'src/app/shared/services/image-api.service';

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
  flowChart: SafeHtml = '';

  constructor(
    private api: ImageApiService,
    private sanitizer: DomSanitizer

  ) {

  }
  public selectSize(size: string) {
    this.selectedSize = size;
  }

  public downloadFlowchart() {
    this.api.getFlowGraph().subscribe((res) => {
      const svgString = this.sanitizer.sanitize(SecurityContext.HTML, res);
      if (svgString) {
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'flow-graph.svg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    });
  }

}
