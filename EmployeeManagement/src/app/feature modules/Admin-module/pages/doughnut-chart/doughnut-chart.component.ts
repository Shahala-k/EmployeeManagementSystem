import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { Employee } from 'src/app/core/interfaces/employee';
import * as d3 from 'd3';
import { PieArcDatum } from 'd3-shape';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnInit {

  employee: Employee[] = [];
  activeEmp: any;
  inactiveEmp: any;
  employees: any;

  private subscription: Subscription = new Subscription();

  constructor(private apiservice: ApiService) { }


  // Funcion Initialization
  
  ngOnInit() {

    this.apiservice.GetEmployees().subscribe(res => {
      this.employee = res;
      this.activeEmp = res.filter(d => d.status === 'active').length;
      this.inactiveEmp = res.filter(d => d.status === 'inactive').length;
    });

    this.apiservice.GetEmployees().subscribe(res => {
      this.employees = res;
      this.createChart();
    });
  }

  // Function to create doughnut chart

  createChart() {
    const width = 500;
    const height = 500;
    const margin = 50;
    const gap = 2;

    const svg = d3.select('#chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const radius = Math.min(width, height) / 2 - margin;

    const pie = d3.pie<Employee>()
      .value(10);

    const arc = d3.arc<PieArcDatum<Employee>>()
      .innerRadius(100)
      .outerRadius(radius);

    const color = d3.scaleOrdinal()
      .domain(this.employee.map(d => d.status))
      .range(['#11804a', '#cf0f2c']);

    const arcs = svg.selectAll('arc')
      .data(pie(this.employee))
      .enter()
      .append('g')
      .attr('class', 'arc')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', (d: PieArcDatum<Employee>) => color(d.data.status) as string);

    // doughnut text
    arcs.append('text')
      .attr('transform', (d: PieArcDatum<Employee>) => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .style('font-size', '10px')
      .text(d => d.data.name);

    // Add labels for active and inactive count

    svg.append('circle')
      .attr('cx', width - margin - radius * 2)
      .attr('cy', height / 2 - radius + gap)
      .attr('r', 6)
      .style('fill', '#11804a');

    svg.append('circle')
      .attr('cx', width - margin - radius * 2)
      .attr('cy', height / 2 - radius + gap + 20)
      .attr('r', 6)
      .style('fill', '#cf0f2c');

    // Add labels circles
    svg.append('text')
      .attr('x', width - margin - radius * 2 + 15)
      .attr('y', height / 2 - radius + gap + 4)
      .attr('text-anchor', 'start')
      .style('font-size', '10px')
      .text(`Active: ${this.activeEmp}`);

    svg.append('text')
      .attr('x', width - margin - radius * 2 + 15)
      .attr('y', height / 2 - radius + gap + 24)
      .attr('text-anchor', 'start')
      .style('font-size', '10px')
      .text(`Inactive: ${this.inactiveEmp}`);
  }

// Function to unsubscribe from any active subscriptions to prevent memory leaks

ngOnDestroy() {
  this.subscription.unsubscribe();
}
}
