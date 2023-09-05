import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { ApiService } from 'src/app/core/services/api.service';
import { Employee } from 'src/app/core/interfaces/employee';
import { LeaveApplication } from 'src/app/core/interfaces/leaveapplication';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-hr-dashboard',
  templateUrl: './hr-dashboard.component.html',
  styleUrls: ['./hr-dashboard.component.scss']
})

export class HrDashboardComponent implements OnInit {

  private subscription: Subscription = new Subscription();

  public appliedLeaves: LeaveApplication[] = [];

  employees: Employee[] = [];

  constructor(private apiservice: ApiService) { }

  // Function Initialization

  ngOnInit() {
    this.apiservice.GetEmployees().subscribe((data: any) => {
      this.employees = data;
      this.createChart();
    });
  }

  // Function for create barchart

  createChart() {

    // Setting dimensions
    const margin = { top: 20, right: 10, bottom: 60, left: 120 };
    const width = 470 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Setting up SVG object
    const svg = d3.select('.chart-container')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // X axis
    const x = d3.scaleLinear()
      .domain([0, 10])
      .range([0, width]);

    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    // Y axis
    const y = d3.scaleBand()
      .range([0, height])
      .domain(this.employees.map((d: Employee) => d.name)) // Use name for y-axis
      .padding(0.1);

    svg.append('g')
      .call(d3.axisLeft(y));

    // Setting bars
    svg.selectAll('myRect')
      .data(this.employees)
      .enter()
      .append('rect')
      .attr('x', x(0))
      .attr('y', (d: Employee) => y(d.name)!)
      .attr('width', 0)
      .attr('height', y.bandwidth() - 10)
      .attr('fill', (d: Employee) => (d.leaves > 5) ? '#FF0800' : '#00A000') // Red for >5, Green for <=5
      .transition()
      .duration(1000)
      .attr('width', (d: Employee) => x(d.leaves));

    // Add x-axis title
    svg.append('text')
      .attr('transform', 'translate(' + (width / 2) + ' ,' + (height + 45) + ')')
      .style('text-anchor', 'middle')
      .text('Number of Leaves');
  }


// Function to unsubscribe from any active subscriptions to prevent memory leaks

ngOnDestroy() {
  this.subscription.unsubscribe();
}
}
