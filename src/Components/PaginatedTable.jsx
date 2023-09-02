import React, { Fragment, useEffect, useState } from "react";
let numOfPage = 2;

const PaginatedTable = ({ data, dataInfo, additionalField }) => {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    let pCount = Math.ceil(data.length / numOfPage);
    setPageCount(pCount);
    let pArr = [];
    for (let index = 1; index <= pCount; index++) {
      pArr = [...pArr, index];
    }
    setPages(pArr);
  }, []);

  useEffect(() => {
    let start = currentPage * numOfPage - numOfPage;
    let end = currentPage * numOfPage;
    setTableData(data.slice(start, end));
  }, [currentPage]);
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
          {tableData.map((data) => (
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
            <span
              className={`page-link pointer ${
                currentPage == 1 ? "disabled" : ""
              }`}
              href="#"
              aria-label="Previous"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <span aria-hidden="true">&raquo;</span>
            </span>
          </li>
          {pages.map((page) => (
            <li key={page} className="page-item">
              <span
                className={`page-link pointer ${
                  currentPage == page ? "alert-success" : ""
                }`}
                href="#"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </span>
            </li>
          ))}

          <li className="page-item">
            <span
              className={`page-link pointer ${
                currentPage == pageCount ? "disabled" : ""
              }`}
              href="#"
              aria-label="Next"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <span aria-hidden="true">&laquo;</span>
            </span>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};
export default PaginatedTable;
