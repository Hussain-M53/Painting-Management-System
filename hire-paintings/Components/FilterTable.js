import { useRouter } from "next/router";
import React, { useRef } from "react";
import TableHeader from "./TableHeader";

function FilterTable({ Path, TableName, table_data }) {
  const router = useRouter();
  const table_type = [
    ["Customer ID", "Customer Name", "Customer Address", "Category ID","Category Description","Category Discount"],
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
    }
  };
  const get_data = (data, i) => {
    if (TableName == "PAINTINGS" && i == 8) {
      return data.split("T")[0];
    } else if (data != undefined) {
      return data;
    } else {
      return "----";
    }
  };
  const handle_event = (e) => {
    e.preventDefault();

    router.push({
      pathname: `${input_ref.current.value}`,
      query: {
        id: input_ref.current.value,
      },
    });
  };

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
      <div className="flex border-b-4 justify-around ">
        {Object.values(table_data)?.map((data, i) => {
          return (
            <div key={i} className="w-56 text-center py-1 mr-2 font-mono">
              {get_data(data, i)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FilterTable;
