import React,{useEffect,useState} from "react";
import { useAccount } from "wagmi";


import {Header,Loader,ICOSale,Statistics,Notification} from "../Components/index";

import {CONTRACT_DATA} from "../Context/index";

const activities = () => {
  const {address} =useAccount();
  const [loader,setLoader]=useState(false);
  const [poolDetails,setPoolDetails]=useState();
  const LOAD_DATA=async()=>{
    if(address){
      setLoader(true);
      
      
        const data=await CONTRACT_DATA(address);
        
        setPoolDetails(data);
      
      setLoader(false);  
    }
  };
  useEffect(()=>{
    LOAD_DATA();
  },[address]);
  return (
  <>
    <Header page={"activity"}/>
    <div className="new-margin">
      <h1>This is the Activities Page</h1>
    </div>
      <Statistics poolDetails={poolDetails} />
      <Notification page={"activity"} poolDetails={poolDetails} />
      <ICOSale setLoader={setLoader} />
      {loader && <Loader />}
    
  </>
  );
};

export default activities;
