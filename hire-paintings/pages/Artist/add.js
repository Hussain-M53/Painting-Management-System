import axios from "../axios.js";
import React, { useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link.js";

function add() {
  const router = useRouter();
  const name = useRef();
  const cob = useRef();
  const yob = useRef();
  const yod = useRef();

  const push_data_to_db = async () => {
    axios
      .post("/Artist", {
        art_name: name.current.value,
        art_cob: cob.current.value,
        art_yob: yob.current.value,
        art_yod: yod.current.value,
      })
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
    console.log("redirecting to");
    router.push("/Artist");
  };
  return (
    <>
      <Link href="/Artist">
        <div className="text-5xl font-light font-serif ml-5 mt-5">MasterPieces .Ltd</div>
      </Link>
      <div className="bg-gray-10 h-screen grid place-items-center">
        <div className="h-2/3 w-2/6 bg-gray-400 grid place-items-center px-5 pt-10 rounded-xl">
          <div className="flex font-mono place-items-center">
            <div className="w-44">Artist Name : </div>
            <div className="w-44">
              <input
                className="px-2 py-1 rounded-sm"
                ref={name}
                type="text"
                placeholder="Name"
              />
            </div>
          </div>
          <div className="flex font-mono place-items-center">
            <div className="w-44">Country Of Birth : </div>
            <div className="w-44">
              <input
                type="text"
                className="px-2 py-1 rounded-sm"
                ref={cob}
                placeholder="Country Of Birth"
              />
            </div>
          </div>
          <div className="flex font-mono place-items-center">
            <div className="w-44">Year Of Birth : </div>
            <div className="w-44">
              <input
                type="text"
                className="px-2 py-1 rounded-sm"
                ref={yob}
                placeholder="Year Of Birth "
              />
            </div>
          </div>
          <div className="flex font-mono place-items-center">
            <div className="w-44">Year Of Death : </div>
            <div className="w-44">
              <input
                type="text"
                className="px-2 py-1 rounded-sm"
                ref={yod}
                placeholder="Year Of Death"
              />
            </div>
          </div>
          <div>
            <button
              className="font-mono px-5 py-3 bg-zinc-500 mt-5 mb-10 text-white"
              onClick={() => push_data_to_db()}
            >
              Add Artist
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default add;
