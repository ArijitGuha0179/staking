import React from "react";

const Auth = () => {
  return (<div className="new-loader-wrapper-admin">
    <div className="modal--auto">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal__content">
          <h4 className="modal__title">Admin Login</h4>
          <p className="modal__text">Your are not the Admin buddy</p>
          <div className="modal__form">
            <a href="/" className="form__btn" type="button">Go to Home</a>
          </div>
        </div>
      </div>
    </div>
  </div>);
};

export default Auth;
