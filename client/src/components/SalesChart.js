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
        text: "Monthly sales, 2018",
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
        name: "Sales production",
        data: totalSalesPerMonth.map(month => month.totalProductsSold)
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
      <form>
        <label>
          Select customer:
          <select value={activeCustomer} onChange={handleNameChange}>
            <option value="total">Total</option>
            {salesPerCustomers.map(customer => {
              return (
                <option key={customer.name} value={customer.name}>
                  {customer.name}
                </option>
              );
            })}
          </select>
        </label>
        {/* <label>
          <input
            type="radio"
            value="total"
            checked={activeCustomer === "total"}
            onChange={handleNameChange}
          />
          total
        </label>
        {salesPerCustomers.map(customer => {
          return (
            <label key={customer.name}>
              <input
                type="radio"
                value={customer.name}
                checked={customer.name === activeCustomer}
                onChange={handleNameChange}
              />
              {customer.name}
            </label>
          );
        })} */}
      </form>
    </div>
  );
};

export default SalesChart;
