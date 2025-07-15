import { BrowserProvider, Contract } from "ethers";
import abiData from "@/abis.json";

// 合约地址
const contractAddress = abiData.movieVoteFactory.address;
// ABI
const abi = abiData.movieVoteFactory.abi;

export function useMovieVoteFactoryContract() {
  if (!window.ethereum) {
    throw new Error("Please install MetaMask.");
  }

  const provider = new BrowserProvider(window.ethereum);
  const readContract = new Contract(contractAddress, abi, provider);

  const getWriteContract = async () => {
    const signer = await provider.getSigner();
    return new Contract(contractAddress, abi, signer);
  };

  // ========== 读合约方法 ==========

  const activePairs = async (index: any) => {
    return await readContract.activePairs(index);
  };

  const admin = async (address: any) => {
    return await readContract.admin(address);
  };

  const allPairs = async () => {
    return await readContract.getAllPairs();
  };

  const getActivePairs = async () => {
    return await readContract.getActivePairs();
  };

  const getAllPairs = async () => {
    return await readContract.getAllPairs();
  };

  const getBlockCount = async () => {
    return await readContract.getBlockCount();
  };

  const isActivePair = async (pairAddress: any) => {
    return await readContract.isActivePair(pairAddress);
  };

  const manager = async () => {
    return await readContract.manager();
  };

  // ========== 写合约方法 ==========

  const addPairFreeTickets = async (_pair: any, _users: any, _amounts: any) => {
    const contract = await getWriteContract();
    const tx = await contract.addPairFreeTickets(_pair, _users, _amounts);
    return await tx.wait();
  };

  const createPair = async (
    _character0: any,
    _character1: any,
    _startBlock: any,
    _endBlock: any,
    _claimBlock: any,
    _referral: any,
    _pool0: any,
    _pool1: any
  ) => {
    const contract = await getWriteContract();
    const tx = await contract.createPair(
      _character0,
      _character1,
      _startBlock,
      _endBlock,
      _claimBlock,
      _referral,
      _pool0,
      _pool1
    );
    return await tx.wait();
  };

  const setAdminBatch = async (_accounts: any, _status: any) => {
    const contract = await getWriteContract();
    const tx = await contract.setAdminBatch(_accounts, _status);
    return await tx.wait();
  };

  const setPairClaimBlock = async (_pair: any, _claimBlock: any) => {
    const contract = await getWriteContract();
    const tx = await contract.setPairClaimBlock(_pair, _claimBlock);
    return await tx.wait();
  };

  const setPairDoubleBlock = async (_pair: any, _start: any, _end: any) => {
    const contract = await getWriteContract();
    const tx = await contract.setPairDoubleBlock(_pair, _start, _end);
    return await tx.wait();
  };

  const setPairReferralContract = async (
    _pair: any,
    _referralContract: any
  ) => {
    const contract = await getWriteContract();
    const tx = await contract.setPairReferralContract(_pair, _referralContract);
    return await tx.wait();
  };

  const transferManager = async (_account: any) => {
    const contract = await getWriteContract();
    const tx = await contract.transferManager(_account);
    return await tx.wait();
  };

  const withdrawPairAll = async (_pair: any, _receiver: any) => {
    const contract = await getWriteContract();
    const tx = await contract.withdrawPairAll(_pair, _receiver);
    return await tx.wait();
  };

  return {
    // 读方法
    activePairs,
    admin,
    allPairs,
    getActivePairs,
    getAllPairs,
    getBlockCount,
    isActivePair,
    manager,
    // 写方法
    addPairFreeTickets,
    createPair,
    setAdminBatch,
    setPairClaimBlock,
    setPairDoubleBlock,
    setPairReferralContract,
    transferManager,
    withdrawPairAll,
  };
}
