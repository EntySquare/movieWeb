import { BrowserProvider, Contract } from "ethers";
import abiData from "@/abis.json";

// 合约地址
const contractAddress = abiData.tsetU.address;
// ABI
const abi = abiData.tsetU.abi;
declare global {
  interface Window {
    ethereum?: any;
  }
}

export function useUsdtTokenContract() {
  if (!window.ethereum) {
    throw new Error("Please install MetaMask.");
  }
  const provider = new BrowserProvider(window.ethereum);
  const readContract = new Contract(contractAddress, abi, provider);

  // 获取带签名者的可写合约
  const getWriteContract = async () => {
    const signer = await provider.getSigner();
    return new Contract(contractAddress, abi, signer);
  };

  // 获取账户余额
  const getBalanceOf = async (address: string) => {
    return await readContract.balanceOf(address);
  };

  // 获取授权额度
  const getAllowance = async (owner: string, spender: string) => {
    return await readContract.allowance(owner, spender);
  };

  // 授权某地址使用代币
  const approve = async (spender: string, amount: string | number) => {
    const contract = await getWriteContract();
    const tx = await contract.approve(spender, amount.toString());
    return await tx.wait();
  };

  // 获取代币小数位
  const getDecimals = async () => {
    return await readContract.decimals();
  };

  // 获取合约管理员
  const getManager = async () => {
    return await readContract.manager();
  };

  // 设置合约管理员
  const setManager = async (_manager: string) => {
    const contract = await getWriteContract();
    const tx = await contract.setManager(_manager);
    return await tx.wait();
  };

  // 铸造代币
  const mint = async (to: string, amount: string | number) => {
    const contract = await getWriteContract();
    const tx = await contract.mint(to, amount.toString());
    return await tx.wait();
  };

  // 获取代币名称
  const getName = async () => {
    return await readContract.name();
  };

  // 获取合约拥有者
  const getOwner = async () => {
    return await readContract.owner();
  };

  // 获取代币符号
  const getSymbol = async () => {
    return await readContract.symbol();
  };

  // 获取总供应量
  const getTotalSupply = async () => {
    return await readContract.totalSupply();
  };

  // 转账
  const transfer = async (to: string, amount: string | number) => {
    const contract = await getWriteContract();
    const tx = await contract.transfer(to, amount.toString());
    return await tx.wait();
  };

  // 从他人账户（需授权）转账
  const transferFrom = async (
    from: string,
    to: string,
    amount: string | number
  ) => {
    const contract = await getWriteContract();
    const tx = await contract.transferFrom(from, to, amount.toString());
    return await tx.wait();
  };

  return {
    getBalanceOf,
    getAllowance,
    approve,
    getDecimals,
    getManager,
    setManager,
    mint,
    getName,
    getOwner,
    getSymbol,
    getTotalSupply,
    transfer,
    transferFrom,
  };
}
