import {ether} from 'ethers';
import StakingDappABI from './StakingDapp.json';
import TokenICO from './TokenICO.json';
import CustomTokenABI from './ERC20.json';

// Contract

const STAKING_DAPP_ADDRESS = process.env.NEXT_PUBLIC_STAKING_DAPP;
const TOKEN_ICO = process.env.NEXT_PUBLIC_TOKEN_ICO;

// Token
const DEPOSIT_TOKEN = process.env.NEXT_PUBLIC_DEPOSIT_TOKEN;
const REWARD_TOKEN = process.env.NEXT_PUBLIC_REWARD_TOKEN;

export function toEth(amount,decimals=18){
    const toEth= ether.utils.formatUnits(amount,decimals);
    return toEth.toString();
}

export const tokenContract=async()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const {ethereum} = window;

    if(ethereum){
        const signer=provider.getSigner();
        const contractReader=new ethers.Contract(DEPOSIT_TOKEN, CustomTokenABI.abi, signer);
        return contractReader;
    }
};

export const contract=async()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const {ethereum} = window;

    if(ethereum){
        const signer=provider.getSigner();
        const contractReader=new ethers.Contract(STAKING_DAPP_ADDRESS, StakingDappABI.abi, signer);
        return contractReader;
    }
};

export const ERC20=async(address,userAddress)=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const {ethereum} = window;
    if(ethereum){
        const signer=provider.getSigner();
        const contractReader=new ethers.Contract(address, CustomTokenABI.abi, signer);
        const token={
            name:await contractReader.name(),
            symbol:await contractReader.symbol(),
            address:await contractReader.address,
            totalSupply:toEth(await contractReader.totalSupply()),
            balance:toEth(await contractReader.balanceOf(userAddress)),
            contractTokenBalance:toEth(await contractReader.balanceOf(STAKING_DAPP_ADDRESS)),
        };
        return token;
    }
};

// TOKEN ICO CONTRACT

export const LOAD_TOKEN_ICO=async()=>{
    try{
        const contract=await TOKEN_ICO_CONTRACT();
        const tokenAddress=await contract.tokenAddress();
        const tokenDetails=await contract.getTokenDetails();
        const contractOwner=await contract.owner();
        const soldTokens=await contract.soldTokens();

        const ICO_TOKEN=await TOKEN_ICO_ERC20();
        const token={
            tokenBal:ether.utils.formatUnits(tokenDetails.balance.toString()),
            name:tokenDetails.name,
            symbol:tokenDetails.symbol,
            supply:ether.utils.formatUnits(tokenDetails.supply.toString()),
            tokenPrice:ether.utils.formatUnits(tokenDetails.tokenPrice.toString()),
            tokenAddr:tokenDetails.tokenAddr,
            owner:contractOwner.toLowercase(),
            soldTokens:soldTokens.toNumber(),
            token:ICO_TOKEN,
        };

        return token;
    }catch(error){
        console.log(error);
    }
}

export const TOKEN_ICO_CONTRACT=async()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const {ethereum} = window;

    if(ethereum){
        const signer=provider.getSigner();
        const contractReader=new ethers.Contract(TOKEN_ICO, TokenICO.abi, signer);
        return contractReader;
    }
};

export const TOKEN_ICO_ERC20=async()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const {ethereum} = window;
    try{
        if(ethereum){
            const signer=provider.getSigner();
            const contractReader=new ethers.Contract(DEPOSIT_TOKEN, CustomTokenABI.abi, signer);
            //USER Address
    
            const userAddress=await signer.getAddress();
            const nativeBalance=await signer.getBalance(userAddress);
            const balance=await contractReader.balanceOf(userAddress);
            const token={
                address:await contractReader.address,
                name:await contractReader.name(),
                symbol:await contractReader.symbol(),
                decimals:await contractReader.decimals(),
                supply:toEth(await contractReader.totalSupply()),
                balance:toEth(balance),
                nativeBalance:toEth(nativeBalance.toString()),
            };
            return token;
        }
    }catch(error){
        console.log(error);
    }
};