import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { get, head, isEqual, values,isString } from "lodash";
import { useHistory } from "react-router-dom";
import ApiActions from "../../../../../../services/api/Actions";
import Map from "../../../../../../components/Map/Map";
import TableBase from "../../../../../../components/Table/TableBase";
import classNames from "classnames";
import Breadcrumb from "../../../../../../components/Breadcrumb";
import { withTranslation } from "react-i18next";

const StructureHierarchyOrganizationsByRegionContainer = ({
  t,
  id,
  getTreeDataList,
  entities,
  treeData,
  ...rest
}) => {
  const history = useHistory();
  const [active, setActive] = useState(false);
  useEffect(() => {
    getTreeDataList({ regionId: id });
  }, []);
  const mapData = values(get(treeData, "result", {})).map((district) => {
    return {
      id: get(head(get(district, "structures", [])), "id"),
      title: get(head(get(district, "structures", [])), "title"),
      mapSvg: isString(get(district, "district.mapSvg",null))
        ? get(district, "district.mapSvg")
        : null,
      parentMapSvg: isString(get(district, "district.region.mapSvg",null))
        ? JSON.parse(get(district, "district.region.mapSvg"))
        : null
    };
  });
  return (
    <>
      <Breadcrumb
        titles={[
          {
            id: 1,
            title: t("Structure Hierarchy"),
            url: "/structure-hierarchy"
          },
          {
            id: 2,
            title: get(
              head(values(get(treeData, "result"))),
              "district.region.title"
            ),
            url: "#"
          }
        ]}
      />
      <div className={"row"}>
        <div className="col-6">
          <div style={{ height: "90vh", overflowY: "auto" }}>
            <TableBase
              className={"g-bg-primary-scrolling table-hover"}
              head={["ID", "МФО", "Organization"]}
            >
              {values(get(treeData, "result", {})).map((item, index) => {
                return get(item, "structures", []).map((organization, i) => (
                  <tr
                    key={index + 1}
                    style={{ verticalAlign: "middle" }}
                    onClick={() => setActive(get(organization, "id"))}
                    className={classNames("mode-dark pointer", {
                      bg_active: isEqual(active, get(organization, "id"))
                    })}
                    onDoubleClick={() =>
                      history.push(
                        `/structure-hierarchy/${get(organization, "id", null)}`
                      )
                    }
                  >
                    <td className={"text-left"}>
                      <strong>{get(organization, "id", null)}</strong>
                    </td>
                    <td>{get(organization, "altAbsCode", "-")}</td>
                    <td>{get(organization, "title", "-")}</td>
                  </tr>
                ));
              })}
            </TableBase>
          </div>
        </div>
        <div className="col-6 my-5">
          <Map
            url={"/structure-hierarchy/"}
            items={mapData}
            parent={get(head(mapData), "parentMapSvg", {})}
          />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    entities: get(state, "normalizer.entities", {}),
    treeData: get(
      state,
      "normalizer.data.structure-organizations-tree-by-region-list",
      {}
    )
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTreeDataList: ({ size = 200, regionId = null }) => {
      const storeName = "structure-organizations-tree-by-region-list";
      dispatch({
        type: ApiActions.GET_ONE.REQUEST,
        payload: {
          url: `/structure-hierarchies/organizations/structures/tree/forRegion/${regionId}`,
          config: {
            params: {
              pageSize: size
            }
          },
          storeName
        }
      });
    }
  };
};
export default withTranslation("HRMS")(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(StructureHierarchyOrganizationsByRegionContainer)
);
