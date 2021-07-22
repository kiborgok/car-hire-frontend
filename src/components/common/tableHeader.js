import React from 'react';

const TableHeader = ({ columns, onSort, sortColumn }) => {
    
    const raiseSort = path => {
        const sotColumn = { ...sortColumn }
        if (sotColumn.path === path) {
        sotColumn.order = (sotColumn.order === "asc") ? "desc" : "asc"
        }else {
        sotColumn.path = path;
        sotColumn.order = "asc";
        }
        onSort(sotColumn)
    }

    const renderSortIcon = column => {
        if (column.path !== sortColumn.path) return null;
        if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;
        return <i className="fa fa-sort-desc" />;
    }

    return (
        <thead>
            <tr>
                {
                    columns.map(column => (
                        <th
                            className="clickable"
                            key={column.path || column.key}
                            onClick={() => raiseSort(column.path)}
                        >
                            {column.label} {renderSortIcon(column)}
                        </th>
                    ))
                }
            </tr>
        </thead>
    )
}

export default TableHeader;