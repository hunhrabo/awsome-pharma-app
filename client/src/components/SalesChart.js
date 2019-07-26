import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const SalesChart = ({ salesPerCustomers, months }) => {
  const [totalSalesPerMonth, setTotalSalesPerMonth] = useState([]);
  // const [activePerson, setActivePerson] = useState("total");
  const [activeCustomer, setActiveCustomer] = useState("total");
  console.log(salesPerCustomers);

  useEffect(() => {
    if (activeCustomer !== "total") {
      let currentCustomer = salesPerCustomers.find(
        customer => customer.name === activeCustomer
      );
      setTotalSalesPerMonth(
        currentCustomer.monthlySales.map(month => {
          return {
            month: month,
            totalProductsSold: month.totalProductsSold
          };
        })
      );
    } else if (activeCustomer === "total") {
      setTotalSalesPerMonth(
        months.map(month => {
          let salesOfMonth = salesPerCustomers
            .map(customer => {
              let monthFound = customer.monthlySales.find(
                monthName => monthName.month === month
              );

              return monthFound.totalProductsSold;
            })
            .reduce((previous, current) => previous + current);
          return {
            month: month,
            totalProductsSold: salesOfMonth
          };
        })
      );
    }
  }, [salesPerCustomers, months, activeCustomer]);

  const handleNameChange = e => {
    setActiveCustomer(e.target.value);
  };

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
        categories: months,
        position: "bottom",
        labels: {
          offsetY: 0
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
          show: true,
          formatter: val => Number(val)
        },
        title: {
          text: "Products sold",
          style: {
            fontSize: "16px"
          }
        }
      },
      title: {
        text: `Monthly sales - ${activeCustomer}, 2018`,
        position: "top",
        floating: true,
        offsetY: -5,
        align: "center",
        style: {
          fontSize: "20px",
          color: "#444"
        }
      }
    },
    series: [
      {
        name: "Sales production",
        data: totalSalesPerMonth.map(month => month.totalProductsSold)
      }
    ]
  };

  return (
    <div className="chart-container">
      <h2>Total products sold</h2>
      <form className="customer-select-form">
        <label htmlFor="customer-select">Select customer:</label>
        <select
          name="customer-select"
          value={activeCustomer}
          onChange={handleNameChange}
        >
          <option value="total">Total</option>
          {salesPerCustomers.map(customer => {
            return (
              <option key={customer.name} value={customer.name}>
                {customer.name}
              </option>
            );
          })}
        </select>
      </form>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height="450"
      />
    </div>
  );
};

export default SalesChart;
