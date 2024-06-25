import React, { useState } from "react";
import { MdSearch, MdOutlineClose } from "react-icons/md";
import {
  fetchNftMetadata,
  fetchTokenMetadata,
  createProject,
} from "@/services/projects";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { toast, ToastContainer } from "react-toastify";

interface AddProjectProps {
  onBack: () => void;
}

const AddProject: React.FC<AddProjectProps> = ({ onBack }) => {
  const { address, isConnected } = useWeb3ModalAccount();
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchResult, setFetchResult] = useState<any>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const fetchTokenData = async (tokenAddress: string) => {
    try {
      const metadata = await fetchTokenMetadata(tokenAddress);
      setFetchResult({ result: metadata });
    } catch (error) {
      console.error("Failed to fetch token data:", error);
      setFetchResult(null); // Handle error state appropriately
    }
  };

  const handleAddProject = async () => {
    if (fetchResult && fetchResult.result) {
      try {
        const userId = address?.toString();
        const projectData = {
          name: fetchResult.result.name,
          contractAddress: searchTerm,
          type: "Token", // or 'NFT', depending on your logic
          price: 0,
          logoUrl: fetchResult.result.logo,
          bookmarked: false,
          symbol: fetchResult.result.symbol,
          decimal: fetchResult.result.decimals,
        };
        await createProject(projectData, userId);
        // Handle success (e.g., show a success message, clear the form, etc.)
        console.log("Project added successfully");
        toast.success("Project added successfully");
      } catch (error) {
        // Handle error (e.g., show an error message)
        console.error("Failed to add project:", error);
      }
    }
  };

  return (
    <main className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg h-[750px]">
        <div className="flex justify-between p-5">
          <p className="text-black text-[28px] font-semibold">Add Project</p>
          <button onClick={onBack}>
            <MdOutlineClose className="text-black text-[32px]" />
          </button>
        </div>
        <div className="m-5">
          <div className="relative w-[400px]">
            <input
              type="text"
              placeholder="Search by Name or Contract Address..."
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  fetchTokenData(searchTerm);
                }
              }}
              className="text-black h-10 p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            />
            <MdSearch className="absolute left-3 top-3 text-gray-400" />
            {/* Displaying the result */}
            {fetchResult && fetchResult.result ? (
              <div className="text-black grid place-content-center relative my-3 py-3 px-5">
                <div className="text-black flex justify-between py-3">
                  <p className="font-bold px-2">Name:</p>{" "}
                  <p className=" w-[200px] bg-gray-200 text-center border rounded-sm border-gray-500 p-1">
                    {fetchResult.result.name}
                  </p>
                </div>
                <div className="text-black flex justify-between py-3">
                  <p className="font-bold px-2">Symbol:</p>{" "}
                  <p className=" w-[200px] bg-gray-200 text-center border rounded-sm border-gray-500 p-1">
                    {fetchResult.result.symbol}
                  </p>
                </div>
                <div className="text-black flex justify-between py-3">
                  <p className="font-bold px-2">Decimals:</p>{" "}
                  <p className=" w-[200px] bg-gray-200 text-center border rounded-sm border-gray-500 p-1">
                    {fetchResult.result.decimals}
                  </p>
                </div>
                <button
                  onClick={handleAddProject}
                  className="bg-blue-500 rounded-lg my-5 absolute top-[170px] right-[125px] w-[150px] px-2 py-2 text-[18px] text-nowrap"
                >
                  Add project
                </button>
                <ToastContainer position="top-center" closeOnClick theme="light" />
              </div>
            ) : (
              <div className="text-black mt-10">Loading...</div> // Displaying a loading message if result is not yet available
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddProject;
