import { BrowserProvider, Contract } from "ethers";
import abiData from "@/abis.json";

const contractAddress = abiData.NFTMarketplace.address;
const abi = abiData.NFTMarketplace.abi;

export function useNftMarketplaceContract() {
  if (!window.ethereum) {
    throw new Error("Please install MetaMask.");
  }

  const provider = new BrowserProvider(window.ethereum);
  const readContract = new Contract(contractAddress, abi, provider);

  const getWriteContract = async () => {
    const signer = await provider.getSigner();
    return new Contract(contractAddress, abi, signer);
  };

  // ---------- 写方法（交易函数） ----------
  const buyNFT = async (tokenId: any, amount: any, maxTotalPrice: any) => {
    const contract = await getWriteContract();
    const tx = await contract.buyNFT(tokenId, amount, maxTotalPrice);
    return await tx.wait();
  };

  const listNFT = async (tokenId: any, amount: any, price: any) => {
    const contract = await getWriteContract();
    const tx = await contract.listNFT(tokenId, amount, price);
    return await tx.wait();
  };

  const unlistNFT = async (listingId: any) => {
    const contract = await getWriteContract();
    const tx = await contract.unlistNFT(listingId);
    return await tx.wait();
  };

  const setSlippagePermille = async (_permille: any) => {
    const contract = await getWriteContract();
    const tx = await contract.setSlippagePermille(_permille);
    return await tx.wait();
  };

  // ---------- 读方法（view/pure） ----------
  const getListingsBySeller = async (seller: any, offset: any, limit: any) => {
    return await readContract.getListingsBySeller(seller, offset, limit);
  };

  const getListingsByTokenId = async (
    tokenId: any,
    offset: any,
    limit: any
  ) => {
    return await readContract.getListingsByTokenId(tokenId, offset, limit);
  };

  const getLowestPrice = async (tokenId: any) => {
    return await readContract.getLowestPrice(tokenId);
  };

  const getSellerListingIds = async (seller: any) => {
    return await readContract.getSellerListingIds(seller);
  };

  const getTokenListingIds = async (tokenId: any) => {
    return await readContract.getTokenListingIds(tokenId);
  };

  const getListingDetail = async (listingId: any) => {
    return await readContract.listings(listingId);
  };

  const getNFTAddress = async () => {
    return await readContract.nft();
  };

  const getUSDTAddress = async () => {
    return await readContract.usdt();
  };

  const getSlippagePermille = async () => {
    return await readContract.slippagePermille();
  };

  const supportsInterface = async (interfaceId: any) => {
    return await readContract.supportsInterface(interfaceId);
  };

  return {
    // 写函数
    buyNFT,
    listNFT,
    unlistNFT,
    setSlippagePermille,

    // 读函数
    getListingsBySeller,
    getListingsByTokenId,
    getLowestPrice,
    getSellerListingIds,
    getTokenListingIds,
    getListingDetail,
    getNFTAddress,
    getUSDTAddress,
    getSlippagePermille,
    supportsInterface,
  };
}
