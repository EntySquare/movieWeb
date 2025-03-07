// src/global.d.ts
export { };
import Web3 from "web3";
declare global {
    interface Window {

        Buffer: any;
        ethereum?: any;
        web3?: Web3;
    }
}