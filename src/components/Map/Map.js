import React from "react";
import styled from "styled-components";
import { get, isEmpty } from "lodash";
import { useHistory } from "react-router-dom";

const Styled = styled.div`
  svg {
    path:hover {
      cursor: pointer;
      fill: #8cc440;
    }

    circle:hover {
      cursor: pointer;
      fill: #57b8ff;
    }

    .active {
      fill: #8cc440 !important;
      box-shadow: 0 7px 15px rgba(0, 0, 0, 0.16);
    }
  }
`;
const Map = ({
  viewBox = "0 0 1000 652",
  items = [],
  parent = {},
  url = "/structure-hierarchy/region/",
  transfer = false,
  setActiveSvg = () => {},
  transform,
  ...rest
}) => {
  const history = useHistory();
  return (
    <Styled {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={"100%"}
        height={600}
        viewBox={get(parent, "viewBox", "0 0 1000 652")}
      >
        <g transform={get(parent, "transform")}>
          {items &&
            items.map(({ id, title, mapSvg }) => {
              if (!isEmpty(parent)) {
                return (
                  <path
                    key={id}
                    onClick={() => history.push(`${url}${id}`)}
                    transform={get(mapSvg, "transform")}
                    d={get(mapSvg, "path")}
                    fill="#d5d7e3"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  >
                    <title>{title}</title>
                  </path>
                );
              } else {
                return (
                  <path
                    key={id}
                    onClick={() =>
                      history.push(`/structure-hierarchy/region/${id}`)
                    }
                    d={get(mapSvg, "path")}
                    fill="#d5d7e3"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  >
                    <title>{title}</title>
                  </path>
                );
              }
            })}
        </g>
      </svg>
    </Styled>
  );
};

export default Map;
