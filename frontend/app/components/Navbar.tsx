import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import React, { useState } from "react";

const Navbar = () => {
  const [walletAddress, setWalletAddress] = useState<string | any>("");
  const { address, isConnected } = useWeb3ModalAccount();
  const [token, setToken] = useState<string | any>("");

  async function getAddress() {
    if (isConnected) {
      setWalletAddress(address);
    }
    const backendUrl = "http://localhost:3001/auth/login"; // Adjust the URL/port as necessary

    try {
      localStorage.clear()
      // Send the wallet address to the backend
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: address }),
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Failed to send wallet address to backend");
      }

      // Handle the response from the backend
      const data = await response.json();
      console.log("Login Success:", data);
      console.log("Token:", data.access_token);
      localStorage.setItem("token", data.access_token);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Define the backend endpoint

  return (
    <div className="flex justify-between bg-white p-5 w-screen">
      <p className="text-black text-[32px] font-bold">WEB3 Tracker</p>
      <button onClick={getAddress}>
        <w3m-button />
      </button>
    </div>
  );
};

export default Navbar;
