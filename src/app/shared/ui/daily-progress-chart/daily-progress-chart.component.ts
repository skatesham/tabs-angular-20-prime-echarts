import { Component, effect, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { NgxEchartsModule, provideEchartsCore } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([LineChart, GridComponent, TooltipComponent, CanvasRenderer]);

interface DailyProgress {
  date: string;
  completed: number;
  total: number;
  percentage: number;
}

@Component({
  selector: 'p-daily-progress-chart',
  standalone: true,
  imports: [CardModule, NgxEchartsModule],
  providers: [provideEchartsCore({ echarts })],
  templateUrl: './daily-progress-chart.component.html',
})
export class DailyProgressChartComponent {
  private readonly now = signal(new Date());
  readonly chartOption = signal<EChartsOption>({});

  constructor() {
    this.initializeFakeData();
    this.loadTodayProgress();
    this.updateChart();

    // Atualiza a cada minuto para verificar mudança de dia
    setInterval(() => {
      this.now.set(new Date());
      this.checkDayChange();
    }, 60000);

    effect(() => {
      this.now();
      this.updateChart();
    });
  }

  private initializeFakeData() {
    const stored = localStorage.getItem('daily-progress-history');
    if (stored) return;

    // Dados fictícios dos últimos 7 dias
    const fakeData: DailyProgress[] = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = this.formatDate(date);
      
      const total = 5;
      const completed = i === 0 ? 0 : Math.floor(Math.random() * (total + 1));
      
      fakeData.push({
        date: dateStr,
        completed,
        total,
        percentage: total > 0 ? Math.round((completed / total) * 100) : 0
      });
    }

    localStorage.setItem('daily-progress-history', JSON.stringify(fakeData));
  }

  private loadTodayProgress() {
    const today = this.formatDate(new Date());
    const history = this.getHistory();
    const todayData = history.find(d => d.date === today);

    if (!todayData) {
      // Adiciona entrada para hoje
      history.push({
        date: today,
        completed: 0,
        total: 5,
        percentage: 0
      });
      this.saveHistory(history);
    }
  }

  private checkDayChange() {
    const today = this.formatDate(new Date());
    const history = this.getHistory();
    const todayData = history.find(d => d.date === today);

    if (!todayData) {
      // Novo dia, adiciona entrada
      history.push({
        date: today,
        completed: 0,
        total: 5,
        percentage: 0
      });
      
      // Mantém apenas últimos 30 dias
      if (history.length > 30) {
        history.shift();
      }
      
      this.saveHistory(history);
      this.updateChart();
    }
  }

  private getHistory(): DailyProgress[] {
    const stored = localStorage.getItem('daily-progress-history');
    return stored ? JSON.parse(stored) : [];
  }

  private saveHistory(history: DailyProgress[]) {
    localStorage.setItem('daily-progress-history', JSON.stringify(history));
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private formatDisplayDate(dateStr: string): string {
    const [year, month, day] = dateStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const dayName = dayNames[date.getDay()];
    return `${dayName}\n${day}/${month}`;
  }

  private updateChart() {
    const history = this.getHistory();
    const data = history.slice(-7);

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

  // Método para ser chamado quando daily-tasks mudar
  updateTodayProgress(completed: number, total: number) {
    const today = this.formatDate(new Date());
    const history = this.getHistory();
    const todayIndex = history.findIndex(d => d.date === today);

    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    if (todayIndex >= 0) {
      history[todayIndex] = {
        date: today,
        completed,
        total,
        percentage
      };
    } else {
      history.push({
        date: today,
        completed,
        total,
        percentage
      });
    }

    this.saveHistory(history);
    this.updateChart();
  }
}
