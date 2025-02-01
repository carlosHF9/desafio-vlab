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

  private applyStylesToSvg() {
    const svgElement = d3.select(this.svgcontainer.nativeElement).select('svg');
      if (!svgElement.empty()) {
        svgElement
          .attr('width', '100%')
          .attr('height', 'auto');
      }
  }

  private addEventsToFlowChart() {
    const container = d3.select(this.svgcontainer.nativeElement);
    const self = this;

    const nodes = container.selectAll('.node');

    nodes.on("click", function(event, d) {
      const activityName = d3.select(this).select('a').attr('xlink:title');
      self.router.navigate(['/analysis', activityName]);
    });

    nodes.on("mouseover", function() {
      d3.select(this).style("cursor", "pointer");
    })
    .on("mouseleave", function() {
      d3.select(this).style("cursor", "default");
    });

    this.insertImage(nodes);
  }

  private insertImage(nodes: d3.Selection<d3.BaseType, unknown, HTMLElement, any>) {
    const nodeContent = nodes.selectAll('a');

    nodeContent
      .insert("image")
      .attr("xlink:href", "https://img.icons8.com/?size=100&id=63308&format=png&color=000000")
      .attr("width", 30)
      .attr("height", 30)
      .attr("y", (d, i, node) => this.calculatePosition(node[i].previousElementSibling, 'y', -24))
      .attr("x", (d, i, node) => this.calculatePosition(node[i].previousElementSibling, 'x', -75));
  }

  private calculatePosition(element: Element | null, attribute: string, offset: number): number {
    const value = parseFloat(element?.getAttribute(attribute) ?? '0');
    return value + offset;
  }

  ngAfterViewInit() {
    this.applyStylesToSvg();
    this.addEventsToFlowChart();
  }

}
