import React, { useState, useEffect } from "react";

const TopRevenue = ({ sales }) => {
  // total sales per salesperson
  const [totalSales, setTotalSales] = useState(sales);

  const [revenueOrder, setRevenueOrder] = useState("");
  const [productsSoldOrder, setProductsSoldOrder] = useState("");

  useEffect(() => {
    setTotalSales(
      sales.map(person => {
        let name = person.name;
        let totalRevenue = person.monthlySales
          .map(month => {
            return month.totalRevenue;
          })
          .reduce((previous, current) => previous + current);

        let totalProductsSold = person.monthlySales
          .map(month => month.totalProductsSold)
          .reduce((previous, current) => previous + current);
        return {
          name,
          totalRevenue,
          totalProductsSold
        };
      })
    );
  }, [sales]);

  const sortByRevenue = () => {
    let copyOfSales = [...totalSales];
    if (revenueOrder === "" || revenueOrder === "descending") {
      copyOfSales.sort((a, b) => {
        return a.totalRevenue - b.totalRevenue;
      });
      setRevenueOrder("ascending");
      setProductsSoldOrder("");
      setTotalSales(copyOfSales);
    } else if (revenueOrder === "ascending") {
      copyOfSales.sort((a, b) => {
        return b.totalRevenue - a.totalRevenue;
      });
      setRevenueOrder("descending");
      setProductsSoldOrder("");
      setTotalSales(copyOfSales);
    }
  };

  const sortByProductsSold = () => {
    let copyOfSales = [...totalSales];
    if (productsSoldOrder === "" || productsSoldOrder === "descending") {
      copyOfSales.sort((a, b) => {
        return a.totalProductsSold - b.totalProductsSold;
      });
      setProductsSoldOrder("ascending");
      setRevenueOrder("");
      setTotalSales(copyOfSales);
    } else if (productsSoldOrder === "ascending") {
      copyOfSales.sort((a, b) => {
        return b.totalProductsSold - a.totalProductsSold;
      });
      setProductsSoldOrder("descending");
      setRevenueOrder("");
      setTotalSales(copyOfSales);
    }
  };

  return (
    <div className="table-container">
      <table className="top-revenue-table">
        <tbody>
          <tr className="table-header">
            <th>Name</th>
            <th onClick={sortByRevenue}>Total revenue (EUR)</th>
            <th onClick={sortByProductsSold}>Total products sold</th>
          </tr>
          {totalSales.map(person => {
            return (
              <tr key={person.name}>
                <td>{person.name}</td>
                <td>{person.totalRevenue}</td>
                <td>{person.totalProductsSold}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TopRevenue;
