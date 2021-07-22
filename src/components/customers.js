import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import CustomersTable from "./customersTable";
import SearchBox from "./common/searchBox";
import _ from "lodash";
import { toast } from "react-toastify";
import { getCustomers, deleteCustomer } from "../services/customerService";

const Customers = ({ user }) => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const [loading, setLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState({ path: "name", order: "asc" });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchCustomers() {
      const { data } = await getCustomers();
      setCustomers(data);
      setLoading(false);
    }
    fetchCustomers();
  }, []);

  const handleDelete = async (customer) => {
    const origialCustomers = customers;
    const newCustomers = customers.filter(c => c._id !== customer._id);
    setCustomers(newCustomers);
    try {
      await deleteCustomer(customer._id);
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error("This customer has already been deleted");
      setCustomers(origialCustomers);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPageData = () => {
    let filtered = customers;

    if (searchQuery)
      filtered = customers.filter(c =>
        c.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const customersData = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: customersData };
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const { totalCount, data: customersData } = getPageData();

  if(user && !user.isSuperAdmin) return <Redirect to="/" />

  return (
    <div className="row">
      <div className="col">
        {loading ? <h4>Loading...</h4> : null}
        {customers.length === 0 && loading === false ? (
          <h2>There are no customers in the database.</h2>
        ) : loading ? null : (
          <>
            <p>Showing {totalCount} customers in the database.</p>
            <SearchBox value={searchQuery} onChange={handleSearch} />
              <CustomersTable
                user={user}
                customers={customersData}
                onDelete={handleDelete}
                sortColumn={sortColumn}
                onSort={handleSort}
              />
            <Pagination
              itemsCount={totalCount}
              currentPage={currentPage}
              pageSize={pageSize}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Customers;
