import Link from "next/link";
import React from "react";

function NavBar({ titles, route }) {
  return (
    <div className="flex justify-between m-5">
      <Link href="/">
        <div className="text-5xl font-light font-serif">MasterPieces .Ltd</div>
      </Link>
      <div className="flex space-x-2">
        {titles.map((title,key) => {
          return (
            <Link href={`${route}/${title}`}>
              <div key= {key} className="w-40 text-center p-2 border-2 bg-slate-100 rounded-xl hover:text-violet-400">
                {title}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default NavBar;