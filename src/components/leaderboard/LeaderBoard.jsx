import React from "react";

const LeaderBoard = ({ userName, totalAmount }) => {
  return (
    <div className="flex gap-2">
      <h1>Name : {userName}</h1>
      <h1>Total Transaction: {totalAmount ? totalAmount : 0}</h1>
    </div>
  );
};

export default LeaderBoard;
