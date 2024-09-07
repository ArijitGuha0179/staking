import React,{useEffect,useState} from "react";
import { useAccount } from "wagmi";


import {Header,Footer,Loader,ICOSale} from "../Components/index";
import Admin from "../Components/Admin/Admin";
import AdminHead from "../Components/Admin/AdminHead";
import UpdateAPYModel from "../Components/Admin/UpdateAPYModel";
import Auth from "../Components/Admin/Auth";


import {CONTRACT_DATA,transferToken,createPool,sweep,modifyPool} from "../Context/index";

const ADMIN_ADDRESS= process.env.NEXT_PUBLIC_ADMIN_ADDRESS;

const admin = () => {
  return <div>admin</div>;
};

export default admin;
