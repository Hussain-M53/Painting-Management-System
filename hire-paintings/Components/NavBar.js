import Link from "next/link";
import React from "react";

function NavBar({ titles }) {
  return (
    <div className="flex justify-between m-5">
      <Link href="/">
        <div className="text-5xl font-light font-serif">MasterPieces Ltd</div>
      </Link>
      <div className="flex space-x-2">
        {titles.map((title) => {
          return (
            <Link href={`/${title}`}>
              <div className="w-36 text-center p-2 border-2 bg-slate-100 rounded-xl">
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
{
  /* <Link href={"/Artist"}>
          <div className="w-32 text-center p-2 border-2 bg-slate-100 rounded-xl  ">
            Artist
          </div>
        </Link>
        <Link href={"/Owner"}>
          <div className="w-32 text-center p-2 border-2 bg-slate-100 rounded-xl ">
            Owner
          </div>
        </Link>
        <Link href={"/Painting"}>
          <div className="w-32 text-center p-2 border-2 bg-slate-100 rounded-xl  ">
            Paintings
          </div>
        </Link>
        <Link href={"/Paintings-Rented"}>
          <div className="w-36 text-center p-2 border-2 bg-slate-100 rounded-xl">
            Paintings Rented
          </div>
        </Link> */
}
