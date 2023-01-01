import React, { useEffect, useRef } from "react";
import TableHeader from "./TableHeader";

function Table({ TableName, table_data }) {
  let filter = false;
  const table_type = [
    ["Customer ID", "Customer Name", "Customer Address", "Category ID"],
    ["Owner ID", "Onwer Name", "Owner Address", "Owner Contact"],
    [
      "Artist ID",
      "Artist Name",
      "Country Of Birth",
      "Year Of Birth",
      "Year Of Death",
    ],
    [
      "Painting ID",
      "Painting Title",
      "Painting Theme",
      "Rental Price",
      "Artist ID",
      "Owner ID",
      "Amount Paid To Owner",
      "Available",
      "Inserted At",
    ],
    [
      "Customer ID",
      "Painting ID",
      "Hire Date",
      "Due Date Back",
      "Return Status",
    ],
    [
      "Customer ID",
      "Customer Name",
      "Custoemr Address",
      "Category ID",
      "Category Description",
      "Category Discount",
      "Painting ID",
      "Painting Title",
      "Theme",
      "Hire Date",
      "Due Date Back",
      "Return Status",
    ],
  ];
  const input_ref = useRef();
  const table = () => {
    if (TableName == "CUSTOMERS") {
      return table_type[0];
    } else if (TableName == "ARTISTS") {
      return table_type[2];
    } else if (TableName == "OWNERS") {
      return table_type[1];
    } else if (TableName == "PAINTINGS") {
      return table_type[3];
    } else if (TableName == "PAINTINGS RENTED") {
      return table_type[4];
    } else if (TableName == "Customer-Rental") {
      return table_type[5];
    }
  };
  const get_data = (data, i) => {
    if (
      (TableName == "PAINTINGS RENTED" && (i == 2 || i == 3)) ||
      (TableName == "PAINTINGS" && i == 8)
    ) {
      return data[i].split("T")[0];
    } else if (data[i] != undefined) {
      return data[i];
    } else {
      return "----";
    }
  };

  const handle_event = () => {
    filter = !filter;
    console.log(input_ref.current.value);
  };
  useEffect(() => {}, [filter, table_data]);

  return (
    <div className="justify-end  mx-16 my-12 mb-10 border-gray-100 border-2 p-3">
      <div className="text-center  text-zinc-900 text-5xl font-serif font-bold mt-5 ">
        {TableName}
      </div>
      <div className=" text-xl font-serif mb-6 flex place-content-end">
        <div>
          <input
            ref={input_ref}
            className="rounded-md border-2 pl-4 py-1 mr-2 text-gray-500"
            type={"text"}
            required
            placeholder={`${table()[0]}`}
          />
        </div>
        <button
          onClick={() => handle_event()}
          className="bg-gray-200 text-2xl font-mono font-semibold rounded-md px-8 text-gray-500"
        >
          filter
        </button>
      </div>
      <div className="flex justify-around bg-black my-1 ">
        <TableHeader columns={table()} />
      </div>
      {table_data.map((data) => {
        return (
          <div className="flex border-b-4 justify-around ">
            {table().map((row, i) => {
              return (
                <div className="w-56 text-center py-1 mr-2 font-mono">
                  {get_data(data, i)}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Table;
