import React, { useEffect } from "react";
import { fetchBarters } from "../redux/auth/actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import BarterCard from "./Barter";

function BarterList() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchBarters());
  }, [dispatch]);

  const isBarterCreating = useSelector(
    (state) => state.barters.barters.isBarterCreating
  );
  const user = useSelector((state) => state.login.currentUser);

  function handleClick(link) {
    history.push(link);
  }

  return (
    <div>
      {user && (
        <div>
          <button className="button" onClick={() => handleClick("/addBarter")}>
            ADD BARTER
          </button>
          <h1>Hello {user.username} , all available barters are here:</h1>
          <div className="barters">
            {isBarterCreating && <h2>Submiting your barter...</h2>}
            <BarterCard />
          </div>
        </div>
      )}
    </div>
  );
}

export default BarterList;
