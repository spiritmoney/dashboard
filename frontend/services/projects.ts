export const API_BASE_URL = "http://localhost:3001/projects"; // Adjust as needed

export const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchAllProjects = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/getProjects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const createProject = async (projectData: any, userId: string): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/createProject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify({
        userId: userId,
        name: projectData.name,
        contractAddress: projectData.contractAddress,
        type: projectData.type, // 'Token' or 'NFT'
        price: projectData.price,
        logoUrl: projectData.logoUrl,
        bookmarked: projectData.bookmarked,
        symbol: projectData.symbol,
        decimal: projectData.decimal,
      }),
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

export const fetchTokenMetadata = async (tokenAddress: string): Promise<any> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/token-metadata/${tokenAddress}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
      }
    );
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching token metadata:", error);
    throw error;
  }
};

export const fetchNftMetadata = async (
  contractAddress: string,
  tokenId: string
): Promise<any> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/nft-metadata/${contractAddress}/${tokenId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
      }
    );
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching NFT metadata:", error);
    throw error;
  }
};
