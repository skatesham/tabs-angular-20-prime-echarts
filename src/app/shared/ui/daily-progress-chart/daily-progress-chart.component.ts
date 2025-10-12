import { Component, effect, inject, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { NgxEchartsModule, provideEchartsCore } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { DailyProgressService, type DailyProgress } from '../../../core/services/daily-progress.service';

echarts.use([LineChart, GridComponent, TooltipComponent, CanvasRenderer]);

@Component({
  selector: 'p-daily-progress-chart',
  standalone: true,
  imports: [CardModule, NgxEchartsModule],
  providers: [provideEchartsCore({ echarts })],
  templateUrl: './daily-progress-chart.component.html',
})
export class DailyProgressChartComponent {
  private readonly progressService = inject(DailyProgressService);
  private readonly now = signal(new Date());
  readonly chartOption = signal<EChartsOption>({});

  constructor() {
    this.progressService.initializeHistory();
    this.progressService.ensureTodayExists();
    this.updateChart();

    setInterval(() => {
      this.now.set(new Date());
      this.progressService.ensureTodayExists();
      this.updateChart();
    }, 60000);

    effect(() => {
      this.now();
      this.updateChart();
    });
  }

  private formatDisplayDate(dateStr: string): string {
    const [year, month, day] = dateStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return `${dayNames[date.getDay()]}\n${day}/${month}`;
  }

  private updateChart() {
    const data = this.progressService.getLastSevenDays();

    const dates = data.map(d => this.formatDisplayDate(d.date));
    const percentages = data.map(d => d.percentage);
    const completed = data.map(d => d.completed);
    const total = data.map(d => d.total);

    const option: EChartsOption = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        textStyle: {
          color: '#374151'
        },
        formatter: (params: any) => {
          const data = params[0];
          const index = data.dataIndex;
          return `
            <div style="padding: 4px;">
              <div style="font-weight: 600; margin-bottom: 4px;">${data.name}</div>
              <div style="font-size: 12px;">
                Concluídas: ${completed[index]}/${total[index]}<br/>
                Progresso: ${percentages[index]}%
              </div>
            </div>
          `;
        }
      },
      grid: {
        left: '50',
        right: '20',
        bottom: '60',
        top: '40'
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisLine: {
          lineStyle: {
            color: '#9ca3af'
          }
        },
        axisLabel: {
          color: '#6b7280',
          fontSize: 12,
          fontWeight: 500,
          interval: 0,
          lineHeight: 16
        }
      },
      yAxis: {
        type: 'value',
        max: 100,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#6b7280',
          fontSize: 11,
          formatter: '{value}%'
        },
        splitLine: {
          lineStyle: {
            color: '#e5e7eb',
            type: 'dashed'
          }
        }
      },
      series: [
        {
          name: 'Progresso',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          data: percentages,
          lineStyle: {
            width: 3,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#06b6d4' },
                { offset: 1, color: '#3b82f6' }
              ]
            }
          },
          itemStyle: {
            color: '#3b82f6',
            borderWidth: 2,
            borderColor: '#fff'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
                { offset: 1, color: 'rgba(59, 130, 246, 0.05)' }
              ]
            }
          }
        }
      ]
    };

    this.chartOption.set(option);
  }

  updateTodayProgress(completed: number, total: number) {
    this.progressService.updateTodayProgress(completed, total);
    this.updateChart();
  }
}
