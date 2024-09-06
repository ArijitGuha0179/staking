import { BigNumber,ethers } from "ethers";
import toast from 'react-hot-toast';
import {contract,tokenContract,ERC20,toEth,TOKEN_ICO_CONTRACT} from './constants';

const STAKING_DAPP_ADDRESS = process.env.NEXT_PUBLIC_STAKING_DAPP;

const DEPOSIT_TOKEN = process.env.NEXT_PUBLIC_DEPOSIT_TOKEN;
const REWARD_TOKEN = process.env.NEXT_PUBLIC_REWARD_TOKEN;
const TOKEN_LOGO = process.env.NEXT_PUBLIC_TOKEN_LOGO;

const notifySuccess=(message)=>{toast.success(message,{duration:2000})};
const notifyError=(message)=>{toast.error(message,{duration:2000})};

//FUNCTIONS

function CONVERT_TIMESTAMP_TO_READABLE_DATE(timestamp){
    const date=new Date(timestamp*1000);
    const readableTime=date.toLocaleTimeString("en-US",{
        year:"numeric",
        month:"2-digit",
        day:"2-digit",
        hour:"2-digit",
        minute:"2-digit",
        second:"2-digit"
    });

    return readableTime;
}

function toWei(amount){
    const toWei= ethers.utils.parseUnits(amount.toString());
    return toWei.toString();
}

function parseErrorMsg(e){
    const json=JSON.parse(JSON.stringify(e));
    return json?.reason || json?.error?.message;
}

export const SHORTEN_ADDRESS=(address)=>{
    return `${address.substring(0,8)}...${address.substring(address.length-4,address.length)}`;
}

export const copyAddress=(address)=>{
    navigator.clipboard.writeText(address);
    notifySuccess("Address copied to clipboard");
}


export async function CONTRACT_DATA(address){
    try{
        const contractObj=await contract();
        const stakingTokenObj= await tokenContract();

        if(address){
            const contractOwner=await contractObj.owner();
            const contractAddress=await contractObj.address;
            //NOTIFY
            const notifications=await contractObj.getNotifications();

            const _notificationsArray=await Promise.all(
                notifications.map(async({poolID,amount,user,typeOf,timestamp})=>{
                    return{
                        poolID:poolID.toNumber(),
                        amount:toEth(amount),
                        user:user,
                        typeOf:typeOf,
                        timestamp:CONVERT_TIMESTAMP_TO_READABLE_DATE(timestamp)
                    }
                })
            );

            // POOLs

            let poolInfoArray=[];
            const poolLength=await contractObj.poolCount();
            const length=poolLength.toNumber();

            for(let i=0;i<length;i++){
                const poolInfo=await contractObj.poolInfo(i);
                const userInfo=await contractObj.userInfo(i,address);
                const userReward=await contractObj.pendingReward(i,address);

                const tokenPoolInfoA=await ERC20(poolInfo.depositToken,address);
                const tokenPoolInfoB=await ERC20(poolInfo.rewardToken,address);

                const pool={
                    depositTokenAddress:poolInfo.depositToken,
                    rewardTokenAddress:poolInfo.rewardToken,
                    depositToken:tokenPoolInfoA,
                    rewardToken:tokenPoolInfoB,
                    depositedAmount:toEth(poolInfo.depositedAmount.toString()),
                    apy:poolInfo.apy.toString(),
                    lockDays:poolInfo.lockDays.toString(),

                    //USER
                    amount:toEth(userInfo.amount.toString()),
                    userReward:toEth(userReward),
                    lockUntil:CONVERT_TIMESTAMP_TO_READABLE_DATE(userInfo.lockUntil.toNumber()),
                    lastRewardAt:toEth(userInfo.lastRewardAt.toString()),
                };
            poolInfoArray.push(pool);  

            }

            const totalDepositAmount=poolInfoArray.reduce((total,pool)=>{
                return total+parseFloat(pool.depositedAmount);
            });

            const rewardToken=await ERC20(REWARD_TOKEN,address);
            const depositToken=await ERC20(DEPOSIT_TOKEN,address);

            const data={
                contractOwner:contractOwner,
                contractAddress:contractAddress,
                notifications:_notificationsArray.reverse(),
                rewardToken:rewardToken,
                depositToken:depositToken,
                poolInfoArray:poolInfoArray,
                totalDepositAmount:totalDepositAmount,
                contractTokenBalance:depositToken.contractTokenBalance-totalDepositAmount,
            };
            return data;
        }
    }catch(e){
        console.log(parseErrorMsg(e));
        return parseErrorMsg(e);
    }
} 

export async function deposit(poolID,amount,address){
    try{
        notifySuccess("Calling Contract...");
        const contractObj=await contract();
        const stakingTokenObj= await tokenContract();

        const amountInWei=ethers.utils.parseUnits(amount.toString(),18);
        const currentAllowance=await stakingTokenObj.allowance(address,contractObj.address);

        if(currentAllowance.lt(amountInWei)){
            notifyError("Approving tokens...");
            const approveTx=await stakingTokenObj.approve(contractObj.address,amountInWei);

            await approveTx.wait();
            console.log(`Approved ${amountInWei.toString()} tokens for staking`);
        }
        const gasEstimation=await contractObj.estimateGas.deposit(Number(poolID),amountInWei);

        notifySuccess("Staking token call....");
        const stakeTx=await contractObj.deposit(Number(poolID),amountInWei,{gasLimit:gasEstimation});

        const receipt= await stakeTx.wait();
        notifySuccess("Token Staked successfully");
    }catch(error){
        console.log(error);
        const errorMsg=parseErrorMsg(error);
        notifyError(errorMsg);
    }
}