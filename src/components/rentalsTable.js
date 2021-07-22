import React from "react";
import Table from "./common/table";

const RentalsTable = ({ sortColumn, onSort, rentals }) => {
  const columns = [
    {
      path: "movie.title",
      label: "Name",
    },
    {
      path: "customer.name",
      label: "Customer",
    },
    {
      path: "customer.phone",
      label: "Phone",
    },
    {
      path: "dateOut",
      label: "Date Out",
    },
    {
      path: "dateReturned",
      label: "Date Returned",
    },
  ];

  return (
    <Table
      data={rentals}
      columns={columns}
      onSort={onSort}
      sortColumn={sortColumn}
    />
  );
};

export default RentalsTable;
