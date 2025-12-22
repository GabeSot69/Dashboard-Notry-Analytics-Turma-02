import { Component, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { NgApexchartsModule, ChartComponent } from "ng-apexcharts";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  @ViewChild("chartProducao") chartProducao!: ChartComponent;
  @ViewChild("chartTemp") chartTemp!: ChartComponent;
  @ViewChild("chartEnergy") chartEnergy!: ChartComponent;

  // Usar 'any' remove os erros de tipagem das animations e facilita o desenvolvimento inicial
  public chartOptions: any;
  public tempOptions: any;
  public energyOptions: any;

  public currentTemp: number = 23;
  public currentEnergy: number = 70;
  public currentProd: number = 60;

  private intervalId: any;

  constructor() {
    this.initChartConfigs();
  }

  private initChartConfigs() {
    const categorias = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];

    this.chartOptions = {
      series: [{ name: "Peças", data: [45, 52, 38, 24, 33, 26, 60] }],
      chart: { height: 300, type: "bar", animations: { enabled: true, easing: 'linear', dynamicAnimation: { speed: 800 } } },
      xaxis: { categories: [...categorias] },
      colors: ["rgba(33, 112, 230, 1)"],
    };

    this.tempOptions = {
      series: [{ name: "Temp", data: [22, 23, 21, 24, 25, 24, 23] }],
      chart: { height: 300, type: "line", animations: { enabled: true, easing: 'linear', dynamicAnimation: { speed: 800 } } },
      stroke: { curve: "smooth" },
      xaxis: { categories: [...categorias] },
      colors: ["#ef4444"]
    };

    this.energyOptions = {
      series: [{ name: "kWh", data: [30, 40, 35, 50, 49, 60, 70] }],
      chart: { height: 300, type: "area", animations: { enabled: true, easing: 'linear', dynamicAnimation: { speed: 800 } } },
      xaxis: { categories: [...categorias] },
      colors: ["#a855f7"]
    };
  }

  ngAfterViewInit() {
    this.intervalId = setInterval(() => {
      this.updateAllCharts();
    }, 3000);
  }

  private updateAllCharts() {
  // Lógica para gerar novos valores
  this.currentTemp = Math.floor(Math.random() * (35 - 20 + 1)) + 20;
  this.currentEnergy = Math.floor(Math.random() * (100 - 40 + 1)) + 40;
  this.currentProd = Math.floor(Math.random() * (90 - 20 + 1)) + 20;
  
  const getNewSeriesData = (chartComponent: ChartComponent, newValue: number) => {
    if (chartComponent && chartComponent.series) {    
      const seriesData = (chartComponent.series as any);      
    
      const currentData = typeof seriesData === 'function' 
        ? [...seriesData()[0].data] 
        : [...seriesData[0].data];

      currentData.shift();
      currentData.push(newValue);
      
      chartComponent.updateSeries([{ data: currentData }], true);
    }
  };

  getNewSeriesData(this.chartTemp, this.currentTemp);
  getNewSeriesData(this.chartEnergy, this.currentEnergy);
  getNewSeriesData(this.chartProducao, this.currentProd);
}
  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
