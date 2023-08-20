// showChart("child", 15, 15);

let chart

function showChart(patientType, calculatedIbw, drop) {
  // console.log(patientType,calculatedIbw,drop)
  var chartDataX = [0, 6, 12, 18, 24, 30, 36, 42, 48];
  var fakeChartDataY = [0, 6, 12, 18, 24, 18, 12, 6, 0];
  var chartDataY = [];
  var charDataInMl = [];
  var annotationsXAxis = [];
  var annotationsXAxisColors = [
    "#4CAF50",
    "#03A9F4",
    "#9C27B0",
    "#FFC107",
    "#CDDC39",
    "#9C27B0",
    "#03A9F4",
    "#4CAF50",
  ];

  if (patientType == "child") {
    chartDataY = [0, 1.5, 3, 5, 7, 5, 3, 1.5, 0]; //For child
    for (let i = 0; i < 9; i++) {
      charDataInMl.push(Math.round(calculatedIbw * chartDataY[i]) * 6);
      chartDataY[i] = Math.round(((calculatedIbw * chartDataY[i]) / 60) * drop);
    }
  } else {
    chartDataY = [0, 40, 80, 120, 200, 120, 80, 40, 0]; //For adult
    for (let i = 0; i < 9; i++) {
      charDataInMl.push(Math.round(chartDataY[i] * 6));
      chartDataY[i] = Math.round((chartDataY[i] / 60) * drop);
    }
  }

  for (let i = 0; i < 8; i++) {
    annotationsXAxis.push({
      label: {
        text: i == 7 ? 'KVO' : `${charDataInMl[i + 1]}ml`,
        textAnchor: "middle",
        position: "right",
        orientation: "horizontal",
        borderRadius: 10,
        offsetX: 35,
        offsetY: -5,
      },
      x: chartDataX[i],
      x2: chartDataX[i] + 6,
      fillColor: annotationsXAxisColors[i],
    });
    // console.log(chartDataX[i],chartDataX[i]+6,charDataInMl[i+1])
  }

  var annotationPointX = chartDataX[1];
  var annotationPointY = fakeChartDataY[1];

  var markerSize = 13;

  var options = {
    title: {
      text: "Fluid Management Chart",
      align: "middle",
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
    },
    chart: {
      toolbar: {
        show: true,
        tools: {
          download: false, // <== line to add
        },
      },
      height: 350,
      type: "line",
      stacked: false,
    },
    dataLabels: {
      enabled: true,
      formatter: function (value, { seriesIndex, dataPointIndex, w }) {
        return chartDataY[dataPointIndex];
      },
      offsetX: 0,
      offsetY: 0,
      style: {
        fontSize: "14px",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: "bold",
        colors: ["#00000000"],
      },
      background: {
        enabled: true,
        foreColor: "#fff",
        borderRadius: 0,
        padding: 0,
        opacity: 1,
        // borderWidth: 1,
        borderColor: "#00000000",
      },
      dropShadow: {
        enabled: false,
      },
    },
    markers: {
      size: markerSize,
      colors: undefined,
      strokeColors: "#fff",
      strokeWidth: 2,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [
        {
          seriesIndex: 0,
          dataPointIndex: 0,
          fillColor: "#ff5736",
          strokeColor: "#ff5736",
          size: 0,
          shape: "circle", // "circle" | "square" | "rect"
        },
        {
          seriesIndex: 0,
          dataPointIndex: 1,
          fillColor: "#ff5736",
          strokeColor: "#ff5736",
          size: markerSize,
          shape: "circle", // "circle" | "square" | "rect"
        },
        {
          seriesIndex: 0,
          dataPointIndex: 2,
          fillColor: "#404040",
          strokeColor: "#404040",
          size: markerSize - 3,
          shape: "circle", // "circle" | "square" | "rect"
        },
        {
          seriesIndex: 0,
          dataPointIndex: 3,
          fillColor: "#404040",
          strokeColor: "#404040",
          size: markerSize - 3,
          shape: "circle", // "circle" | "square" | "rect"
        },
        {
          seriesIndex: 0,
          dataPointIndex: 4,
          fillColor: "#404040",
          strokeColor: "#404040",
          size: markerSize - 3,
          shape: "circle", // "circle" | "square" | "rect"
        },
        {
          seriesIndex: 0,
          dataPointIndex: 8,
          fillColor: "#ff5736",
          strokeColor: "#ff5736",
          size: 0,
          shape: "circle", // "circle" | "square" | "rect"
        },
      ],
      shape: "circle",
      radius: 50,
      offsetX: 0,
      offsetY: 0,
      onClick: undefined,
      onDblClick: undefined,
      showNullDataPoints: true,
      hover: {
        size: undefined,
        sizeOffset: 3,
      },
    },
    colors: ["#247BA0"],
    series: [
      {
        name: "Rate of IV Fluid (drops/min)",
        data: fakeChartDataY,
      },
    ],
    stroke: {
      width: [4, 4],
    },
    plotOptions: {
      bar: {
        columnWidth: "20%",
      },
    },
    xaxis: {
      title: {
        text: "Hours",
        offsetX: 0,
        offsetY: 0,
      },
      categories: chartDataX,
    },
    yaxis: [
      {
        tickAmount: 8,
        min: 0,
        max: 27,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#247BA0",
        },
        labels: {
          show: false,
          style: {
            colors: "#247BA0",
          },
        },
        title: {
          text: "Rate of IV Fluid (drops/min)",
          style: {
            color: "#247BA0",
          },
        },
      },
    ],

    annotations: {
      xaxis: annotationsXAxis,
      points: [
        {
          x: annotationPointX,
          y: annotationPointY,
          marker: {
            size: 0,
            fillColor: "#fff",
            strokeColor: "#2698FF",
            radius: 2,
          },
          label: {
            borderColor: "#01d28e",
            offsetY: 20,
            offsetX: 65,
            style: {
              color: "#fff",
              background: "#01d28e",
            },

            text: "Starting fluid for 6h",
          },
        },
      ],
    },
    tooltip: {
      enabled: false,
      shared: false,
      followCursor: false,
      intersect: false,
      // inverseOrder: false,
      // fillSeriesColor: false,
      // theme: false,
      // style: {
      //   fontSize: "12px",
      // },
      // onDatasetHover: {
      //   highlightDataSeries: false,
      // },
      x: {
        show: true,
      },
      marker: {
        show: false,
      },
    },
    legend: {
      horizontalAlign: "left",
      offsetX: 40,
    },
    grid: {
      show: true, // you can either change hear to disable all grids
      xaxis: {
        lines: {
          show: true, //or just here to disable only x axis grids
        },
      },
      yaxis: {
        lines: {
          show: true, //or just here to disable only y axis
        },
      },
    },
  };

  if(chart)chart.destroy()

  chart = new ApexCharts(document.querySelector("#chart"), options);

  chart.render();
}

// showChart("child", 10, 15);
