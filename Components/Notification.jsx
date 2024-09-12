import React from "react";

import {copyAddress, SHORTEN_ADDRESS} from "../Context/index";
import {FaRegCopy} from "./ReactICON";


const Notification = ({poolDetails,page}) => {
  const notificationsArray=poolDetails?.notifications ?? [];
  return (
    <div className="section">
    <div className="container">
      <div className="row">
        {
          page!="activity" && (
            <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
          <div className="section-title">
            <h2 style={{color:"white"}}>Notifications </h2>
            
          </div>
        </div>
          ) 
        }
        <div className="col-12">
          <div className="deals scrollable-div" style={{overflowX:"scroll"}}>
            <table className="deals_table">
              <thead style={{color:"white"}}>
                <tr>
                  <th>Type</th>
                  <th>Token</th>
                  <th>User</th>
                  <th>Amount</th>
                  <th>PoolID</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {notificationsArray.map((notify,index)=>(
                  <tr key={index}>
                    <td>
                      <div className="deals__text">
                        
                        {notify?.typeOf}
                      </div>
                    </td>
                    <td>
                      <div className="deals__exchange">
                      &nbsp; &nbsp;{" "}
                        <img src="img/exchanges/ethereum.png" alt="token" />
                        <span className="green">
                          {poolDetails?.rewardToken.symbol}
                          {poolDetails?.rewardToken.name}
                        </span>
                        <span className="red" >
                        &nbsp; &nbsp;{" "}
                        <FaRegCopy onClick={
                          ()=>copyAddress(poolDetails?.rewardToken.address)
                        }/>
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="deals__text deals__text--green">
                      &nbsp; &nbsp;{" "}
                        {SHORTEN_ADDRESS(notify?.user)}
                        <span className="red" >
                        &nbsp; &nbsp;{" "}
                        <FaRegCopy onClick={
                          ()=>copyAddress(notify?.user)
                        }/>
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="deals__text deals__text--sell"  style={{color:"white"}}>
                        {`${notify?.amount} ${poolDetails?.rewardToken.symbol}`}
                      </div>
                    </td>
                    <td>
                      <div className="deals__text" >
                        {`#00-${notify?.poolID}`}
                      </div>
                    </td>
                    <td>
                      <div className="deals__text deals__text--sell">
                        {`${notify?.timestamp}`}
                      </div>
                    </td>
                  </tr>
                )).slice(0,10)}
              </tbody>
            </table>
          </div>
        </div>
        {
          page!="activity" && (
            <div className="col-12">
              <div className="section__btns">
                <a href="/activities" className="section_btn">View More</a>
                
              </div>
            </div>
          )
        }
      </div>
    </div>
    </div>
  );
};

export default Notification;
