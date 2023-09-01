import React, { Fragment } from "react";

const PaginatedTable = ({ data, dataInfo, additionalField }) => {
  return (
    <Fragment>
      <table className="table table-responsive text-center table-hover table-bordered">
        <thead className="table-secondary">
          <tr>
            {dataInfo.map((item) => (
              <th key={item.field}>{item.title}</th>
            ))}
            {additionalField ? <th>{additionalField.title}</th> : null}
          </tr>
        </thead>
        <tbody>
          {data.map((data) => (
            <tr key={data.id}>
              {dataInfo.map((item) => (
                <td key={`${item.field}_${data.id}`}>{data[item.field]}</td>
              ))}
              {additionalField ? (
                <td>{additionalField.elements(data.id)}</td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>

      <nav
        aria-label="Page navigation example"
        className="d-flex justify-content-center"
      >
        <ul className="pagination dir_ltr">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};
export default PaginatedTable;
