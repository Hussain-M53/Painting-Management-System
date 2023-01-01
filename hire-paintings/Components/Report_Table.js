import React, { useEffect, useRef, useState } from "react";
import Bottom_Header from "./Bottom_Header";
import Top_Header from "./Top_Header";
import axios from "../pages/axios.js";

function Report_Table({ TableName, url }) {
  const input_ref = useRef();
  const [table_data, setTable_data] = useState([]);
  const table_top_type = [
    [
      "Customer ID",
      "Customer Name",
      "Customer Address",
      "Category ID",
      "Category Description",
      "Category Discount",
    ],
    [
      "Artist ID",
      "Arist Name",
      "Country_Of_Birth",
      "Year_Of_Birth",
      "Year_Of_Death",
    ],
    ["Owner ID", "Owner Name", "Owner Address", "Owner Contact No"],
  ];
  const table_bottom_type = [
    [
      "Painting ID",
      "Painting Title",
      "Theme",
      "Hire Date",
      "Due Date Back",
      "Return Status",
    ],
    [
      "Painting ID",
      "Painting Title",
      "Theme",
      "Rental Price",
      "Owner ID",
      "Owner Name",
      "Owner Contact No",
    ],
    ["Painting ID", "Painting Title", "Return Date"],
  ];
  const table_top = () => {
    if (TableName == "Customer-Rental") {
      return table_top_type[0];
    } else if (TableName == "Artist-Report") {
      return table_top_type[1];
    } else if (TableName == "Return-Report") {
      return table_top_type[2];
    }
  };
  const table_bottom = () => {
    if (TableName == "Customer-Rental") {
      return table_bottom_type[0];
    } else if (TableName == "Artist-Report") {
      return table_bottom_type[1];
    } else if (TableName == "Return-Report") {
      return table_bottom_type[2];
    }
  };

  const get_data = (data, i) => {
    if (TableName == "Customer-Rental" && (i == 3 || i == 4)) {
      return data.split("T")[0];
    } 
     else if (data != undefined) {
      return data;
    } else {
      return "----";
    }
  };

  const fetch = async () => {
    const res = await axios({
      method: "get",
      url: url + "" + input_ref.current.value,
    });
    setTable_data(res.data);
  };

  useEffect(() => {}, [table_data]);

  return (
    <div className="justify-end  mx-16 my-12 mb-10 border-gray-100 border-2 p-3">
      <div className="text-center  text-zinc-900 text-4xl font-serif font-bold mt-5 ">
        {TableName}
      </div>
      <div className=" text-xl font-serif mb-6 flex place-content-end">
        <div>
          <input
            ref={input_ref}
            className="rounded-md border-2 pl-4 py-1 mr-2 text-gray-500"
            type={"text"}
            required
          />
        </div>
        <button
          onClick={() => fetch()}
          className="bg-gray-200 text-1xl font-mono font-semibold rounded-md px-8 text-gray-500"
        >
          Search
        </button>
      </div>
      <div>
        <div className="flex justify-around bg-black my-1">
          <Top_Header columns={table_top()} />
        </div>
        <div className="flex mb-10 justify-around ">
          {Object.keys(table_data)?.map((data,i) => {
            if (data != "paintings") {
              return (
                <div className="w-56 text-center py-1 mr-2 font-mono">
                  {table_data[data]}
                </div>
              );
            }
          })}
        </div>
      </div>
      <div>
        <div className="flex justify-around bg-black my-1">
          <Bottom_Header columns={table_bottom()} />
        </div>
        {Object.keys(table_data)?.map((data) => {
          if (data == "paintings") {
            return (
              <div>
                {table_data[data]?.map((row) => {
                  return (
                    <div className="flex border-b-4 justify-around ">
                      {row?.map((val,i) => {
                        return (
                          <div className="w-56 text-center py-1 mr-2 font-mono">
                            {get_data(val,i)}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
export default Report_Table;
