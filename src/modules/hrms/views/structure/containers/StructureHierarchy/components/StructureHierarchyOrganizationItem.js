// @flow
import * as React from 'react';
import styled from "styled-components";
import get from "lodash/get";
import {Link} from "react-router-dom";

export default function StructureHierarchyOrganizationItem({organization}) {
    const Styled = styled.div`
      background: #8CC440;
      font-size: 18px;
      padding: 10px 15px;
      text-align: center;
      color: #210000;
      border-radius: 10px;
      -webkit-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
      -moz-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
      box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
      margin-bottom: 10px;
      min-height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;

      a:hover {
        color: #fff;
      }

    `;

    return (
        <div className="col-sm-6">
            <Styled>
                <Link to={`/structure-hierarchy/${get(organization,"id","organizations")}`}>{get(organization,'altAbsCode')} - {get(organization, "title")}</Link>
            </Styled>
        </div>
    );
};