import axios from "../axios.js";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import Link from "next/link.js";

function update() {
  const router = useRouter();
  const id = useRef();
  const name = useRef();
  const address = useRef();

  const push_data_to_db = async () => {
    axios
      .put("/Customer/update", {
        customer_id: id.current.value,
        customer_name: name.current.value,
        customer_address: address.current.value,
      })
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
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
            <div className="w-44">Customer ID : </div>
            <div className="w-44">
              <input
                ref={id}
                type="text"
                className="px-2 py-1 rounded-sm focus:outline-none"
                placeholder="ID"
              />
            </div>
          </div>
          <div className="flex font-mono place-items-center">
            <div className="w-44">Customer Name : </div>
            <div className="w-44">
              <input
                ref={name}
                type="text"
                className="px-2 py-1 rounded-sm focus:outline-none"
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
                className="px-2 py-1 rounded-sm focus:outline-none"
                placeholder="Address"
              />
            </div>
          </div>
          <div>
            <button
              className="font-mono px-5 py-3 bg-zinc-500 mt-5 mb-10 text-white hover:text-violet-400"
              onClick={() => push_data_to_db()}
            >
              Update Customer
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default update;
