import React from "react";

import ButtonCmp from "./RegularComp/ButtonCmp";
import Notification from "./Notification";

const Investing = ({poolDetails}) => {
  return (
    <div className="tab-pane fade" id="tab-2" role="tabpanel">
      <div className="row">
        <div className="col-12">
          <div className="profile">
            <ul className="nav nav-tabs section__tabs section__tabs--left" id="section__profile-tabs1" role="tablist">
              <ButtonCmp name={"Active"} tab={"f1"} styleClass="active"/>
              <div className="tab-content" id="tab-f1" role="tabpanel">
                <div className="row">
                  <div className="col-12">
                    {
                      poolDetails?.notifications?.map((notification,index)=>(
                        <Notification 
                        key={index} notification={notification}
                        poolDetails={poolDetails}
                        />
                      ))
                    }
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investing;
