import type { NextPage } from "next";
import Head from "next/head";
import NavBar from "../Components/NavBar";

const Home: NextPage = () => {
  const titles = ["Customer", "Artist", "Owner", "Painting", "Paintings-Rented"];
  return (
    <div>
      <Head>
        <title>MasterPieces Ltd</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <NavBar titles={titles} route = {""} />
        <div className="text-white bg-violet-400 text-5xl font-bold text-center mt-28 p-10 font-serif">
          One Stop Hire For Paintings
        </div>
        <div className="text-white bg-violet-400 text-5xl font-bold text-center mt-5 p-10"> Of Your Desire</div>
      </div>
    </div>
  );
};

export default Home;
