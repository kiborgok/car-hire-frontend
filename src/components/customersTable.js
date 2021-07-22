import React from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

const CustomersTable = ({
  user,
  customers,
  onDelete,
  sortColumn,
  onSort,
}) => {
  const columns = [
    {
      path: "name",
      label: "Name",
      content: (customer) =>
        user && user.isSuperAdmin ? (
          <Link to={`/customers/${customer._id}`}>{customer.name}</Link>
        ) : (
          <p>{customer.name}</p>
        ),
    },
    { path: "phone", label: "Phone" },
    {
      key: "delete",
      content: (customer) =>
        user && user.isSuperAdmin ? (
          <button
            onClick={() => onDelete(customer)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        ) : null,
    },
  ];

  return (
    <Table
      data={customers}
      columns={columns}
      onSort={onSort}
      sortColumn={sortColumn}
    />
  );
};

export default CustomersTable;
