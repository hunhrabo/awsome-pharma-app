import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const SalesPerMonth = ({ salesPerMonth, salesPerMonthPerPerson }) => {
  console.log(salesPerMonthPerPerson);
  // const sortedSalesData = () => {

  // }
  const [activePerson, setActivePerson] = useState("");

  const chartData = {
    options: {
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top" // top, center, bottom
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: val => Number(val),
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: Object.keys(salesPerMonth),
        position: "top",
        labels: {
          offsetY: -18
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },
      fill: {
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          formatter: val => Number(val)
        }
      },
      title: {
        text: "Monthly sales - total, 2018",
        floating: true,
        offsetY: 320,
        align: "center",
        style: {
          color: "#444"
        }
      }
    },
    series: [
      {
        name: "Inflation",
        data: Object.values(salesPerMonth)
      }
    ]
  };

  return (
    <div>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height="350"
      />
      <div>{salesPerMonthPerPerson}</div>
    </div>
  );
};

export default SalesPerMonth;
