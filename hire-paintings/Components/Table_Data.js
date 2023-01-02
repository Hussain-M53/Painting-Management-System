import React from "react";

function Table_Data({TableName,t_data}) {
  const get_data = (data, i) => {
    if (
      (TableName == "PAINTINGS RENTED" && (i == 2 || i == 3)) ||
      (TableName == "PAINTINGS" && i == 8)
    ) {
      return data.split("T")[0];
    } else if (data != undefined) {
      return data;
    } else {
      return "----";
    }
  };
  return (
    <div>
      {" "}
      {t_data?.map((row) => {
        return (
          <div className="flex border-b-4 justify-around ">
            {row?.map((data, i) => {
              return (
                <div key={data}  className="w-56 text-center py-1 mr-2 font-mono">
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

export default Table_Data;
