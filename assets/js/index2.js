
// Options for the chart
var options = {
    chart: {
        height: 395,
        type: 'area',  // Area chart to mimic the fill under the line
        toolbar: {
            show: false   // Remove extra toolbars
        }
    },
    colors: ['#007BFF', '#00E396'],  // Blue and green colors for lines
    stroke: {
        curve: 'smooth',
        width: 3
    },
    series: [
        {
            name: "This Week",
            data: [1200, 1400, 1300, 1600, 1800, 1500, 1700]  // Sample data for "This Week"
        },
        {
            name: "Last Week",
            data: [1000, 1200, 1150, 1500, 1400, 1600, 1300]  // Sample data for "Last Week"
        }
    ],
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],  // Months as categories
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        }
    },
    yaxis: {
        labels: {
            formatter: function (value) {
                return value.toFixed(0);  // Remove decimal places from y-axis labels
            }
        }
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.4,
            opacityTo: 0.2,
            stops: [0, 100]
        }
    },
    dataLabels: {
        enabled: false
    },
    markers: {
        size: 5,
        colors: ['#007BFF', '#00E396'],
        strokeColor: '#fff',
        strokeWidth: 2
    },
    tooltip: {
        theme: 'light'
    },
    grid: {
        borderColor: '#e7e7e7',
        strokeDashArray: 5
    }
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

var attendanceOptions = {
        chart: {
            height: 350,
            type: 'area',
            toolbar: {
                show: false
            }
        },
        colors: ['#008FFB'], // Blue color for attendance area
        stroke: {
            curve: 'smooth',
            width: 3
        },
        series: [{
            name: 'Attendance',
            data: [70, 60, 80, 55, 90, 75, 85]  // Sample data for monthly attendance
        }],
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],  // Months
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return value + "%";  // Showing percentage format
                }
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.4,
                opacityTo: 0.2,
                stops: [0, 100]
            }
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 5,
            colors: ['#008FFB'],
            strokeColor: '#fff',
            strokeWidth: 2
        },
        tooltip: {
            theme: 'light'
        },
        grid: {
            borderColor: '#e7e7e7',
            strokeDashArray: 5
        }
    };

    var attendanceChart = new ApexCharts(document.querySelector("#attendance-chart"), attendanceOptions);
    attendanceChart.render();

var financialOptions = {
    series: [{
    name: 'Net Profit',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
}, {
    name: 'Revenue',
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
}, {
    name: 'Free Cash Flow',
    data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
}],
chart: {
    type: 'bar',
    height: 350
},
plotOptions: {
    bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
    },
},
dataLabels: {
    enabled: false
},
stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
},
xaxis: {
    categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
},
yaxis: {
    title: {
        text: '$ (thousands)'
    }
},
fill: {
    opacity: 1
},
tooltip: {
    y: {
        formatter: function (val) {
            return "$ " + val + " thousands"
        }
    }
}
};

var financialChart = new ApexCharts(document.querySelector("#financial-chart"), financialOptions);
financialChart.render();
