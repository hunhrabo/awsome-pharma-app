import React, { useState, useEffect } from "react";

const TopRevenue = ({ sales }) => {
  // total sales per salesperson
  const [totalSales, setTotalSales] = useState(sales);
  const [tableStatus, setTableStatus] = useState("collapsed");
  const [orderedBy, setOrderedBy] = useState("revenue");

  // const [revenueOrder, setRevenueOrder] = useState("");
  // const [productsSoldOrder, setProductsSoldOrder] = useState("");

  useEffect(() => {
    setTotalSales(
      sales
        .map(person => {
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
        .sort((a, b) => {
          return b.totalRevenue - a.totalRevenue;
        })
    );
    // setRevenueOrder("descending");
  }, [sales]);

  const sortByRevenue = () => {
    let copyOfSales = [...totalSales];
    copyOfSales.sort((a, b) => {
      return b.totalRevenue - a.totalRevenue;
    });
    setOrderedBy("revenue");
    setTotalSales(copyOfSales);
    // if (revenueOrder === "" || revenueOrder === "descending") {
    //   copyOfSales.sort((a, b) => {
    //     return a.totalRevenue - b.totalRevenue;
    //   });
    //   setRevenueOrder("ascending");
    //   setProductsSoldOrder("");
    //   setTotalSales(copyOfSales);
    // } else if (revenueOrder === "ascending") {
    //   copyOfSales.sort((a, b) => {
    //     return b.totalRevenue - a.totalRevenue;
    //   });
    //   setRevenueOrder("descending");
    //   setProductsSoldOrder("");
    //   setTotalSales(copyOfSales);
    // }
  };

  const sortByProductsSold = () => {
    let copyOfSales = [...totalSales];
    copyOfSales.sort((a, b) => {
      return b.totalProductsSold - a.totalProductsSold;
    });
    setOrderedBy("products");
    setTotalSales(copyOfSales);

    // if (productsSoldOrder === "" || productsSoldOrder === "descending") {
    //   copyOfSales.sort((a, b) => {
    //     return a.totalProductsSold - b.totalProductsSold;
    //   });
    //   setProductsSoldOrder("ascending");
    //   setRevenueOrder("");
    //   setTotalSales(copyOfSales);
    // } else if (productsSoldOrder === "ascending") {
    //   copyOfSales.sort((a, b) => {
    //     return b.totalProductsSold - a.totalProductsSold;
    //   });
    //   setProductsSoldOrder("descending");
    //   setRevenueOrder("");
    //   setTotalSales(copyOfSales);
    // }
  };

  const handleTableDisplay = () => {
    let newStatus = tableStatus === "collapsed" ? "open" : "collapsed";
    setTableStatus(newStatus);
  };

  const buttonText =
    tableStatus === "collapsed" ? "Show more..." : "Show less...";
  const personsToShow = tableStatus === "collapsed" ? 3 : totalSales.length;

  return (
    <div className="table-container">
      <h2>Top salespersons</h2>
      <table className="top-revenue-table">
        <tbody>
          <tr className="table-header">
            <th>
              <p>Name</p>
            </th>
            <th className="table-tab">
              <p onClick={sortByRevenue}>
                Total revenue (EUR)
                <i
                  className="fas fa-chevron-down"
                  style={{
                    visibility: orderedBy === "revenue" ? "visible" : "hidden"
                  }}
                  // visibility={orderedBy === "revenue" ? "visible" : "hidden"}
                />
              </p>
            </th>
            <th className="table-tab">
              <p onClick={sortByProductsSold}>
                Total products sold
                <i
                  className="fas fa-chevron-down"
                  style={{
                    visibility: orderedBy === "products" ? "visible" : "hidden"
                  }}
                  // visibility={orderedBy === "products" ? "visible" : "hidden"}
                />
              </p>
            </th>
          </tr>
          {totalSales.map((person, index) => {
            return (
              <tr
                key={person.name}
                style={{
                  visibility: index >= personsToShow ? "collapse" : "visible"
                }}
              >
                <td>{person.name}</td>
                <td>{person.totalRevenue}</td>
                <td>{person.totalProductsSold}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="btn-container">
        <button onClick={handleTableDisplay}>{buttonText}</button>
      </div>
    </div>
  );
};

export default TopRevenue;
