import { Component, OnDestroy, ViewChild } from '@angular/core';
import {
  ChartComponent,
  NgApexchartsModule,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard',
  imports: [NgApexchartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnDestroy {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>
  private intervalId: any;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Peças Produzidas",
          data: [45, 52, 38, 24, 33, 26, 60]
        }
      ],
      chart: {
        height: '100%',
        type: "bar",
        toolbar: { show: false }
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
          borderRadius: 4,
          dataLabels: {
            position: "top" 
          },
          
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return val + " un";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00"],
        position: "bottom",
      },
      yaxis: {
        title: {
          text: "Peças por Hora"
        }
      },
      title: {
        text: "Monitoramento de Produção",
        align: "center",
        style: { color: '#444' }
      }
    };
  }

  // codigo para atualizar o grafico dinamicamente
  ngAfterViewInit() {
    this.intervalId = setInterval(() => {
      const newData = [...(this.chartOptions.series![0].data as number[])];
      newData.shift();
      newData.push(Math.floor(Math.random() * (80 - 20 + 1)) + 20);

      const newCategories = [...this.chartOptions.xaxis!.categories!];
      const lastTime = newCategories[newCategories.length - 1].split(':');
      const nextHour = (parseInt(lastTime[0]) + 1) % 24;
      newCategories.shift();
      newCategories.push(`${nextHour.toString().padStart(2, '0')}:00`);

      this.chart.updateOptions({
        series: [{
          data: newData
        }],
        xaxis: {
          categories: newCategories
        }
      });

    }, 3000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
