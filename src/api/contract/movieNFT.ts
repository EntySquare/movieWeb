import { BrowserProvider, Contract } from "ethers";
import abiData from "@/abis.json";

// 合约地址和 ABI
const contractAddress = abiData.movieNFT.address;
const abi = abiData.movieNFT.abi;

export function useMovieNFTContract() {
  if (!window.ethereum) {
    throw new Error("Please install MetaMask.");
  }

  const provider = new BrowserProvider(window.ethereum);
  const readContract = new Contract(contractAddress, abi, provider);

  // 写合约实例
  const getWriteContract = async () => {
    const signer = await provider.getSigner();
    return new Contract(contractAddress, abi, signer);
  };

  // === 读取类方法 ===
  const balanceOf = async (account: any, id: any) => {
    return await readContract.balanceOf(account, id);
  };

  const balanceOfBatch = async (accounts: any, ids: any) => {
    return await readContract.balanceOfBatch(accounts, ids);
  };

  const isApprovedForAll = async (account: any, operator: any) => {
    return await readContract.isApprovedForAll(account, operator);
  };

  const claimableNFTs = async (codeHash: any) => {
    return await readContract.claimableNFTs(codeHash);
  };

  const getRedeemScheme = async (id: any) => {
    return await readContract.getRedeemScheme(id);
  };

  const redeemRecords = async (id: any) => {
    return await readContract.redeemRecords(id);
  };

  const tokenMetadata = async (tokenId: any) => {
    return await readContract.tokenMetadata(tokenId);
  };

  const getUserRedeemRecordIds = async (user: any) => {
    return await readContract.getUserRedeemRecordIds(user);
  };

  const getRedeemRecord = async (id: any) => {
    return await readContract.getRedeemRecord(id);
  };

  const redeemRecordCount = async () => {
    return await readContract.redeemRecordCount();
  };

  const redeemSchemeCount = async () => {
    return await readContract.redeemSchemeCount();
  };

  const uri = async (tokenId: any) => {
    return await readContract.uri(tokenId);
  };

  // === 写入类方法 ===
  const setApprovalForAll = async (operator: any, approved: any) => {
    const contract = await getWriteContract();
    const tx = await contract.setApprovalForAll(operator, approved);
    return await tx.wait();
  };

  const setRedeemRecordStatus = async (id: any, status: any) => {
    const contract = await getWriteContract();
    const tx = await contract.setRedeemRecordStatus(id, status);
    return await tx.wait();
  };

  const claimNFT = async (claimCode: any) => {
    const contract = await getWriteContract();
    const tx = await contract.claimNFT(claimCode);
    return await tx.wait();
  };

  const mintNFT = async (to: any, tokenId: any, amount: any) => {
    const contract = await getWriteContract();
    const tx = await contract.mintNFT(to, tokenId, amount);
    return await tx.wait();
  };

  const redeem = async (schemeId: any) => {
    const contract = await getWriteContract();
    const tx = await contract.redeem(schemeId);
    return await tx.wait();
  };

  const addClaimCode = async (claimCode: any, tokenId: any) => {
    const contract = await getWriteContract();
    const tx = await contract.addClaimCode(claimCode, tokenId);
    return await tx.wait();
  };

  const addRedeemScheme = async (requiredTokenIds: any, reward: any) => {
    const contract = await getWriteContract();
    const tx = await contract.addRedeemScheme(requiredTokenIds, reward);
    return await tx.wait();
  };

  const setNFTMetadata = async (
    tokenId: any,
    name: any,
    rarityId: any,
    categoryId: any,
    image: any
  ) => {
    const contract = await getWriteContract();
    const tx = await contract.setNFTMetadata(
      tokenId,
      name,
      rarityId,
      categoryId,
      image
    );
    return await tx.wait();
  };

  const setRedeemSchemeActive = async (schemeId: any, active: any) => {
    const contract = await getWriteContract();
    const tx = await contract.setRedeemSchemeActive(schemeId, active);
    return await tx.wait();
  };

  return {
    // Read
    balanceOf,
    balanceOfBatch,
    isApprovedForAll,
    claimableNFTs,
    getRedeemScheme,
    redeemRecords,
    tokenMetadata,
    getUserRedeemRecordIds,
    getRedeemRecord,
    redeemRecordCount,
    redeemSchemeCount,
    uri,

    // Write
    setRedeemRecordStatus,
    setApprovalForAll,
    claimNFT,
    mintNFT,
    redeem,
    addClaimCode,
    addRedeemScheme,
    setNFTMetadata,
    setRedeemSchemeActive,
  };
}
