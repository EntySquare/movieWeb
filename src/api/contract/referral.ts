import { BrowserProvider, Contract } from "ethers";
import abiData from "@/abis.json";

// 合约地址
const contractAddress = abiData.referral.address;
// ABI
const abi = abiData.referral.abi;

export function useReferralContract() {
  if (!window.ethereum) {
    throw new Error("Please install MetaMask.");
  }

  const provider = new BrowserProvider(window.ethereum);
  const readContract = new Contract(contractAddress, abi, provider);

  // 获取带 signer 的写合约实例
  const getWriteContract = async () => {
    const signer = await provider.getSigner();
    return new Contract(contractAddress, abi, signer);
  };

  // 获取推荐人地址
  const getReferrer = async (user: any) => {
    return await readContract.getReferrer(user);
  };

  // 获取同步信息数组（结构体数组）
  const getSyncInfo = async (syncIndex: any) => {
    return await readContract.getSyncInfo(syncIndex);
  };

  // 判断地址是否是推荐人
  const isReferrer = async (address: any) => {
    return await readContract.isReferrer(address);
  };

  // 获取单个 mapSyncInfo 的结构体内容
  const getMapSyncInfo = async (index: any) => {
    return await readContract.mapSyncInfo(index);
  };

  // 获取某地址的推荐人（referrals 映射）
  const getReferral = async (address: any) => {
    return await readContract.referrals(address);
  };

  // 设置推荐人（需要发起交易）
  const setReferrer = async (referrer: any) => {
    const contract = await getWriteContract();
    const tx = await contract.setReferrer(referrer);
    return await tx.wait();
  };

  // 获取当前同步索引
  const getSyncIndex = async () => {
    return await readContract.syncIndex();
  };

  return {
    getReferrer,
    getSyncInfo,
    isReferrer,
    getMapSyncInfo,
    getReferral,
    setReferrer,
    getSyncIndex,
  };
}
