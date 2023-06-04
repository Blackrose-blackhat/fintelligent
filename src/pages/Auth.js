import React, { useState } from "react";

const initialState = {
  email: "",
  password: "",
};

const Auth = () => {
  const [state, setState] = useState(initialState);
  const [signup, setSignup] = useState(false);

  const [email, password] = state;
  return <div className="container-fluid mb-4"></div>;
};
