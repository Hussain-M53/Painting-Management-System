import axios from "../axios.js";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import Link from "next/link.js";

function add() {
  const router = useRouter();
  const name = useRef();
  const address = useRef();
  const contact = useRef();

  const push_data_to_db = async () => {
    axios
      .post("/Owner", {
        o_name: name.current.value,
        o_address: address.current.value,
        o_telephone: contact.current.value,
      })
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
    console.log("redirecting to");
    router.push("/Owner");
  };
  return (
    <>
      <Link href="/Owner">
        <div className="text-5xl font-light font-serif ml-5 mt-5">
          MasterPieces .Ltd
        </div>
      </Link>
      <div className="bg-gray-10 h-screen grid place-items-center">
        <div className="h-2/4 w-2/6 bg-gray-400 grid place-items-center px-5 pt-10 rounded-xl">
          <div className="flex font-mono place-items-center">
            <div className="w-44">Owner Name : </div>
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
            <div className="w-44">Owner Address : </div>
            <div className="w-44">
              <input
                ref={address}
                type="text"
                className="px-2 py-1 rounded-sm focus:outline-none"
                placeholder="Address"
              />
            </div>
          </div>
          <div className="flex font-mono place-items-center">
            <div className="w-44">Owner Contact Info : </div>
            <div className="w-44">
              <input
                ref={contact}
                type="text"
                className="px-2 py-1 rounded-sm focus:outline-none"
                placeholder="Contact Info"
              />
            </div>
          </div>
          <div>
            <button
              className="font-mono px-5 py-3 bg-zinc-500 mt-5 mb-10 text-white hover:text-violet-400"
              onClick={() => push_data_to_db()}
            >
              Add Owner
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default add;
