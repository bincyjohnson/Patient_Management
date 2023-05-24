import { Route, Redirect } from 'react-router-dom';
import React from 'react';

const IsAuth = ({ children, auth, ...rest }) => {
  if (!auth) {
    return (
      <Redirect
        to={{
          pathname: '/',
        }}
      />
    );
  }
  return <Route {...rest} render={(tempProps) => children} />;
};
export default IsAuth;
