import React,{useState,useEffect} from "react";
import { useAccount } from "wagmi";


import {IoMdClose} from "./ReactICON";
import {LOAD_TOKEN_ICO} from "../Context/constants";
import { BUY_TOKEN } from "../Context/index";

const CURRENCY=process.env.NEXT_PUBLIC_CURRENCY;

const ICOSale = ({setLoader}) => {
  const {address}=useAccount();
  const [tokenDetails,setTokenDetails]=useState();
  const [quantity,setQuantity]=useState(0);
  useEffect(()=>{
    const loadToken=async()=>{
      const token=await LOAD_TOKEN_ICO();
      setTokenDetails(token);
      console.log(token);
    };
    loadToken();
  },[address]);
  const CALLING_FUNCTION_BUY_TOKEN=async(quantity)=>{
    setLoader(true);
    console.log(quantity);
    const receipt=await BUY_TOKEN(quantity);
    if(receipt.success){
      console.log(receipt);
      setLoader(false);
      window.location.reload();
    }
    setLoader(false);
  }
  return (
    <div className="modal modal--auto fade" id="modal-deposit1"
    tabIndex={-1} arial-labelledby="modal-deposit1"
    arial-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal__content">
            <button className="modal__close" type="button" data-bs-dismiss="modal"
            arial-label="Close"
            >
              <i className="ti ti-x">
                <IoMdClose/>
              </i>
            </button>
            <h4 className="modal__title">
              {tokenDetails?.token.symbol}
            </h4>
            <p className="modal__text">
              Participate in the <span>Ongoing ICO Token</span> sale
            </p>
            <div className="modal__form">
              <div className="form__group">
                <label className="form__label">
                  ICO Supply :{`${tokenDetails?.tokenBal} ${tokenDetails?.token.symbol}`}
                </label>
                <input type="text" className="form__input"
                placeholder={`${tokenDetails?.token.balance.slice(0, 12)} ${tokenDetails?.token.symbol}`}
                onChange={(e)=>setQuantity(e.target.value)}
                />
                <label className="form__label">
                  Pay Amount
                </label>
                <input type="text" className="form__input"
                placeholder={`${Number(tokenDetails?.tokenPrice)*quantity} ${CURRENCY}`}
                disabled
                />
              </div>
              <button className="form__btn" type="button" onClick={()=>CALLING_FUNCTION_BUY_TOKEN(quantity)}>Buy Token {tokenDetails?.token.symbol} </button>
            </div>
          </div> 
        </div>
      </div>
    </div>
  );
};

export default ICOSale;
