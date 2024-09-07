import React,{useEffect,useState} from "react";
import {useAccount} from 'wagmi';

import {Header,HeroSection,Footer,Pools,PoolsModel,WithdrawModal,Withdraw,Partners,Statistics,Token,Loader,Notification,ICOSale,Ask,Contact} from '../Components/index';
import {CONTRACT_DATA,deposit,withdraw,claimReward,addTokenMetaMask} from '../Context/index';

const index = () => {
  return (
    <>
      <Header/>
      <Footer/>
    </>
  ); 
  
};

export default index;
