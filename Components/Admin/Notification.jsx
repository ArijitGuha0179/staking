import React,{useState,useEffect} from "react";


const CURRENCY=process.env.NEXT_PUBLIC_CURRENCY;
import List from "./RegularComp/List";

const Notification = ({index,notification,poolDetails}) => {
  const [percentage,setPercentage]=useState();
  useEffect(()=>{
    const calculatePercentage=()=>{
      const amount=notification?.amount??0;
      const percentageNew=(amount/100)*100;
      if(percentageNew==0){
        console.log("Token Balance is zero")  
      }else{
        setPercentage(percentageNew);
      }
    };
    const timer=setTimeout(calculatePercentage,1000);
    return ()=>clearTimeout(timer);
  },[notification]);
  return(
    <div key={index} className="deposit">
      <div className="deposit__name">
        <span style={{color:"white"}} 
        className={`deposit__icon deposit__icon--${index ==0 ?"orange":
          index ==1 ?"green":
          "blue"
        }`}>{CURRENCY}</span>
        <h3 className="deposit__title">{notification?.typeOf}</h3>
      </div>
      <ul className="deposit__list">
        <List name={"Pool ID"} 
        value={`#00-1${notification?.poolID}`}/>
        <List name={"Date"} 
        value={`${notification?.timestamp}`}/>
        <List name={"Amount"} 
        value={`${notification?.amount}`}/>
        <List name={"User"} 
        value={`${notification?.user}`}/>
      </ul>
      <div className={`progress progressbar--${index==0 ? "orange":index==1?"green":"blue"} `}>
        <h3 className="progress__title">
          Accrued {notification?.amount} %
        </h3>
        <div className="progress" role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
          <div className="progress-bar progress-bar-striped progress-bar-animated" 
          style={{width:`${percentage}%`}}>
            <span>
              {percentage.toString().slice(0,2)}%
            </span>
          </div>
        </div>
        <div className="progress__values">
          <span className="progress__value progress__value--left">
            0%
          </span>
          <span className="progress__value progress__value--right">
            100%
          </span>
        </div>
      </div>
      <div className="deposit__profile">
        <span>Token</span>
        <p>{poolDetails?.rewardToken?.symbol}</p>
      </div>
    </div>
  );
};

export default Notification;
