import React, { useState, useContext, useEffect } from "react";
import { AlertContext } from "../../Contexts/AlertContext";
import { AuthContext } from "../../Contexts/AuthContext";

const Register = props => {
  const { setAlert } = useContext(AlertContext);
  const { Register, error, ClearErrors, isAuthenticiated, token } = useContext(
    AuthContext
  );

  useEffect(() => {
    if (isAuthenticiated) {
      return props.history.push("/");
    }
    if (token) {
      props.history.push("/");
    }
    if (error === "User already exists") {
      setAlert(error, "danger");
      ClearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticiated, props.history]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = user;

  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };
  const onSubmit = e => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      setAlert("Please enter all field", "danger");
    } else if (password !== password2) {
      setAlert("Password don not match", "danger");
    } else {
      Register({
        name,
        email,
        password
      });
    }
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            minLength="6"
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
