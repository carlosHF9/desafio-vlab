import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as d3 from 'd3';

@Component({
  selector: 'app-flow-graph',
  templateUrl: './flow-graph.component.html',
  styleUrls: ['./flow-graph.component.scss']
})
export class FlowGraphComponent implements AfterViewInit {
  @Input() svg: SafeHtml = '';
  @ViewChild('svgcontainer', { static: true }) svgcontainer!: ElementRef<HTMLInputElement>;
  constructor(
       private el: ElementRef,
       private router: Router
  ) { }



  public addEventsToFlowChart = () => {
    const self = this;
    const container = d3.select(this.svgcontainer.nativeElement);
    container.select('svg')
      .attr('width', '100%')
      .attr('height', 'auto');

    const nodes = container.selectAll('.node')

    nodes.on("click", function(event, d) {
      const activityName = d3.select(this).select('a').attr('xlink:title')
      self.router.navigate(['/analysis', activityName])
    })

    nodes.on("mouseover", function(event, d) {
      d3.select(this)
        .style("cursor", "pointer");
    })
    .on("mouseleave", function(event, d) {
      d3.select(this)
        .style("cursor", "default");
    });

    const nodeContent = nodes.selectAll('a')

    nodeContent
      .insert("image")
      .attr("xlink:href", "https://img.icons8.com/?size=100&id=63308&format=png&color=000000")
      .attr("width", 30)
      .attr("height", 30)
      .attr("y", (d,i,node) => {
        const calc: number = parseFloat(node[i].previousElementSibling?.getAttribute('y') ?? '0');
        return calc - 24;
      })
      .attr("x", (d,i,node) => {
        const calc: number = parseFloat(node[i].previousElementSibling?.getAttribute('x') ?? '0');
        return calc - 75;
      })
  }

  ngAfterViewInit() {
    this.addEventsToFlowChart();
  }

}
