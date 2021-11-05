import React, { useEffect } from "react";
import { fetchBarters } from "../redux/auth/actions";
import { useDispatch, useSelector } from "react-redux";

function BarterList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBarters());
  }, []);

  const barters = useSelector((state) => state.barters.barters);
  const user = useSelector((state) => state.login.currentUser);

  console.log("BARTERS: ", barters);
  console.log("USER:", user);

  return (
    <div>
      {user && (
        <div>
          <h1>Hello {user.username} , all available barters are here:</h1>
          <div className="barters">
            {barters.map((barter) => (
              <div className="barter" key={barter.id}>
                <div className="barter-description">
                  <h2>{barter.barter}</h2>
                  <p>By: {barter.author.username}</p>
                </div>
                <div className="barter-offer">
                  <div className="barter-learn">
                    <h3>I want to learn:</h3>
                    <h1>{barter.learn}</h1>
                  </div>
                  <div className="barter-teach">
                    <h3>I can teach:</h3>
                    <h1>{barter.teach}</h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BarterList;
