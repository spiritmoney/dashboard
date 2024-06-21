"use client";

import Image from "next/image";

export default function ConnectButton() {
  const connectWallet = async () => {
    const isConnected = true;
    if (isConnected) {
      window.location.href = "/";
    }
  };
  return (
    <main className="bg-white flex">
      <div className="relative w-3/5 h-screen">
        <Image
          src="/signup.png"
          alt="image"
          layout="fill"
          objectFit="cover"
          className=""
        />
      </div>
      <div className=" grid-flow-col place-content-center h-screen w-2/5 ">
        <div className=" flex flex-col justify-center items-center space-y-5 p-8">
          <p className="text-[32px] text-black font-bold">WEB3 Tracker</p>
          <button onSubmit={connectWallet}>
            <w3m-button />
          </button>
        </div>
      </div>
    </main>
  );
}
