import axios from "../axios.js";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import Link from "next/link.js";

function add() {
  const router = useRouter();
  const c_id = useRef();
  const p_id = useRef();
  const hire_date = useRef();
  const due_date_back = useRef();
  const push_data_to_db = async () => {
    await axios
      .post("/Paintings-Rented", {
        customer_id: c_id.current.value,
        painting_id: p_id.current.value,
        hire_date: hire_date.current.value,
        due_date_back: due_date_back.current.value,
      })
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
    router.push("/Paintings-Rented");
  };
  return (
    <>
      <Link href="/Paintings-Rented">
        <div className="text-5xl font-light font-serif ml-5 mt-5">
          MasterPieces .Ltd
        </div>
      </Link>
      <div className="bg-gray-10 h-screen grid place-items-center">
        <div className="h-2/3 w-2/6 bg-gray-400 grid place-items-center px-5 pt-10 rounded-xl">
          <div className="flex font-mono place-items-center">
            <div className="w-44">Customer ID : </div>
            <div className="w-44">
              <input
                ref={c_id}
                className="px-2 py-1 rounded-sm focus:outline-none"
                type="text"
                placeholder="Customer ID"
              />
            </div>
          </div>
          <div className="flex font-mono place-items-center">
            <div className="w-44">Painting ID : </div>
            <div className="w-44">
              <input
                ref={p_id}
                type="text"
                className="px-2 py-1 rounded-sm focus:outline-none"
                placeholder="Painting ID"
              />
            </div>
          </div>
          <div className="flex font-mono place-items-center">
            <div className="w-44">Hire Date : </div>
            <div className="w-44">
              <input
                ref={hire_date}
                type="text"
                className="px-2 py-1 rounded-sm focus:outline-none"
                placeholder="dd-mm-yyyy"
              />
            </div>
          </div>
          <div className="flex font-mono place-items-center">
            <div className="w-44">Due Date Back : </div>
            <div className="w-44">
              <input
                ref={due_date_back}
                type="text"
                className="px-2 py-1 rounded-sm focus:outline-none"
                placeholder="dd-mm-yyyy"
              />
            </div>
          </div>
          <div>
            <button
              onClick={() => push_data_to_db()}
              className="font-mono px-5 py-3 bg-zinc-500 mt-5 mb-10 text-white hover:text-violet-400"
            >
              Hire Painting
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default add;
