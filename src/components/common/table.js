import React from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

const Table = ({columns, sortColumn, onSort, data, loading}) => {
    return (
        <table className="table">
          <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
          <TableBody data={data} columns={columns} loading={loading} />  
        </table>
    )
}

export default Table;