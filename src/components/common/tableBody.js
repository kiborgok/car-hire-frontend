import React from 'react';
import _ from "lodash";

const TableBody = ({ data, columns, loading }) => {

    const renderCell = (item, column) => {
        if (column.content) return column.content(item);
        return _.get(item, column.path)
    }

    const createKey = (item, column) => {
        return item._id + (column.path || column.key);
    }
  
    return (
      <tbody>
        {loading && (
          <tr>
            <td>
              <div className="d-flex justify-content-center">
                <div className="spinner-grow text-info" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </td>
          </tr>
        )}
        {data.length === 0 && loading === false ? (
          <tr>
            <td className="row-md-1">There are no movies in the database</td>
          </tr>
        ) : (
          data.map((item) => (
            <tr key={item._id}>
              {columns.map((column) => (
                <td key={createKey(item, column)}>
                  {renderCell(item, column)}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    );
}

export default TableBody;