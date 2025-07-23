import Web3 from "web3";
import Decimal from "decimal.js";

// 钱包地址缩减方法
export function addressReduce(address: any) {
  if (address === "" || address === undefined || address === null) {
    return "";
  }
  const prefix = address.substring(0, 6);
  const suffix = address.substring(address.length - 4);
  return `${prefix}...${suffix}`.toLowerCase();
}

// 钱包地址缩减方法取后8位
export function addressReduce8(address: any) {
  if (address === "" || address === undefined || address === null) {
    return "";
  }
  const suffix = address.substring(address.length - 8);
  return suffix.toLowerCase();
}

// 18位转换为正常数字
export function formatBalance18(balance: any, fixedNum?: any) {
  if (!balance || balance === "0" || balance === 0) {
    return "";
  }

  let parsedBalance =
    typeof balance === "string" ? balance : balance.toString();
  const isNegative = parsedBalance.includes("-");
  if (isNegative) {
    parsedBalance = parsedBalance.replace("-", "");
  }

  let etherValue = new Decimal(parsedBalance).dividedBy(1e18);
  let result;

  // 保留 fixedNum 位小数（默认 6 位）
  fixedNum = fixedNum ?? 2;
  const precision = new Decimal(10).pow(fixedNum);
  result = etherValue.times(precision).floor().div(precision).toFixed(fixedNum);

  // 检查小数部分是否全为 0
  const [intPart, decimalPart] = result.split(".");
  const allZeroDecimal = decimalPart.split("").every((c) => c === "0");

  const finalResult = allZeroDecimal ? `${intPart}.00` : result;

  return isNegative ? `-${finalResult}` : finalResult;
}

// 转换为bigInt数字
export function formatBalanceBigInt18(balance: any) {
  if (balance == null || balance.toString() == null) {
    return 0;
  }
  if (balance === "") {
    return 0;
  }
  const parsedBalance =
    typeof balance === "string" ? balance : balance.toString();
  // 拆分整数部分和小数部分
  const [integerPart, decimalPart = ""] = parsedBalance.split(".");
  // 计算整数部分的 10^18 倍
  const intResult = integerPart + "0".repeat(18);
  // 计算小数部分的贡献（最多保留 18 位小数）
  const decimalProcessed = (decimalPart + "0".repeat(18)).slice(0, 18);
  // 结果拼接
  const finalResult = intResult.slice(0, -18) + decimalProcessed;
  return finalResult.replace(/^0+/, "") || "0"; // 去掉前导 0
  const etherValue = (parsedBalance * Math.pow(10, 18)).toLocaleString(
    "fullwide",
    { useGrouping: false }
  );
  return etherValue;
}
