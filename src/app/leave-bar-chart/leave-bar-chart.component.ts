import { Component, ElementRef, NgZone, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { EmployeeService } from '../employee.service';
import { LeaveService } from '../leave.service';

interface EmployeeLeaveCounts {
  [employeeId: string]: number;
}

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
    private employeeService: EmployeeService,
    private leaveService: LeaveService
  ) { }

  ngOnInit(): void {
    this.fetchEmployeeData();
  }

  private fetchEmployeeData(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.leaveService.getLeaveRequests().subscribe((leaveRequests: any[]) => {
        console.log('Employees:', employees);
        console.log('Leave Requests:', leaveRequests);

        const employeeLeaveCounts: EmployeeLeaveCounts = {};

        // Count  of each employee ID
        leaveRequests.forEach(leave => {
          const employeeId = leave.employeeId;
          employeeLeaveCounts[employeeId] = (employeeLeaveCounts[employeeId] || 0) + 1;
        });

        this.employeeData = employees.map(employee => {
          const leaveCount = employeeLeaveCounts[employee.id] || 0;
          console.log(`Employee ${employee.name} - Leave Count: ${leaveCount}`);

          return {
            name: employee.name,
            employeeId: employee.id,
            leaveCount: leaveCount
          };
        });

        console.log('Employee Data:', this.employeeData);
        this.createChart();
      });
    });
  }

  private createChart(): void {
    const svg = d3.select(this.elementRef.nativeElement).select('svg');
    svg.selectAll('*').remove();

    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const chartGroup = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand().rangeRound([0, width - margin.left - margin.right]).padding(0.1);
    const y = d3.scaleLinear().rangeRound([height - margin.top - margin.bottom, 0]);

    x.domain(this.employeeData.map((d) => d.name));
    y.domain([0, d3.max(this.employeeData, (d) => d.leaveCount)]);

    chartGroup
      .selectAll('.bar')
      .data(this.employeeData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d: any) => x(d.name)!)
      .attr('y', (d: any) => y(d.leaveCount)!)
      .attr('width', x.bandwidth())
      .attr('height', (d: any) => height - margin.top - margin.bottom - y(d.leaveCount)!)
      .style('fill', '#7667ff'); // Set the bar color to blue

    chartGroup
      .append('g')
      .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x));

    chartGroup.append('g').call(d3.axisLeft(y));
  }
}