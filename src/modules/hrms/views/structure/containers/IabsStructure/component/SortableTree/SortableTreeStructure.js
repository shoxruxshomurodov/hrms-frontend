import React from "react";
import SortableTree from "react-sortable-tree";
import "react-sortable-tree/style.css";
import { withTranslation } from "react-i18next";
import Loader from "../../../../../../../../components/Loader";
import CreateStructure from "../../CreateStructure";
import { get, isEqual, isEmpty } from "lodash";
import { ToastContainer } from "react-toastify";
const SortableTreeStructure = (props) => {
  const {
    treeData2,
    setState,
    removeNode,
    hasErrors,
    filial,
    loadTreeData2,
    updateNode = () => {}
  } = props;
  if (hasErrors) {
    return (
      <CreateStructure
        loadTreeData2={loadTreeData2}
        defaultValue={get(filial, "value")}
        column={[2, 10]}
      />
    );
  }
  return (
    <div className="g-mb-50" style={{ height: 1000 }}>
      {!isEmpty(treeData2) && (
        <SortableTree
          treeData={treeData2}
          toggleExpandedForAll={true}
          onChange={(treeData2) => setState("treeData2", treeData2)}
          style={{ fontSize: "12px" }}
          canDrag={false}
          generateNodeProps={(rowInfo) => ({
            onClick: () => {
              const expanded = true;
              get(rowInfo, "node.children") &&
                get(rowInfo, "node.children").map((child) => {
                  child.expanded = expanded;
                  if (!isEmpty(get(child, "children"))) {
                    get(child, "children").map((ch) => {
                      return (ch.expanded = expanded);
                    });
                  }
                });
            },
            buttons: [
              <>
                <div className="btn-group">
                  <button
                    label="Update"
                    className="btn btn-sm btn-outline-info"
                    style={{
                      display: !isEqual(get(rowInfo, "node.title"), "Boshqaruv")
                        ? "block"
                        : "none"
                    }}
                    onClick={() => updateNode(rowInfo)}
                  >
                    <i className="fa fa-pencil ml-1" />
                  </button>
                  <button
                    label="Delete"
                    className="btn btn-sm btn-outline-danger"
                    style={{
                      display: isEqual(get(rowInfo, "node.children")?.length, 0)
                        ? "block"
                        : "none"
                    }}
                    onClick={() => removeNode(rowInfo)}
                  >
                    <i className="fa fa-trash-o ml-1" />
                  </button>
                </div>
              </>
            ],
            title: isEmpty(get(rowInfo, "node.altAbsCode"))
              ? get(rowInfo, "node.title")
              : `${get(rowInfo, "node.altAbsCode")} - ${get(
                  rowInfo,
                  "node.title"
                )}`
          })}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default withTranslation("HRMS")(SortableTreeStructure);
