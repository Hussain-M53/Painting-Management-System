import type { NextPage } from "next";
import Head from "next/head";
import NavBar from "../Components/NavBar";

const Home: NextPage = () => {
  const titles = ["Customer","Artist","Owner","Painting","Hire"]
  return (
    <div className="">
      <Head>
        <title>MasterPieces Ltd</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar titles = {titles}/>
      <div className="text-2xl">One stop hire for paintings</div>
    </div>
  );
};

export default Home;
