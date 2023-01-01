import axios from "../axios.js";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import Link from "next/link.js";

function create() {
  const router = useRouter();
  const name = useRef();
  const address = useRef();

  const push_data_to_db = async () => {
    axios
      .post("/Customer", {
        c_name: name.current.value,
        c_address: address.current.value,
      })
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
    console.log("redirecting to");
    router.push("/Customer");
  };

  return (
    <>
      <Link href="/Customer">
        <div className="text-5xl font-light font-serif ml-5 mt-5">
          MasterPieces .Ltd
        </div>
      </Link>

      <div className="bg-gray-10 h-screen grid place-items-center">
        <div className="h-2/4 w-2/6 bg-gray-400 grid place-items-center px-5 pt-10 rounded-xl">
          <div className="flex font-mono place-items-center">
            <div className="w-44">Customer Name : </div>
            <div className="w-44">
              <input
                ref={name}
                type="text"
                className="px-2 py-1 rounded-sm"
                placeholder="Name"
              />
            </div>
          </div>
          <div className="flex font-mono place-items-center">
            <div className="w-44">Customer Address : </div>
            <div className="w-44">
              <input
                ref={address}
                type="text"
                className="px-2 py-1 rounded-sm"
                placeholder="Address"
              />
            </div>
          </div>
          <div>
            <button
              className="font-mono px-5 py-3 bg-zinc-500 mt-5 mb-10 text-white"
              onClick={() => push_data_to_db()}
            >
              Add Customer
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default create;
