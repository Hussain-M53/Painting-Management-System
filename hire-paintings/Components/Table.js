import React, { useEffect, useRef, useState } from "react";
import TableHeader from "./TableHeader";
import Table_Data from "./Table_Data";

function Table({ TableName, table_data }) {
  const [t_data, setData] = useState(table_data);
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

  const handle_event = (e) => {
    e.preventDefault();
    if (table_data?.filter((row) => row[0] == input_ref.current.value).length > 0) {
      setData(table_data?.filter((row) => row[0] == input_ref.current.value));
    } else {
      setData(table_data);
    }
  };
  useEffect(() => {
    console.log("passed data ",table_data)
    console.log("load data :", t_data);
  },[]);

  return (
    <div className="justify-end  mx-16 my-12 mb-10 border-gray-100 border-2 p-3">
      <div className="text-center  text-zinc-900 text-4xl font-serif font-bold mt-5 ">
        {TableName}
      </div>
      <div className=" text-xl font-serif mb-6 flex place-content-end">
        <div>
          <input
            ref={input_ref}
            className="rounded-md border-2 px-2 py-1 mr-2 text-gray-500 focus:outline-none"
            type={"text"}
            required
            placeholder={`${table()[0]}`}
          />
        </div>
        <button
          onClick={(e) => handle_event(e)}
          className="bg-gray-200 text-2xl font-mono rounded-md px-8 text-gray-400 hover:text-violet-400"
        >
          Search
        </button>
      </div>
      <div className="flex justify-around bg-black my-1 ">
        <TableHeader columns={table()} />
      </div>
      <Table_Data TableName={TableName} t_data={t_data} />
    </div>
  );
}

export default Table;
