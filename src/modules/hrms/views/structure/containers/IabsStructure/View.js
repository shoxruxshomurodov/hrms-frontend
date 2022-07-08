import React, { Component } from "react";
import { get, isEmpty, isEqual } from "lodash";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import Breadcrumb from "../../../../../../components/Breadcrumb";
import { withRouter } from "react-router-dom";
import SortableTreeIabs from "./component/SortableTree/SortableTreeIabs";
import SortableTreeStructure from "./component/SortableTree/SortableTreeStructure";
import ModalAdded from "./component/Modal/ModalAdded";
import Swal from "sweetalert2";
import AuthActions from "../../../../../../services/auth/actions";
import SelectPaginate from "./component/AsyncPagionation/SelectPagination";
import IABSStructure from "../../../../../../schema/IABSStructure";
import ApiActions from "../../../../../../services/api/Actions";
import Normalizer from "../../../../../../services/normalizer";
import StructureScheme from "../../../../../../schema/Structure";
import NormalizerAction from "../../../../../../services/normalizer/actions";
import Action from "../../../../Actions";
import ModalChangeParent from "./component/Modal/ModalChangeParent";
import Loader from "../../../../../../components/Loader";
class View extends Component {
  state = {
    filial: "",
    id: "1",
    treeData: [],
    treeData2: [],
    hasErrorStructure: false,
    isShowTransfer: false,
    isShowUpdateTransfer: false,
    transferInfo: null,
    updateTransferInfo: null,
    isFetchedFirstTime: false
  };

  loadTreeData = (filial) => {
    const { loadIabsStructure, loadIabsStructureTrigger } = this.props;
    loadIabsStructure(filial);
    loadIabsStructureTrigger();
  };

  loadTreeData2 = (id) => {
    const { loadIabsStructureHierarchy } = this.props;
    return loadIabsStructureHierarchy(id);
  };

  filterByBank = (filial) => {
    if (filial) {
      this.setState({ filial, isFetchedFirstTime: true });
      this.loadTreeData(get(filial, "value"));
      this.loadTreeData2(get(filial, "value"));
    }
  };
  setStateCustom = (state, stateResult) => {
    this.setState({ [state]: stateResult });
  };
  AddNode = (rowInfo) => {
    this.setState({ isShowTransfer: true, transferInfo: rowInfo });
  };
  UpdateNode = (rowInfo) => {
    this.setState({ isShowUpdateTransfer: true, updateTransferInfo: rowInfo });
  };
  removeNode = (rowInfo) => {
    const { t, callToRemoveTransfer } = this.props;
    Swal.fire({
      title: t("Do you want to iasb structure this ?"),
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: t("O'chirish"),
      denyButtonText: t("Rad etish"),
      denyButtonColor: "#000",
      confirmButtonColor: "#dc3545"
    }).then((result) => {
      if (result.isConfirmed) {
        callToRemoveTransfer(get(rowInfo, "node.id"));
      }
    });
  };
  isShowedModal = (state, boolen) => {
    this.setState({ [state]: boolen });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      isFetchedIabs,
      isFetchedIabsHierarchy,
      iabsView,
      iabsHierarchyView,
      entities,
      isFetchedCreateStructureTransfer,
      isFetchedRemoveStructureTransfer,
      isFetchedUpdateStructureTransfer
    } = this.props;
    const {
      isFetchedIabs: prevIABS,
      isFetchedIabsHierarchy: prevHierarchy,
      isFetchedCreateStructureTransfer: isFetchedCreateStructureTransferPrev,
      isFetchedRemoveStructureTransfer: isFetchedRemoveStructureTransferPrev,
      isFetchedUpdateStructureTransfer: isFetchedUpdateStructureTransferPrev
    } = prevProps;
    if (
      !isEqual(isFetchedIabs, prevIABS) ||
      !isEqual(isFetchedIabsHierarchy, prevHierarchy) ||
      !isEqual(
        isFetchedCreateStructureTransfer,
        isFetchedCreateStructureTransferPrev
      ) ||
      !isEqual(
        isFetchedRemoveStructureTransfer,
        isFetchedRemoveStructureTransferPrev
      ) ||
      !isEqual(
        isFetchedUpdateStructureTransfer,
        isFetchedUpdateStructureTransferPrev
      )
    ) {
      const treeData = Normalizer.Denormalize(
        iabsView,
        [IABSStructure],
        entities
      );
      const treeData2 = Normalizer.Denormalize(
        iabsHierarchyView,
        [StructureScheme],
        entities
      );
      this.setState({ treeData, treeData2 });
    }
  }

  render() {
    let {
      t,
      isFetchedIabs,
      isFetchedIabsHierarchy,
      hasErrors,
      errors,
      hasErrorsIabs
    } = this.props;
    const {
      isShowTransfer,
      transferInfo,
      filial,
      treeData,
      treeData2,
      isFetchedFirstTime,
      isShowUpdateTransfer,
      updateTransferInfo
    } = this.state;
    return (
      <>
        <Breadcrumb
          titles={[
            { id: 1, title: t("Structure"), url: "/structure" },
            { id: 2, title: "Iabs", url: "/iabs" }
          ]}
        />
        {isShowTransfer && (
          <ModalAdded
            transferInfo={transferInfo}
            setStateCustom={this.setStateCustom}
            parentStructureId={get(
              transferInfo,
              "node.structureParent.parentStructure.id",
              ""
            )}
            rootStructureId={""}
            loadTreeData2={this.loadTreeData2}
            loadTreeData={this.loadTreeData}
            isShowedModal={this.isShowedModal}
            filial={get(filial, "value")}
          />
        )}
        {isShowUpdateTransfer && (
          <ModalChangeParent
            transferInfo={updateTransferInfo}
            setStateCustom={this.setStateCustom}
            rootStructureId={get(
              transferInfo,
              "node.structureParent.parentStructure.id",
              ""
            )}
            loadTreeData2={this.loadTreeData2}
            loadTreeData={this.loadTreeData}
            isShowedModal={this.isShowedModal}
            filial={get(filial, "value")}
          />
        )}

        <>
          <div className="row">
            <div className="col-4 offset+8">
              <SelectPaginate
                url="iabs/banks"
                onChange={(value) => {
                  this.filterByBank(value);
                }}
                property={["code", "title", "code"]}
              />
            </div>
          </div>
          {!isEmpty(treeData) || !isFetchedFirstTime || hasErrorsIabs ? (
            <div className="row">
              <div className="col-md-6">
                <SortableTreeIabs
                  filterByBank={this.filterByBank}
                  treeData={treeData}
                  setState={this.setStateCustom}
                  AddNode={this.AddNode}
                  isFetchedIabs={isFetchedIabs}
                  hasErrors={hasErrors}
                  isFetchedFirstTime={isFetchedFirstTime}
                />
              </div>
              <div className="col-md-6">
                <SortableTreeStructure
                  treeData2={treeData2}
                  treeData={treeData}
                  setState={this.setStateCustom}
                  removeNode={this.removeNode}
                  updateNode={this.UpdateNode}
                  isFetchedIabsHierarchy={isFetchedIabsHierarchy}
                  isFetchedIabs={isFetchedIabs}
                  hasErrors={hasErrors}
                  filial={filial}
                  errors={errors}
                  loadTreeData2={this.loadTreeData2}
                />
              </div>
              <ToastContainer />
            </div>
          ) : (
            <Loader />
          )}
        </>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    iabsView: get(state, "normalizer.data.iabs-structure-view.result", []),
    iabsHierarchyView: get(
      state,
      "normalizer.data.iabs-structure-hierarchy-view.result",
      []
    ),
    isFetchedIabs: get(
      state,
      "normalizer.data.iabs-structure-view.isFetched",
      true
    ),
    isFetchedIabsHierarchy: get(
      state,
      "normalizer.data.iabs-structure-hierarchy-view.isFetched",
      true
    ),
    isFetchedCreateStructureTransfer: get(
      state,
      "normalizer.data.create-structure-transfer.isFetched",
      true
    ),
    isFetchedRemoveStructureTransfer: get(
      state,
      "normalizer.data.remove-structure-transfer.isFetched",
      true
    ),
    isFetchedUpdateStructureTransfer: get(
      state,
      "normalizer.data.update-structure-transfer.isFetched",
      true
    ),
    hasErrors: get(
      state,
      "normalizer.data.iabs-structure-hierarchy-view.hasErrors",
      false
    ),
    hasErrorsIabs: get(
      state,
      "normalizer.data.iabs-structure-view.hasErrors",
      false
    ),
    errors: get(
      state,
      "normalizer.data.iabs-structure-hierarchy-view.errors",
      {}
    ),
    entities: get(state, "normalizer.entities", [])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuth: () => {
      dispatch({
        type: AuthActions.CHECK_AUTH.REQUEST
      });
    },
    loadIabsStructure: (filial) => {
      const storeName = "iabs-structure-view";
      const entityName = "IABSStructure";
      const scheme = [IABSStructure];
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: `iabs/structure/${filial}`,
          scheme,
          storeName,
          entityName
        }
      });
    },
    loadIabsStructureTrigger: () => {
      const storeName = "iabs-structure-view";
      const entityName = "IABSStructure";
      dispatch({
        type: ApiActions.GET_ALL.TRIGGER,
        payload: {
          storeName,
          entityName
        }
      });
    },
    loadIabsStructureHierarchy: (id) => {
      const storeName = "iabs-structure-hierarchy-view";
      const entityName = "structure";
      const scheme = [StructureScheme];
      dispatch({
        type: ApiActions.GET_ALL.REQUEST,
        payload: {
          url: `structure/hierarchy/by-alt-abs-code/${id}`,
          scheme,
          storeName,
          entityName,
          cb: {
            success: (nData, data) => {
              toast.dismiss();
              toast.success("Found", {
                position: "top-right",
                autoClose: 1000
              });
            },
            fail: (e) => {
              toast.dismiss();
              toast.error("Not Found", {
                position: "top-right",
                autoClose: 1000
              });
            }
          }
        }
      });
    },
    callToRemoveTransfer: (data) => {
      dispatch({
        type: NormalizerAction.NORMALIZE.TRIGGER,
        payload: {
          storeName: "remove-structure-transfer",
          entityName: "structure"
        }
      });
      dispatch({
        type: Action.IABS_TRANSFORM_REMOVE.REQUEST,
        payload: {
          data,
          cb: {
            success: (nData, data) => {
              toast.dismiss();
              toast.success("Успешно", {
                position: "top-right",
                autoClose: 2000
              });
            },
            fail: (e) => {
              toast.dismiss();
              toast.error("Ошибка", {
                position: "top-right",
                autoClose: 2000
              });
            }
          }
        }
      });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation("HRMS")(withRouter(View)));
