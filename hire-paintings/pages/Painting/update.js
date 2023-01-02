import axios from "../axios.js";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import Link from "next/link.js";

function update() {
  const router = useRouter();
  const id = useRef();
  const title = useRef();
  const theme = useRef();
  const rental_price = useRef();
  const artist_id = useRef();
  const owner_id = useRef();

  const push_data_to_db = async () => {
    axios
      .post("/Painting", {
        painting_id: id.current.value,
        painting_title: title.current.value,
        theme: theme.current.value,
        rental_price: rental_price.current.value,
        artist_id: artist_id.current.value,
        owner_id: owner_id.current.value,
      })
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
    router.push("/Painting");
  };
  return (
    <>
      <Link href="/Painting">
        <div className="text-5xl font-light font-serif ml-5 mt-5">
          MasterPieces .Ltd
        </div>
      </Link>
      <div className="bg-gray-10 h-screen grid place-items-center">
        <div className="h-2/3 w-2/6 bg-gray-400 grid place-items-center px-5 pt-10 rounded-xl">
        <div className="flex font-mono place-items-center">
            <div className="w-44">Painting ID : </div>
            <div className="w-44">
              <input
                ref={id}
                className="px-2 py-1 rounded-sm focus:outline-none"
                type="text"
                placeholder="ID"
              />
            </div>
          </div>
          <div className="flex font-mono place-items-center">
            <div className="w-44">Painting Title : </div>
            <div className="w-44">
              <input
                ref={title}
                className="px-2 py-1 rounded-sm focus:outline-none "
                type="text"
                placeholder="Title"
              />
            </div>
          </div>
          <div className="flex font-mono place-items-center">
            <div className="w-44">Painting Theme : </div>
            <div className="w-44">
              <input
                ref={theme}
                type="text"
                className="px-2 py-1 rounded-sm focus:outline-none"
                placeholder="Theme"
              />
            </div>
          </div>
          <div className="flex font-mono place-items-center">
            <div className="w-44">Rental Price : </div>
            <div className="w-44">
              <input
                ref={rental_price}
                type="text"
                className="px-2 py-1 rounded-sm focus:outline-none"
                placeholder="Price"
              />
            </div>
          </div>
          <div className="flex font-mono place-items-center">
            <div className="w-44">Artist ID : </div>
            <div className="w-44">
              <input
                ref={artist_id}
                type="text"
                className="px-2 py-1 rounded-sm focus:outline-none"
                placeholder="Arist ID"
              />
            </div>
          </div>
          <div className="flex font-mono place-items-center">
            <div className="w-44">Owner ID : </div>
            <div className="w-44">
              <input
                ref={owner_id}
                type="text"
                className="px-2 py-1 rounded-sm focus:outline-none"
                placeholder="Owner ID"
              />
            </div>
          </div>
          <div>
            <button
              className="font-mono px-5 py-3 bg-zinc-500 mt-5 mb-10 text-white hover:text-violet-400"
              onClick={() => push_data_to_db()}
            >
              Update Painting
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default update;
