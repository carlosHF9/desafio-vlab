import {  Component, ElementRef, OnInit,  Renderer2, ViewChild } from '@angular/core';
import {  SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ImageApiService } from 'src/app/shared/services/image-api.service';
import { ProcessoStats } from '../../types/Processo';

@Component({
  selector: 'app-flow-charts',
  templateUrl: './flow-charts.component.html',
  styleUrls: ['./flow-charts.component.scss'],
})
export class FlowChartsComponent implements OnInit {
  svg: SafeHtml = '';
  selectedActivity: String = '';
  processoStats!: ProcessoStats;

  @ViewChild('svgcontainer', { static: true }) svgcontainer!: ElementRef<HTMLInputElement>;
  constructor(
    private api: ImageApiService,
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router
  ) {

  }

  public addEventsToFlowChart = () => {
    const baloonNodes = this.svgcontainer.nativeElement.querySelectorAll('.node')
    baloonNodes.forEach((node) => {
      const useElement = this.renderer.createElement('use');
      this.renderer.setAttribute(useElement, 'href', '../../../assets/information');
      this.renderer.appendChild(node, useElement);

      const activityName = node.childNodes[3].childNodes[0].childNodes[3].textContent
      this.renderer.listen(node, 'mouseover', () => {
        this.renderer.setStyle(node, 'cursor', 'pointer')
      })

      this.renderer.listen(node, 'mouseleave', () => {
        this.renderer.setStyle(node, 'cursor', 'default');
      })

      this.renderer.listen(node, 'click', () => {
        this.selectedActivity = activityName as String;
        this.selectAndNavigateToProcesses(this.selectedActivity)
      })

    })
  }

  public selectAndNavigateToProcesses = (atividadeSelecionada: String) => {
    this.router.navigate(['/analysis', atividadeSelecionada]);
  }

  ngOnInit() {
    this.api.getFlowGraphProcessStatus().subscribe((res: any) => {
      this.processoStats = res[0];
      console.log(res)
    })
    this.api.getFlowGraph().subscribe((res: any) => {
      this.svg = res;
      setTimeout(this.addEventsToFlowChart, 100)
    });

  }
}


