import React from "react";

const Ask = ({setContactUs}) => {
  return (
  <section id="ask" className="section">
    <div className="container">
      <div className="row row-relative">
        <div className="col-12">
          <div className="question">
            <h2 className="question__title">Any Question</h2>
            <p className="question__text">
              Our support team is here to help you with any questions you have.
            </p>
            <div className="section__btns section__btns--mt">
              <button className="section__btn section__btn--light"
              onClick={() => setContactUs(true)}
              >
                Ask a Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default Ask;
