import React from "react";
import { get, isNull } from "lodash";

const PositionInfo = ({ userExperiences, currentPosition }) => {
  return (
    <>
      {!isNull(userExperiences) ? (
        <ul className="row u-timeline-v2-wrap list-unstyled">
          <li className="col-md-12 g-mb-40">
            <div className="row">
              {/* Timeline Date */}
              <div className="col-md-3 text-md-right g-pt-20--md g-pr-40--md g-mb-20">
                <h5 className="h6 g-font-weight-700 mb-0">
                  {get(currentPosition, "startDate")}
                </h5>
                <h4 className="h4 g-font-weight-300">
                  {get(currentPosition, "companyName")}{" "}
                </h4>
              </div>
              {/* End Timeline Date */}
              {/* Timeline Content */}
              <div className="col-md-9 g-orientation-left g-pl-40--md">
                {/* Timeline Dot */}
                <div className="g-hidden-sm-down u-timeline-v2__icon g-top-35">
                  <i className="d-block g-width-18 g-height-18 g-bg-primary g-brd-around g-brd-4 g-brd-gray-light-v4 rounded-circle" />
                </div>
                {/* End Timeline Dot */}
                <article className="g-pos-rel g-bg-gray-light-v5 g-pa-30">
                  {/* Timeline Arrow */}
                  <div className="g-hidden-sm-down u-triangle-inclusive-v1--right g-top-30 g-z-index-2">
                    <div className="u-triangle-inclusive-v1--right__back g-brd-gray-light-v5-right" />
                  </div>
                  <div className="g-hidden-md-up u-triangle-inclusive-v1--top g-left-20 g-z-index-2">
                    <div className="u-triangle-inclusive-v1--top__back g-brd-gray-light-v5-bottom" />
                  </div>
                  {/* End Timeline Arrow */}
                  <header className="g-brd-bottom g-brd-gray-light-v4 g-pb-10 g-mb-25">
                    <h3 className="g-font-weight-300">
                      {get(currentPosition, "structureName")}
                    </h3>
                  </header>
                  <p className="lead g-mb-25">
                    {get(currentPosition, "workplaceAddress")}
                  </p>
                  <p className="lead mb-0">
                    {get(currentPosition, "positionName")}
                  </p>
                  <p className="lead mb-0">{get(currentPosition, "endDate")}</p>
                </article>
              </div>
              {/* End Timeline Content */}
            </div>
          </li>
          {userExperiences &&
            userExperiences.map((experience) => {
              return (
                <li className="col-md-12 g-mb-40">
                  <div className="row">
                    {/* Timeline Date */}
                    <div className="col-md-3 text-md-right g-pt-20--md g-pr-40--md g-mb-20">
                      <h5 className="h6 g-font-weight-700 mb-0">
                        {get(experience, "startDate")}
                      </h5>
                      <h4 className="h4 g-font-weight-300">
                        {get(experience, "companyName")}
                      </h4>
                    </div>
                    {/* End Timeline Date */}
                    {/* Timeline Content */}
                    <div className="col-md-9 g-orientation-left g-pl-40--md">
                      {/* Timeline Dot */}
                      <div className="g-hidden-sm-down u-timeline-v2__icon g-top-35">
                        <i className="d-block g-width-18 g-height-18  g-bg-beige g-brd-around g-brd-4 g-brd-gray-light-v4 rounded-circle" />
                      </div>
                      {/* End Timeline Dot */}
                      <article className="g-pos-rel g-bg-gray-light-v5 g-pa-30">
                        {/* Timeline Arrow */}
                        <div className="g-hidden-sm-down u-triangle-inclusive-v1--right g-top-30 g-z-index-2">
                          <div className="u-triangle-inclusive-v1--right__back g-brd-gray-light-v5-right" />
                        </div>
                        <div className="g-hidden-md-up u-triangle-inclusive-v1--top g-left-20 g-z-index-2">
                          <div className="u-triangle-inclusive-v1--top__back g-brd-gray-light-v5-bottom" />
                        </div>
                        {/* End Timeline Arrow */}
                        <header className="g-brd-bottom g-brd-gray-light-v4 g-pb-10 g-mb-25">
                          <h3 className="g-font-weight-300">
                            {get(experience, "structureName")}
                          </h3>
                        </header>
                        <p className="lead g-mb-25">
                          {get(experience, "workplaceAddress")}
                        </p>
                        <p className="lead mb-0">
                          {get(experience, "positionName")}
                        </p>
                        <p className="lead mb-0">
                          {get(experience, "endDate")}
                        </p>
                      </article>
                    </div>
                    {/* End Timeline Content */}
                  </div>
                </li>
              );
            })}
        </ul>
      ) : (
        <p className={"text-center"}>No Data</p>
      )}
    </>
  );
};

export default PositionInfo;
