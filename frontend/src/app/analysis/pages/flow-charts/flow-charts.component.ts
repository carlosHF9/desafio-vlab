import { Component, ElementRef, OnInit } from '@angular/core';
import {  SafeHtml } from '@angular/platform-browser';
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
  constructor(
    private api: ImageApiService,
    private el: ElementRef,
  ) {

  }

  ngOnInit() {
    this.api.getFlowGraphProcessStatus().subscribe((res: any) => {
      this.processoStats = res[0];

    })
    this.api.getFlowGraph().subscribe((res: any) => {
      this.svg = res;
  })


}}


