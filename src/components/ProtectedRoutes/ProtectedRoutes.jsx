import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router";

const ProtectedRoutes = ({ component: Component, ...rest }) => {
  // state for user(cook),data of user if user is logged-in
  const user = useSelector((state) => state.user.value);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user.role) {
          return <Component />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/ForbiddenRoute",
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoutes;
