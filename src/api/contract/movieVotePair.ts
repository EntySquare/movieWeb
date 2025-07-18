import { BrowserProvider, Contract } from "ethers";
import abiData from "@/abis.json";

// 从abiData中获取ABI
const abi = abiData.movieVotePair.abi;

export function useMovieVotePairContract(contractAddress: string) {
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

  // ===== 读取方法 =====
  const getCharacter0 = async () => {
    return await readContract.character0();
  };

  const getCharacter1 = async () => {
    return await readContract.character1();
  };

  const getClaimBlock = async () => {
    return await readContract.claimBlock();
  };

  const getDoubleEndBlock = async () => {
    return await readContract.doubleEndBlock();
  };

  const getDoubleStartBlock = async () => {
    return await readContract.doubleStartBlock();
  };

  const getEndBlock = async () => {
    return await readContract.endBlock();
  };

  const getExpectClaimReward = async (user: string) => {
    return await readContract.expectClaimReward(user);
  };

  const getFactory = async () => {
    return await readContract.factory();
  };

  const getUserFreeTickets = async (user: string) => {
    return await readContract.getUserFreeTickets(user);
  };

  const getUserVotes = async (user: string) => {
    return await readContract.getUserVotes(user);
  };

  const getVotes = async () => {
    return await readContract.getVotes();
  };

  const hasClaimed = async (user: string) => {
    return await readContract.hasClaimed(user);
  };

  const isVotingActive = async () => {
    return await readContract.isVotingActive();
  };

  const getReferralContract = async () => {
    return await readContract.referralContract();
  };

  const getBaseInfo = async () => {
    return await readContract.getBaseInfo();
  };

  const getStartBlock = async () => {
    return await readContract.startBlock();
  };

  const getUsdtContract = async () => {
    return await readContract.usdtContract();
  };

  const getUsdtPool0 = async () => {
    return await readContract.usdtPool0();
  };

  const getUsdtPool1 = async () => {
    return await readContract.usdtPool1();
  };

  const getUsdtVotesMap0 = async (user: string) => {
    return await readContract.usdtVotesMap0(user);
  };

  const getUsdtVotesMap1 = async (user: string) => {
    return await readContract.usdtVotesMap1(user);
  };

  const getVotes0 = async () => {
    return await readContract.votes0();
  };

  const getVotes1 = async () => {
    return await readContract.votes1();
  };

  const getVotesMap0 = async (user: string) => {
    return await readContract.votesMap0(user);
  };

  const getVotesMap1 = async (user: string) => {
    return await readContract.votesMap1(user);
  };

  // ===== 写入方法 =====
  const addFreeTickets = async (users: string[], amounts: number[]) => {
    const contract = await getWriteContract();
    const tx = await contract.addFreeTickets(users, amounts);
    return await tx.wait();
  };

  const claimReward = async () => {
    const contract = await getWriteContract();
    const tx = await contract.claimReward();
    return await tx.wait();
  };

  const setClaimBlock = async (claimBlock: number) => {
    const contract = await getWriteContract();
    const tx = await contract.setClaimBlock(claimBlock);
    return await tx.wait();
  };

  const setDoubleBlock = async (start: number, end: number) => {
    const contract = await getWriteContract();
    const tx = await contract.setDoubleBlock(start, end);
    return await tx.wait();
  };

  const setReferralContract = async (referralContract: string) => {
    const contract = await getWriteContract();
    const tx = await contract.setReferralContract(referralContract);
    return await tx.wait();
  };

  const voteWithFreeTicket = async (characterIndex: number, amount: number) => {
    const contract = await getWriteContract();
    const tx = await contract.voteWithFreeTicket(characterIndex, amount);
    return await tx.wait();
  };

  const voteWithUSDT = async (characterIndex: number, amount: number) => {
    const contract = await getWriteContract();
    const tx = await contract.voteWithUSDT(characterIndex, amount);
    return await tx.wait();
  };

  const withdrawAll = async (receiver: string) => {
    const contract = await getWriteContract();
    const tx = await contract.withdrawAll(receiver);
    return await tx.wait();
  };

  return {
    // 读取方法
    getCharacter0,
    getCharacter1,
    getClaimBlock,
    getDoubleEndBlock,
    getDoubleStartBlock,
    getEndBlock,
    getExpectClaimReward,
    getFactory,
    getUserFreeTickets,
    getUserVotes,
    getVotes,
    hasClaimed,
    isVotingActive,
    getReferralContract,
    getStartBlock,
    getUsdtContract,
    getUsdtPool0,
    getUsdtPool1,
    getUsdtVotesMap0,
    getUsdtVotesMap1,
    getVotes0,
    getVotes1,
    getVotesMap0,
    getVotesMap1,
    getBaseInfo,

    // 写入方法
    addFreeTickets,
    claimReward,
    setClaimBlock,
    setDoubleBlock,
    setReferralContract: setReferralContract,
    voteWithFreeTicket,
    voteWithUSDT,
    withdrawAll,
  };
}
