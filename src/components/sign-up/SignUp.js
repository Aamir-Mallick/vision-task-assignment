import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import HeadingContainer from "./HeadingContainer";
import FooterContainer from "./FooterContainer";
import { options } from "./options";
import "./style.css";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [isButtonDisbaled, setIsbuttonDisabled] = useState(true);
  const [errorFlag, setErrorFlag] = useState("");
  const [visibleToggle, setVisibleToggle] = useState(false);
  console.log(errorFlag);

  useEffect(() => {
    const inputValueArray = [];
    inputValueArray.push(name);
    inputValueArray.push(email);
    inputValueArray.push(password);
    inputValueArray.push(selectedValue);

    setIsbuttonDisabled(
      !inputValueArray.every((testDisable) => {
        return testDisable;
      })
    );
  });

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleName = (e) => {
    let regexName = /^[a-zA-Z ]{2,30}$/;
    if (regexName.test(e.target.value)) {
      setErrorFlag("");
      setName(e.target.value);
    } else {
      setErrorFlag("name");
      setName(e.target.value);
    }
  };

  const handleEmail = (e) => {
    let regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (regexEmail.test(e.target.value)) {
      setErrorFlag("");
      setEmail(e.target.value);
    } else {
      setErrorFlag("email");
      setEmail(e.target.value);
    }
  };

  const handlePassword = (e) => {
    let regexPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (regexPassword.test(e.target.value)) {
      setErrorFlag("");
      setPassword(e.target.value);
    } else {
      setErrorFlag("password");
      setPassword(e.target.value);
    }
  };

  const handleToggle = () => {
    setVisibleToggle((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // for making post call to submit the data at database.

    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ name, email, selectedValue, password }),
    // };
    // fetch("https://anyapiforsubmittingattheendpoint.com", requestOptions)
    //   .then((response) => response.json())
    //   .then((data) => this.setState({ postId: data.id }))
    //   .catch((error) => {
    //     setError(error.meassage);
    //   });
    if (!errorFlag) {
      setName("");
      setEmail("");
      setSelectedValue("");
      setPassword("");
      alert("thanks for submitting your response");
    } else {
      alert("fill all field correctly");
    }
  };

  return (
    <div className="container">
      <div className="left-container">
        <HeadingContainer />
        <div className="sign-up-form-container">
          <form onSubmit={handleSubmit}>
            <div className="sign-up-container">
              <h2>Let's set up your account</h2>
              <span>Already have an account ?</span>{" "}
              <span className="sign-in-tag">Sign in</span>
              <div className="form-container">
                <input
                  onChange={handleName}
                  type="text"
                  required
                  value={name}
                />
                <label className="label">Name</label>
                {errorFlag === "name" ? (
                  <span className="error-text">Please fill correct name</span>
                ) : null}
              </div>
              <div className="form-container">
                <input
                  onChange={handleEmail}
                  type="text"
                  required
                  value={email}
                />
                <label className="label">Email</label>
                {errorFlag === "email" ? (
                  <span className="error-text">Please fill correct Email</span>
                ) : null}
              </div>
              <div className="form-dropdown-container">
                <select value={selectedValue} onChange={handleChange}>
                  <option value="">I would describe my user type as</option>
                  {options.map((option) => {
                    return <option value={option.value}>{option.label}</option>;
                  })}
                </select>
              </div>
              <div className="form-container">
                <input
                  onChange={handlePassword}
                  type={visibleToggle ? "password" : "text"}
                  required
                  value={password}
                />
                <label className="label">Password</label>
                {errorFlag === "password" ? (
                  <span className="error-text">
                    Minimum 8 character one Upper,lower,special character
                  </span>
                ) : null}

                <span onClick={handleToggle} className="password-eye-icons">
                  {visibleToggle && password ? (
                    <FontAwesomeIcon icon={faEye} />
                  ) : (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  )}
                </span>
              </div>
            </div>
            <div className="submit-button-container">
              <button
                className={`submit-button-container-${
                  !isButtonDisbaled ? "button" : "disable"
                }`}
                disabled={isButtonDisbaled}
              >
                Next
              </button>
              <div
                className="footer-terms-text"
                style={{ boder: "1px solid red" }}
              >
                <p>
                  <span>
                    By clicking the next button your agree to create free
                    account and to
                  </span>{" "}
                  <span className="common-text">Term of service</span> and{" "}
                  <span className="common-text">privacy</span>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="right-container">
        <FooterContainer />
      </div>
    </div>
  );
};
