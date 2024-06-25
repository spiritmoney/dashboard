"use client";

import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import AddProject from "./components/AddProject";
import { fetchAllProjects } from "@/services/projects";

const Page = () => {
  const [showAddProject, setShowAddProject] = useState(false);
  const [projects, setProjects] = useState<[]>([]);
  const [tokens, setTokens] = useState<[]>([]);
  const [nftProjects, setNftProjects] = useState<[]>([]);

  const toggleAddProject = () => setShowAddProject(!showAddProject);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const fetchedProjects = await fetchAllProjects();
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    const loadTokens = async () => {
      const url =
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en";
      try {
        const response = await fetch(url);
        const data = await response.json();
        setTokens(data); // Update the tokens state with fetched data
      } catch (error) {
        console.error("Failed to fetch tokens:", error);
      }
    };

    const loadNFTProjects = async () => {
      const url =
        "https://api.coingecko.com/api/v3/nfts/list?order=market_cap_usd_desc&per_page=20&page=1";
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("NFT Projects:", data);
        setNftProjects(data); // Update the NFT projects state with fetched data
      } catch (error) {
        console.error("Failed to fetch NFT projects:", error);
      }
    };

    loadProjects();
    loadTokens();
    loadNFTProjects();
  }, []);

  return (
    <main className="bg-slate-100 w-screen h-screen">
      <Navbar />
      {showAddProject ? (
        <AddProject onBack={toggleAddProject} />
      ) : (
        <div>
          <div className="flex justify-between p-10">
            <p className="text-black text-[28px] font-semibold">
              Tracked Projects
            </p>
            <button
              className="bg-blue-500 p-5 rounded-xl font-semibold"
              onClick={toggleAddProject}
            >
              Add Project
            </button>
          </div>
          <div className="flex justify-between">
            <div className="p-5 ml-5 space-y-3">
              <p className="text-black text-[24px] font-semibold">
                Token Projects
              </p>
              <div className="max-w-[900px] lg:w-[900px] bg-white h-[600px] rounded-lg text-black py-5 overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left">
                      <th>#</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Symbol</th>
                      <th>Current Price</th>
                      <th>Market Cap</th>
                      <th>Total Supply</th>
                    </tr>
                  </thead>
                  <tbody className="text-[20px] text-gray-800 mt-5">
                    {tokens.map((token: any, index) => (
                      <tr
                        key={index}
                        className=""
                        style={{ borderBottom: "10px solid transparent" }}
                      >
                        <td className="py-3">{index + 1}</td>
                        <td>
                          <img
                            src={token.image}
                            alt={token.name}
                            style={{ width: "30px", height: "30px" }}
                          />
                        </td>
                        <td>{token.name}</td>
                        <td>{token.symbol.toUpperCase()}</td>
                        <td>${token.current_price.toLocaleString()}</td>
                        <td>${token.market_cap.toLocaleString()}</td>
                        <td>
                          {token.total_supply
                            ? token.total_supply.toLocaleString()
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="p-5 mr-5 space-y-3">
              <p className="text-black text-[24px] font-semibold">
                NFT Projects
              </p>
              <div className="max-w-[900px] lg:w-[900px] bg-white h-[600px] rounded-lg text-black py-5 px-3 overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left">
                      <th>#</th>
                      <th>Name</th>
                      <th>Symbol</th>
                      <th>Chain</th>
                      <th>Contract Address</th>
                    </tr>
                  </thead>
                  <tbody className="text-[20px] text-gray-800">
                    {nftProjects.map((nft: any, index) => (
                      <tr
                        key={index}
                        className=""
                        style={{ borderBottom: "20px solid transparent" }}
                      >
                        <td className="px-3 py-2">{index + 1}</td>
                        <td className="px-3">{nft.name}</td>
                        <td className="px-3">
                          {nft.symbol ? nft.symbol.toUpperCase() : "N/A"}
                        </td>
                        <td className=" text-nowrap px-3">
                          {nft.asset_platform_id}
                        </td>
                        <td className="px-3">{nft.contract_address}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Page;
