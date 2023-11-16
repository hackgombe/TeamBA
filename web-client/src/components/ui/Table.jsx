import { useState, useEffect } from "react";
import {
  UilArrowLeft,
  UilArrowRight,
  UilAngleDoubleDown,
  UilAngleDoubleUp,
  UilExport,
} from "@iconscout/react-unicons";
import { formatToNaira as formatCurrency } from "../../utils/index";

function Text({ ref, variant = "", className = "", children, ...props }) {
  return (
    <p ref={ref} className={`${variant} outline-none ${className}`} {...props}>
      {children}
    </p>
  );
}

function Table({
  className,
  data = [],
  rawData = [],
  paginationLen = 10,
  sortable = [],
  generateLink = () => "",
  withSearch = false,
  withExport = false,
  withPagination = false,
  exportLabel = "Export",
}) {
  const keys = Object.keys(data[0] || []);
  const [sortedData, setSortedData] = useState([...data]);
  const [sortAsc, setSortAsc] = useState(false);
  const [selected, setSelected] = useState(null);
  const [stickyHasShadow, setStickyHasShow] = useState(true);

  const sortIcon = sortAsc ? <UilAngleDoubleUp /> : <UilAngleDoubleDown />;

  const handleSelect = (idx) =>
    setSelected((prev) => {
      if (selected != null) {
        if (prev == idx) {
          return null;
        }

        return idx;
      }

      return idx;
    });

  const handleTableScroll = () => {};

  const handleSearch = (searchTerm) => {
    const sortData = data.filter((datum) =>
      Object.values(datum)
        .join("")
        .toUpperCase()
        .includes(searchTerm.toUpperCase())
    );
    setSortedData(sortData);
  };

  return (
    <>
      {data.length == 0 ? (
        <div className="border shadow-md bg-white rounded-md flex items-center justify-center h-32 w-full">
          <Text variant="b1" className="text-3xl font-bold text-gray-400">
            No content
          </Text>
        </div>
      ) : (
        <>
          <div className="w-full">
            <div className="flex flex-col gap-3 lg:flex-row items-end lg:items-center">
              {withSearch && (
                <div className="w-full lg:w-[40%] order-2 lg:order-1">
                  <Search
                    onChange={(searchTerm) => handleSearch(searchTerm)}
                    nocollapse
                  />
                </div>
              )}
              {withExport && (
                <button className="order-1 lg:order-2 rounded-full border border-gray-300 flex items-center gap-2 px-4 py-2 hover:bg-gray-100 font-bold">
                  <small>{exportLabel}</small>
                  <UilExport />
                </button>
              )}
            </div>
            <div className="w-full h-full mt-4 table-container text-sm no-scrollbar">
              <table
                onScroll={handleTableScroll}
                className={`w-full h-full ${
                  stickyHasShadow ? "sticky-has-shadow" : ""
                }`}
              >
                <thead>
                  <tr>
                    {keys?.map((key, idx) => (
                      <th
                        onClick={() => setSortAsc(!sortAsc)}
                        className={`${
                          sortable.includes(key) ? "cursor-pointer" : ""
                        }`}
                        key={idx}
                      >
                        <span className="flex items-center gap-2">
                          {key} {sortable.includes(key) ? sortIcon : null}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((datum, idx) => (
                    <tr
                      className={`${
                        selected == idx ? "border-y-2 border-y-gray-300" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        // handleSelect(idx)
                      }}
                      key={idx}
                    >
                      {Object.values?.(datum).map(
                        (item, itemIdx) => (
                          <td key={itemIdx}>{item}</td>
                        )
                        // {

                        //     generateLink().find(item => item.key)

                        // }
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {withPagination && data.length > paginationLen && (
              <div className="flex items-center justify-center">
                <div className="w-fit flex items-center gap-4">
                  <button className="hover:text-gray-400 group">
                    <span className="transition-transform group-hover:-translate-x-2">
                      <UilArrowLeft />
                    </span>
                  </button>
                  <div className="">
                    <Text>
                      <span className="font-bold">1</span> / 4
                    </Text>
                  </div>
                  <button className="hover:text-gray-400 group">
                    <span className="transition-transform group-hover:translate-x-2">
                      <UilArrowRight />
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Table;
