import { Component, ElementRef, NgZone, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-leave-bar-chart',
  templateUrl: './leave-bar-chart.component.html',
  styleUrls: ['./leave-bar-chart.component.scss']
})
export class LeaveBarChartComponent implements OnInit {
  private employeeData: any[] = [];

  constructor(
    private elementRef: ElementRef,
    private zone: NgZone,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.fetchEmployeeData();
  }

  private fetchEmployeeData(): void {
    // Sample data with numeric property (replace with your actual data)
    this.employeeData = [
      { name: 'Employee A', someNumericProperty: 20 },
      { name: 'Employee B', someNumericProperty: 35 },
      { name: 'Employee C', someNumericProperty: 15 },
      { name: 'Employee D', someNumericProperty: 50 },
      // Add more data as needed
    ];

    this.createChart();
  }

  private createChart(): void {
    this.zone.runOutsideAngular(() => {
      const svg = d3.select(this.elementRef.nativeElement).select('svg');
      svg.selectAll('*').remove(); // Clear existing chart

      const width = 800;
      const height = 400;
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };

      const chartGroup = svg
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const x = d3.scaleBand().rangeRound([0, width - margin.left - margin.right]).padding(0.1);
      const y = d3.scaleLinear().rangeRound([height - margin.top - margin.bottom, 0]);

      x.domain(this.employeeData.map((d) => d.name));
      y.domain([0, d3.max(this.employeeData, (d) => d.someNumericProperty)]);

      chartGroup
        .selectAll('.bar')
        .data(this.employeeData)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => x(d.name)!)
        .attr('y', (d) => y(d.someNumericProperty)!)
        .attr('width', x.bandwidth())
        .attr('height', (d) => height - margin.top - margin.bottom - y(d.someNumericProperty)!);

      chartGroup
        .append('g')
        .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
        .call(d3.axisBottom(x));

      chartGroup.append('g').call(d3.axisLeft(y));
    });
  }
}
