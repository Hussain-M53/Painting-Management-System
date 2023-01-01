import React from "react";

function TableHeader({ columns }) {
  return (
    <>
      {columns.map((column) => {
        return (
          <div className="w-40 text-center font-mono p-2 font-bold text-white">{column}</div>
        );
      })}
    </>
  );
}

export default TableHeader;
