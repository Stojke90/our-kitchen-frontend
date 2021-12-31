import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
import { withRouter } from "react-router";
import axios from "axios";

const AdminPage = () => {
  // state for user(cook),data of user if user is logged-in
  // const user = useSelector((state) => state.user.value);

  useEffect(() => {
    let mounted = true;

    axios
      .get(process.env.REACT_APP_COOK_BASE)
      .then((res) => {
        if (mounted && res.status === 200) {
        }
      })
      .catch((error) => alert(error.message));

    return function cleanup() {
      mounted = false;
    };
  }, []);

  return <div>AdminPage</div>;
};

export default withRouter(AdminPage);
