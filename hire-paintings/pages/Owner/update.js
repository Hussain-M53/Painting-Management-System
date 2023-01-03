import axios from "../axios.js";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import Link from "next/link.js";

function update() {
  const router = useRouter();
  const id = useRef();
  const name = useRef();
  const address = useRef();
  const contact = useRef();

  const push_data_to_db = async () => {
    axios
      .put("/Owner/update", {
        owner_id: id.current.value,
        owner_name: name.current.value,
        owner_address: address.current.value,
        owner_telephone: contact.current.value,
      })
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
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
            <div className="w-44">Owner ID : </div>
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
              Update Owner
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default update;
