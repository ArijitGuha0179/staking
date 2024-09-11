import React,{useState,useEffect} from "react";

import {IoMdClose} from "./ReactICON";
import PopUpInputField from "./Admin/RegularComp/PopUpInputField";
import PupUpButton from "./Admin/RegularComp/PupUpButton";
import InputRatio from "./Admin/RegularComp/InputRatio";


const PoolsModel = ({
  deposit,
  poolID,
  address,
  selectedPool,
  selectedToken,
  setLoader}) => {
    const [amount,setAmount] = useState();
    const CALLING_FUNCTION=async(poolID,amount,address)=>{
      setLoader(true);
      const receipt=await deposit(poolID,amount,address);
      if(receipt){
        console.log(receipt);
        setLoader(false);
        window.location.reload();
      }
      setLoader(false);
    }
  return (
    <div className="modal modal--auto fade" id="modal-apool" arial-labelledby="modal-apool"
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
              Invest
            </h4>
            <p className="modal__text">
              Welcome to staking pool.Stake your {selectedPool?.depositToken.name} token to earn rewards.
            </p>
            <div className="modal__form">
              <PopUpInputField title={`Stake ${selectedPool?.depositToken.name}`}
              placeholder="amount"
              handleChange={(e)=>setAmount(e.target.value)}
              />
              <div className="form__group">
                <label htmlFor="" className="form__label">Pool Details :</label>
                <ul className="form__radio">
                  <InputRatio 
                  index={1}
                  value={`${selectedPool?.amount}  ${selectedPool?.depositToken.symbol}`}

                  />

                  <InputRatio 
                  index={2}
                  value={`Total Deposited:${selectedPool?.depositedAmount}  ${selectedPool?.depositToken.symbol}`}

                  />
                  <InputRatio 
                  index={3}
                  value={`My Balance:${selectedPool?.depositToken.balance.slice(0,8)}  ${selectedPool?.depositToken.symbol}`}

                  />
                </ul>
              </div>
              <PupUpButton title={"Proceed"}
              handleClick={()=>CALLING_FUNCTION(poolID,amount,address)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolsModel;
