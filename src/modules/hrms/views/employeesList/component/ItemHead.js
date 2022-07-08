import React from 'react'
import { withTranslation } from 'react-i18next';
const ItemHead = ({head,changeSortOrder,isItemHeadTitleObject=false}) => {
  return (
    <thead>
        <tr className={`g-col-border-top-0`}>
          {!isItemHeadTitleObject ? head &&
            head.map((th, index) => {
              return (
                <th key={index}>
                  <div className="flex-display-more">
                    <span>{th}</span>
                    <span className="d-flex flex-column pointer g-width-10 g-line-height-1 g-font-size-10">
                      <span className="g-text-underline--none--hover">
                        <i className="hs-admin-angle-up" onClick={() => changeSortOrder("","ASC")} />
                      </span>
                      <span className="g-text-underline--none--hover">
                        <i className="hs-admin-angle-down" onClick={() => changeSortOrder("","DESC")} />
                      </span>
                    </span>
                  </div>
                </th>
              );
            })
          :head &&
              head.map(({name,key}, index) => {
                  return (
                      <th key={index}>
                          <div className="flex-display-more">
                              <span>{name} </span>
                              <span className="d-flex flex-column pointer g-width-10 g-line-height-1 g-font-size-10">
                      <span className="g-text-underline--none--hover">
                        <i className="hs-admin-angle-up" onClick={() => changeSortOrder(key,"ASC")} />
                      </span>
                      <span className="g-text-underline--none--hover">
                        <i className="hs-admin-angle-down" onClick={() => changeSortOrder(key,"DESC")} />
                      </span>
                    </span>
                          </div>
                      </th>
                  );
              })}
        </tr>
      </thead>
  )
}

export default withTranslation("HRMS")(ItemHead)
