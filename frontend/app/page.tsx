import React from "react";
import Navbar from "./components/Navbar";

const page = () => {
  return (
    <main className="bg-slate-100 w-screen h-screen">
      <Navbar />
      <div>
        <div className="flex justify-between p-10">
          <p className="text-black text-[28px] font-semibold">
            Tracked Projects
          </p>
          <button className="bg-blue-500 p-5 rounded-xl font-semibold">Add Project</button>
        </div>
        <div className="flex justify-between">
          <div className="p-5 ml-5 space-y-3">
            <p className="text-black text-[24px] font-semibold">
              Token Projects
            </p>
            <div className="w-[900px] bg-white h-[600px] rounded-lg"></div>
          </div>
          <div className="p-5 mr-5 space-y-3">
            <p className="text-black text-[24px] font-semibold">NFT Projects</p>
            <div className="w-[900px] bg-white h-[600px] rounded-lg"></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
