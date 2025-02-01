import { Component, Input, OnInit } from '@angular/core';
import { ProcessoStats } from '../../types/Processo';

@Component({
  selector: 'app-process-status',
  templateUrl: './process-status.component.html',
  styleUrls: ['./process-status.component.scss']
})
export class ProcessStatusComponent implements OnInit {
  @Input() processoStats!: ProcessoStats;
  constructor() { }

  ngOnInit() {
  }

}
