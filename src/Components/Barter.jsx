import React from "react";
import { useSelector } from "react-redux";
import SingleBarter from "./SingleBarter";

function BarterCard() {
  const barters = useSelector((state) => state.barters.barters);

  return (
    <div>
      {barters.map((barter) => (
        <SingleBarter key={barter.id} barter={barter} />
      ))}
    </div>
  );
}

export default BarterCard;
