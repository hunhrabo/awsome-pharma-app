import React, { useEffect, useState } from "react";
import axios from "axios";
import TopRevenue from "./components/TopRevenue";
import SalesChart from "./components/SalesChart";

let months = [
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

const App = () => {
  const [sales, setSales] = useState([]);
  const [salesPerCustomers, setSalesPerCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const salespersons = await axios
        .get("http://localhost:3001/api/salespersons")
        .then(result => {
          return result.data.data.filter(item => item.id !== "");
        });

      const orders = await axios
        .get("http://localhost:3001/api/orders")
        .then(result => {
          return result.data.data.filter(items => items.account !== "");
        });

      const products = await axios
        .get("http://localhost:3001/api/products")
        .then(result => {
          return result.data.data.filter(item => item["product name"] !== "");
        });

      return {
        salespersons,
        orders,
        products
      };
    };

    fetchData()
      .then(salesData => {
        let salesPerPerson = salesData.salespersons.map(salesperson => {
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

        return {
          salesPerPerson: salesPerPerson,
          salesPerCustomer: salesOfCustomers
        };
      })
      .then(result => {
        console.log(result);

        setSales(result.salesPerPerson);
        setSalesPerCustomers(result.salesPerCustomer);
      });
  }, []);

  if (sales.length === 0 || salesPerCustomers.length === 0) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="content-wrap">
        <h1>AwsomePharma Sales Team Annual Report</h1>
        <TopRevenue sales={sales} />
        <SalesChart salesPerCustomers={salesPerCustomers} months={months} />
      </div>
    );
  }
};

export default App;
