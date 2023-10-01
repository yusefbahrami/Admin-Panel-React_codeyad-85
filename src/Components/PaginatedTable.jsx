import React, { Fragment, useEffect, useState } from "react";
import SpinnerLoad from "./SpinnerLoad";

const PaginatedTable = ({
  children,
  data,
  dataInfo,
  // additionalField,
  searchParams,
  loading,
}) => {
  const [initData, setInitData] = useState(data);
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [searchChar, setSearchChar] = useState("");
  const [numOfPage, setNumOfPage] = useState(10);

  useEffect(() => {
    let pCount = Math.ceil(initData.length / numOfPage);
    setPageCount(pCount);
    let pArr = [];
    for (let index = 1; index <= pCount; index++) {
      pArr = [...pArr, index];
    }
    setPages(pArr);
  }, [initData, numOfPage]);

  useEffect(() => {
    let start = currentPage * numOfPage - numOfPage;
    let end = currentPage * numOfPage;
    setTableData(initData.slice(start, end));
  }, [currentPage, initData, numOfPage]);

  useEffect(() => {
    if (data != [] && data != initData) {
      setInitData(data);
      // setCurrentPage(1);
    }
  }, [data]);

  useEffect(() => {
    setInitData(
      data.filter((d) => d[searchParams.searchField].includes(searchChar))
    );
    setCurrentPage(1);
  }, [searchChar]);

  const handleSetNumOfPage = (e) => {
    if (e.target.value == "") {
      setNumOfPage(1);
    } else if (Number(e.target.value >= initData.length)) {
      setNumOfPage(initData.length);
    } else {
      setNumOfPage(Number(e.target.value));
    }
  };
  return (
    <Fragment>
      <div className="row justify-content-between">
        <div className="col-10 col-md-6 col-lg-4">
          <div className="input-group mb-3 dir_ltr">
            <input
              type="text"
              className="form-control"
              placeholder={searchParams.placeholder}
              onChange={(e) => setSearchChar(e.target.value)}
            />
            <span className="input-group-text">{searchParams.title}</span>
          </div>
        </div>
        <div className="col-2 col-md-6 col-lg-4 d-flex flex-column align-items-end">
          {children}
        </div>
      </div>

      {loading ? (
        <SpinnerLoad colorClass={"text-primary"} />
      ) : data.length ? (
        <table className="table table-responsive text-center table-hover table-bordered">
          <thead className="table-secondary">
            {/* <tr>
              {dataInfo.map((item) => (
                <th key={`${item.field}__${item.title}`}>{item.title}</th>
              ))}

              {additionalField
                ? additionalField.map((a, index) => (
                    <th key={`${a.id}_${a.title}_${index}`}>{a.title}</th>
                  ))
                : null}
            </tr> */}
            <tr>
              {dataInfo.map((i, index) => (
                <th key={i.field || `notField__${index}`}>{i.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* {tableData.map((data) => (
              <tr key={data.id}>
                {dataInfo.map((item) => (
                  <td key={`${item.field}_${item.title}_${data.id}`}>
                    {data[item.field]}
                  </td>
                ))}

                {additionalField
                  ? additionalField.map((a, index) => (
                      <td key={`${a.id}_${a.title}__${index}`}>
                        {a.elements(data)}
                      </td>
                    ))
                  : null}
              </tr>
            ))} */}
            {tableData.map((d) => (
              <tr key={d.id}>
                {dataInfo.map((i, index) =>
                  i.field ? (
                    <td key={i.field + "_" + d.id}>{d[i.field]}</td>
                  ) : (
                    <td key={d.id + "__" + i.id + "__" + index}>
                      {i.elements(d)}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h5 className="text-center text-danger my-5">دیتایی یافت نشد!</h5>
      )}

      <div>
        <input
          type="number"
          id="input-itemNumber"
          onChange={handleSetNumOfPage}
          value={numOfPage}
          min={1}
          max={initData.length}
        />
      </div>

      {pages.length > 1 ? (
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
      ) : null}
    </Fragment>
  );
};
export default PaginatedTable;
