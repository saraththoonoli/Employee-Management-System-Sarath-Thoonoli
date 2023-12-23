import { Component, ElementRef, NgZone } from '@angular/core';
import * as d3 from 'd3';



@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent {
  private chartData = [10, 40, 100, 20, 50,20];
  

  constructor(private elementRef: ElementRef, private zone: NgZone) {}

  ngOnInit(): void {
    this.createChart();
  }

  ngOnDestroy(): void {
    // Clean up any D3 elements when the component is destroyed
  }

  private createChart(): void {
    this.zone.runOutsideAngular(() => {
      const svg = d3.select(this.elementRef.nativeElement).append('svg')
        .attr('width', 400)
        .attr('height', 200);

      svg.selectAll('rect')
        .data(this.chartData)
        .enter()
        .append('rect')
        .attr('x', (d, i) => i * 85)
        .attr('y', (d: number) => 200 - d)
        .attr('width', 70)
        .attr('height', (d: number) => d)
        .attr('fill', '#000');
    });
  }
}
