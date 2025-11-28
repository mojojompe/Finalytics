import React from 'react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';

interface ChartDataPoint {
    x: Date;
    y: number[];
}

interface CandlestickChartProps {
    data: ChartDataPoint[];
    volumeData?: { x: Date; y: number }[];
    height?: number;
}

import useSettingsStore from '../stores/useSettingsStore';

const CandlestickChart: React.FC<CandlestickChartProps> = ({ data, volumeData, height = 400 }) => {
    const { chartType, showVolume } = useSettingsStore();

    const options: ApexOptions = {
        chart: {
            type: chartType === 'area' ? 'area' : chartType === 'line' ? 'line' : 'candlestick',
            height: height,
            background: 'transparent',
            toolbar: {
                show: true,
                tools: {
                    download: false,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true
                }
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
            }
        },
        title: {
            text: undefined,
        },
        xaxis: {
            type: 'datetime',
            labels: {
                style: {
                    colors: '#94a3b8',
                    fontFamily: 'Inter, sans-serif',
                }
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            }
        },
        yaxis: [
            {
                tooltip: {
                    enabled: true
                },
                labels: {
                    style: {
                        colors: '#94a3b8',
                        fontFamily: 'Inter, sans-serif',
                    },
                    formatter: (value) => {
                        return "$" + value.toFixed(2);
                    }
                }
            },
            {
                opposite: true,
                show: showVolume && !!volumeData,
                labels: {
                    style: {
                        colors: '#94a3b8',
                        fontFamily: 'Inter, sans-serif',
                    }
                }
            }
        ],
        grid: {
            borderColor: '#334155',
            strokeDashArray: 4,
        },
        theme: {
            mode: 'dark',
        },
        plotOptions: {
            candlestick: {
                colors: {
                    upward: '#10B981',
                    downward: '#EF4444'
                }
            }
        }
    };

    if (!data || data.length === 0) {
        return (
            <div className="h-full flex items-center justify-center text-slate-500">
                Loading chart data...
            </div>
        );
    }

    // Prepare series based on chart type
    let series: any[] = [];
    if (chartType === 'candlestick') {
        series = [{ name: 'Price', type: 'candlestick', data: data }];
    } else {
        // For line/area, we need just the close price (y[3])
        const lineData = data.map(d => ({ x: d.x, y: d.y[3] }));
        series = [{ name: 'Price', type: chartType, data: lineData }];
    }

    if (showVolume && volumeData) {
        series.push({
            name: 'Volume',
            type: 'bar',
            data: volumeData
        });
    }

    return (
        <div className="w-full h-full rounded-xl overflow-hidden bg-secondary/50 p-4">
            <Chart options={options} series={series} type={chartType === 'area' ? 'area' : chartType === 'line' ? 'line' : 'candlestick'} height={height} />
        </div>
    );
};

export default CandlestickChart;
