import React, { useState, useEffect } from "react";

const TopRevenue = ({ salesPerPerson }) => {
  // total sales per salesperson
  const [totalSales, setTotalSales] = useState(salesPerPerson);
  const [tableStatus, setTableStatus] = useState("collapsed");
  const [orderedBy, setOrderedBy] = useState("revenue");

  // reorder salespersons by revenue - top to low
  useEffect(() => {
    setTotalSales(
      salesPerPerson
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
  }, [salesPerPerson]);

  // handler functions for reordering table data
  const sortByRevenue = () => {
    let copyOfSales = [...totalSales];

    copyOfSales.sort((a, b) => {
      return b.totalRevenue - a.totalRevenue;
    });

    setOrderedBy("revenue");
    setTotalSales(copyOfSales);
  };

  const sortByProductsSold = () => {
    let copyOfSales = [...totalSales];

    copyOfSales.sort((a, b) => {
      return b.totalProductsSold - a.totalProductsSold;
    });

    setOrderedBy("products");
    setTotalSales(copyOfSales);
  };

  const handleTableDisplay = () => {
    let newStatus = tableStatus === "collapsed" ? "open" : "collapsed";
    setTableStatus(newStatus);
  };

  // dinamically change elements attributes
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
