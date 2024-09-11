import React, { useState, useEffect } from "react";
import List from "./RegularComp/List";

const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY;

const Notification = ({ index, notification, poolDetails }) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const calculatePercentage = () => {
      const amount = notification?.amount ?? 0;
      const percentageNew = (amount / 100) * 100;
      setPercentage(percentageNew);
    };

    calculatePercentage();
  }, [notification]);

  const getColorClass = (index) => {
    switch (index % 3) {
      case 0:
        return "orange";
      case 1:
        return "green";
      case 2:
        return "blue";
      default:
        return "orange";
    }
  };

  const colorClass = getColorClass(index);

  return (
    <div key={index} className="deposit">
      <div className="deposit__name">
        <span style={{ color: "white" }} className={`deposit__icon deposit__icon--${colorClass}`}>
          {CURRENCY}
        </span>
        <h3 className="deposit__title">{notification?.typeOf}</h3>
      </div>
      <ul className="deposit__list">
        <List name="Pool ID" value={`#00-1${notification?.poolID}`} />
        <List name="Date" value={`${notification?.timestamp}`} />
        <List name="Amount" value={`${notification?.amount}`} />
        <List name="User" value={`${notification?.user}`} />
      </ul>
      <div className={`progress progressbar--${colorClass}`}>
        <h3 className="progress__title">Accrued {notification?.amount}%</h3>
        <div className="progress" role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100}>
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            style={{ width: `${percentage}%` }}
          >
            <span>{percentage.toFixed(1)}%</span>
          </div>
        </div>
        <div className="progress__values">
          <span className="progress__value progress__value--left">0%</span>
          <span className="progress__value progress__value--right">100%</span>
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