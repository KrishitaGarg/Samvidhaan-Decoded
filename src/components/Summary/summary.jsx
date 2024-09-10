import React from "react";
import "./summary.css";

const DetailsPage = () => {
  return (
    <div className="details-page">
      <section className="content">
        <div className="title-section">
          <h1>Officers Of The State</h1>
        </div>

        <div className="content-details">
          <ul className="list">
            <li>Subtitle</li>
            <li>Overview</li>
            <li>Article 178</li>
            <li>
              Decoded Version:{" "}
              <span className="highlight">
                Choosing The Speaker And Deputy Speaker
              </span>
            </li>
          </ul>

          <div className="description">
            <p>
              Each State's Legislative Assembly Must Choose Two Of Its Members
              To Be The Speaker And Deputy Speaker.
            </p>

            <p>
              <span className="highlight-role">Speaker:</span> The Main Person
              Who Leads The Assembly Meetings.
            </p>

            <p>
              <span className="highlight-role">Deputy Speaker:</span> The Person
              Who Helps The Speaker And Takes Over When The Speaker Is Absent.
            </p>

            <p>
              When Either Position Becomes Vacant, The Assembly Must Choose New
              Members To Fill These Roles.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DetailsPage;
