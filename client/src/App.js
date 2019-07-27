import React, { useEffect, useState } from "react";
import axios from "axios";
import TopRevenue from "./components/TopRevenue";
import SalesChart from "./components/SalesChart";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const url = "/api";

const App = () => {
  const [salesPerPerson, setSalesPerPerson] = useState([]);
  const [salesPerCustomers, setSalesPerCustomers] = useState([]);

  // run when component is mounted
  useEffect(() => {
    const fetchData = async () => {
      const salespersons = await axios
        .get(`${url}/salespersons`)
        .then(result => {
          return result.data.data.filter(item => item.id !== "");
        });

      const orders = await axios.get(`${url}/orders`).then(result => {
        return result.data.data.filter(items => items.account !== "");
      });

      const products = await axios.get(`${url}/products`).then(result => {
        return result.data.data.filter(item => item["product name"] !== "");
      });

      return {
        salespersons,
        orders,
        products
      };
    };

    // fetch data from backend
    fetchData()
      .then(salesData => {
        // restructure orders by salesperson
        let salesPerSalesperson = salesData.salespersons.map(salesperson => {
          let person = {};
          person.name = salesperson.name;
          person.personId = salesperson.id;

          let salesOfPerson = salesData.orders.filter(
            order => order["salesperson id"] === salesperson.id
          );
          person.monthlySales = months.map(month => {
            return {
              month: month,
              totalRevenue: 0,
              totalProductsSold: 0
            };
          });

          salesOfPerson.forEach(order => {
            let monthOfOrder = Number(order["order date"].split("/")[0]) - 1;
            let productsSold = Number(order["number of product sold"]);
            let productId = order["product id"];
            let productFound = salesData.products.find(
              product => product["product id"] === productId
            );
            let unitPrice = Number(productFound["unit price"]);

            person.monthlySales[monthOfOrder].totalRevenue +=
              productsSold * unitPrice;
            person.monthlySales[monthOfOrder].totalProductsSold += productsSold;
          });
          return person;
        });

        // restructure orders by customers
        let customers = new Set(salesData.orders.map(order => order.account));
        let customersArray = Array.from(customers);

        let salesOfCustomers = customersArray.map(customer => {
          let customerData = {};
          customerData.name = customer;
          let customerOrders = salesData.orders.filter(
            order => order.account === customer
          );

          customerData.monthlySales = months.map(month => {
            return {
              month: month,
              totalProductsSold: 0
            };
          });

          customerOrders.forEach(order => {
            let monthOfOrder = Number(order["order date"].split("/")[0]) - 1;
            let productsSold = Number(order["number of product sold"]);

            customerData.monthlySales[
              monthOfOrder
            ].totalProductsSold += productsSold;
          });
          return customerData;
        });

        // return new datasets
        return {
          salesPerPerson: salesPerSalesperson,
          salesPerCustomer: salesOfCustomers
        };
      })
      .then(result => {
        setSalesPerPerson(result.salesPerPerson);
        setSalesPerCustomers(result.salesPerCustomer);
      });
  }, []);

  // loading screen
  if (salesPerPerson.length === 0 || salesPerCustomers.length === 0) {
    return (
      <div className="loading-div">
        <h2 className="loading-text">Loading...</h2>
        <i className="fas fa-spinner loading-icon" />
      </div>
    );
  } else {
    // render site when data is ready
    return (
      <>
        <main className="content-wrap">
          <h1>AwsomePharma Sales Team Annual Report</h1>
          <TopRevenue salesPerPerson={salesPerPerson} />
          <SalesChart salesPerCustomers={salesPerCustomers} months={months} />
        </main>
        <footer className="footer">Created by Tamas Hrabovszki</footer>
      </>
    );
  }
};

export default App;
