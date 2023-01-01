import React from "react";
import TableHeader from "./TableHeader";

function Table({ TableName, no_of_columns, table_data }) {
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
  ];
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
    }
  };
  const get_data = (data, i) => {
    if (
      (TableName == "PAINTINGS RENTED" && (i == 2 || i == 3)) ||
      (TableName == "PAINTINGS" && i == 8)
    ) {
      return data[i].split("T")[0];
    } else if (data[i] != undefined ) {
        return data[i];
    } else {
        return  "----";
    }
  };

  return (
    <div className="justify-end  mx-20 my-12">
      <div className="text-center  text-zinc-900 text-5xl font-serif font-bold my-5">
        {TableName}
      </div>
      <div className="flex justify-around bg-black my-1">
        <TableHeader columns={table()} />
      </div>
      {table_data.map((data) => {
        return (
          <div className="flex border-b-4 justify-around">
            {" "}
            {table().map((row, i) => {
              return (
                <div className="w-56 text-center py-1 font-mono">
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
