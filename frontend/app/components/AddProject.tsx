import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";

// Add a prop type for the component
interface AddProjectProps {
  onBack: () => void; // Function to call when the back button is clicked
}

const AddProject: React.FC<AddProjectProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <main className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg h-[750px]">
        <div className="flex justify-between p-5">
          <p className="text-black text-[28px] font-semibold">Add Project</p>
          <button
            onClick={onBack} // Use the onBack function when the button is clicked
          >
            <MdOutlineClose className="text-black text-[32px]" />
          </button>
        </div>
        <div className="m-5">
          {/* Search Bar */}
          <div className="relative w-[400px]">
            <input
              type="text"
              placeholder="Search by Name or Contract Address..."
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  // Call your search function here
                  console.log("Searching for:", searchTerm);
                  // searchFunction(searchTerm); // Uncomment and replace with your search function
                }
              }}
              className="text-black h-10 p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            />
            <MdSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddProject;
