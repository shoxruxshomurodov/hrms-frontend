import React from "react";
import SortableTree from "react-sortable-tree";
import "react-sortable-tree/style.css";
import { withTranslation } from "react-i18next";
import {isEqual, get, isEmpty} from "lodash";
import Loader from "../../../../../../../../components/Loader";
const SortableTreeIabs = ({treeData, setState, AddNode, hasErrors,...rest}) => {
  return (
    <div className="g-pb-50" style={{ height: 1000 }}>
       <SortableTree
        treeData={treeData}
        onChange={(treeData) => setState("treeData", treeData)}
        canDrag={false}
        style={{ fontSize: "12px" }}
        generateNodeProps={(rowInfo) => ({
          buttons: [
            <button
              label="Add"
              className={`btn btn-sm btn-outline-primary`}
              style={{
                display:
                  isEqual(get(rowInfo, "node.isAdded"), true) ||
                  // !isEmpty(get(rowInfo, "node.children")) ||
                  !isEqual(get(rowInfo, "node.condition"), "A") ||
                  hasErrors
                    ? "none"
                    : "block"
              }}
              onClick={() => AddNode(rowInfo)}
            >
              <i className="fa fa-hand-o-right ml-1" />
            </button>
          ],
          title: `${get(rowInfo,"node.code")} - ${get(rowInfo,"node.title")}` ,
        })}
      />
    </div>
  );
};

export default withTranslation("HRMS")(SortableTreeIabs);
