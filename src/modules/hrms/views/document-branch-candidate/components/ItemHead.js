import React from 'react'
import {withTranslation} from 'react-i18next';
import {get} from "lodash"

const ItemHead = ({t, head, changeSortOrder}) => {
    return (
        <thead>
        <tr className={`g-col-border-top-0`}>
            {head &&
                head.map((th, index) => {
                    return (
                        <th key={index}>
                            <div className="flex-display-more">
                                <span>{get(th, 'title')}</span>
                                <span className="d-flex flex-column pointer g-width-10 g-line-height-1 g-font-size-10">
                      <span className="g-text-underline--none--hover">
                        <i className="hs-admin-angle-up" onClick={() => changeSortOrder(get(th, 'name'), "ASC")}/>
                      </span>
                      <span className="g-text-underline--none--hover">
                        <i className="hs-admin-angle-down" onClick={() => changeSortOrder(get(th, 'name'), "DESC")}/>
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
