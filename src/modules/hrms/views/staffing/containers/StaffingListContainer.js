import React, {useEffect, useState} from "react";
import {filter, get, head, isEqual, isNil} from "lodash";
import Breadcrumb from "../../../../../components/Breadcrumb";
import TableBase from "../../../../../components/Table/TableBase";
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import NumberFormat from "react-number-format";
import Actions from "../../../../../services/api/Actions";
import Loader from "../../../../../components/Loader";
import Axios from "axios"
const FileDownload = require('js-file-download');
const StaffingListContainer = ({
                                 t,
                                 getStaffingList,
                                 staffingListData,
                                 ...rest
                               }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getStaffingList({});
  }, []);

  if (!get(staffingListData, "isFetched", false)) {
    return <Loader />;
  }
  const exportToExcel = () => {
    setLoading(true);
    Axios({
      url: 'http://172.28.6.124:14809/v1/report/staff-tree-filial/excel',
      params: {
        structureId: 1341
      },
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      setLoading(false);
      FileDownload(response.data, 'report.xlsx');
    });
  };
  return (
    <>
      <div className="flex-display-more">
        <Breadcrumb titles={[{ id: 1, title: "Staffing list", url: "/" }]} />
        <button
          onClick={exportToExcel}
          className="btn btn-sm u-btn-teal pointer rounded-0 g-py-10 g-px-20 ml-2"
        >
          {!loading ? t("Экспорт в Ехсел (XLS)") : t("Downloading...")}
        </button>
      </div>
      {!loading ? <TableBase
        className={"table-bordered"}
        thClass={"g-bg-teal text-white"}
        head={[
          "№",
          "Tarkibiy tuzilmalar va lavozimlar nomi",
          "Shtat birliklar soni",
          "Lavozim razryadi",
          "Tarif koeffitsienti",
          "Lavozim maoshi so'm",
          "Lavozim maoshi bo'yicha oylik ish haqi fondi,so'm",
          "F.I.SH",
          "Stav.",
          "Бўш ўрни",
          "Izoh"
        ]}
        hideIcon
      >
        {get(staffingListData, "result.departmentList", []).map(
          (department, index) => (
            <>
              <tr
                key={index + 1}
                className={"g-bg-teal"}
                altDepCode={get(department, "altCode")}
              >
                <td className={"text-white"} colSpan={11}>
                  <strong>** {get(department, "title")}</strong>
                </td>
              </tr>
              {!isNil(get(department, "staffList", null)) &&
              get(department, "staffList", []).map((staff, i) => {
                let staffRowClasses = "";
                let empNoteBlock = "";
                let empFioBlock = "";
                if (get(staff, "freeRate") > 0) {
                  staffRowClasses = staffRowClasses + " hasFreeStaffRow";
                }
                let emp = head(get(staff, "employeeList", []));
                if (isEqual(get(emp, "isTemp", false), true)) {
                  empNoteBlock = empNoteBlock + " hasTempEmployeeRow";
                }
                if (isEqual(get(emp, "status", "A"), "OT")) {
                  empFioBlock = empFioBlock + " hasEmployeeOtpusk";
                }
                return (
                  <>
                    <tr
                      key={i + 1}
                      altStaffId={get(staff, "altId")}
                      className={staffRowClasses}
                    >
                      <td
                        className={"text-left"}
                        rowSpan={
                          !isEqual(get(staff, "busyRate"), 0)
                            ? get(staff, "employeeList").length ?? 1
                            : 1
                        }
                      >
                        {i + 1}
                      </td>
                      <td
                        rowSpan={
                          !isEqual(get(staff, "busyRate"), 0)
                            ? get(staff, "employeeList").length ?? 1
                            : 1
                        }
                      >
                        {get(staff, "postName")}
                      </td>
                      <td
                        rowSpan={
                          !isEqual(get(staff, "busyRate"), 0)
                            ? get(staff, "employeeList").length ?? 1
                            : 1
                        }
                      >
                        {get(staff, "rate")}
                      </td>
                      <td
                        rowSpan={
                          !isEqual(get(staff, "busyRate"), 0)
                            ? get(staff, "employeeList").length ?? 1
                            : 1
                        }
                      >
                        {get(staff, "rank")}
                      </td>
                      <td
                        rowSpan={
                          !isEqual(get(staff, "busyRate"), 0)
                            ? get(staff, "employeeList").length ?? 1
                            : 1
                        }
                      >
                        {get(staff, "tariff")}
                      </td>
                      <td
                        rowSpan={
                          !isEqual(get(staff, "busyRate"), 0)
                            ? get(staff, "employeeList").length ?? 1
                            : 1
                        }
                      >
                        <NumberFormat
                          value={get(staff, "amount")}
                          displayType="text"
                          thousandSeparator={" "}
                        />
                      </td>
                      <td
                        rowSpan={
                          !isEqual(get(staff, "busyRate"), 0)
                            ? get(staff, "employeeList").length ?? 1
                            : 1
                        }
                      >
                        <NumberFormat
                          value={get(staff, "summ")}
                          displayType="text"
                          thousandSeparator={" "}
                        />
                      </td>
                      <td className={empFioBlock}>
                        {get(head(get(staff, "employeeList", [])), "fio")}
                      </td>
                      <td>
                        {get(
                          head(get(staff, "employeeList", [])),
                          "busyRate"
                        )}
                      </td>
                      <td
                        rowSpan={
                          !isEqual(get(staff, "busyRate"), 0)
                            ? get(staff, "employeeList").length ?? 1
                            : 1
                        }
                      >
                        {get(staff, "freeRate")}
                      </td>
                      <td className={empNoteBlock}>
                        {get(head(get(staff, "employeeList", [])), "note")}
                      </td>
                    </tr>
                    {filter(
                      get(staff, "employeeList", []),
                      (item, index) => !isEqual(index, 0)
                    ).map((emp) => {
                      let empNoteBlock = "";
                      let empFioBlock = "";
                      if (isEqual(get(emp, "isTemp", false), true)) {
                        empNoteBlock = empNoteBlock + " hasTempEmployeeRow";
                      }
                      if (isEqual(get(emp, "status", "A"), "OT")) {
                        empFioBlock = empFioBlock + " hasEmployeeOtpusk";
                      }
                      return (
                        <tr>
                          <td className={empFioBlock}>{get(emp, "fio")}</td>
                          <td>{get(emp, "busyRate")}</td>
                          <td className={empNoteBlock}>{get(emp, "note")}</td>
                        </tr>
                      );
                    })}
                  </>
                );
              })}
              <tr>
                <td className={"text-left"} colSpan={2}>
                  <strong>Жами</strong>
                </td>
                <td>
                  <strong>{get(department, "total.rate", "-")}</strong>
                </td>
                <td></td>
                <td></td>
                <td>
                  <strong>
                    <NumberFormat
                      value={get(department, "total.amount", 0)}
                      displayType="text"
                      thousandSeparator={" "}
                    />
                  </strong>
                </td>
                <td>
                  <strong>
                    <NumberFormat
                      value={get(department, "total.summ", 0)}
                      displayType="text"
                      thousandSeparator={" "}
                    />
                  </strong>
                </td>

                <td></td>
                <td>
                  <strong>{get(department, "total.busyRate", "-")}</strong>
                </td>
                <td>
                  <strong>{get(department, "total.freeRate", "-")}</strong>
                </td>
                <td></td>
              </tr>
            </>
          )
        )}

        <tr className={"g-bg-teal text-white"}>
          <td className={"text-left"} colSpan={2}>
            <strong>Хаммаси</strong>
          </td>
          <td className={"text-center"}>
            {get(staffingListData, "result.totalEnd.rate", 0)}
          </td>
          <td></td>
          <td></td>
          <td className={"text-center"}>
            <strong>
              <NumberFormat
                value={get(staffingListData, "result.totalEnd.amount", 0)}
                displayType="text"
                thousandSeparator={" "}
              />
            </strong>
          </td>
          <td className={"text-center"}>
            <strong>
              <NumberFormat
                value={get(staffingListData, "result.totalEnd.summ", 0)}
                displayType="text"
                thousandSeparator={" "}
              />
            </strong>
          </td>
          <td></td>
          <td>
            <strong>
              <NumberFormat
                value={get(staffingListData, "result.totalEnd.busyRate", 0)}
                displayType="text"
                thousandSeparator={" "}
              />
            </strong>
          </td>
          <td className={"text-center"}>
            <strong>
              <NumberFormat
                value={get(staffingListData, "result.totalEnd.freeRate", 0)}
                displayType="text"
                thousandSeparator={" "}
              />
            </strong>
          </td>
          <td></td>
        </tr>
      </TableBase>: <Loader />}

    </>
  );
};

const mapStateToProps = (state) => {
  return {
    staffingListData: get(state, "apiReducer.data.staffing-list", {})
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getStaffingList: ({ rootStructureId = 1341 }) => {
      const storeName = "staffing-list";
      dispatch({
        type: Actions.GET_DATA.REQUEST,
        payload: {
          url: `report/staff-tree-filial?rootStructureId=${rootStructureId}`,
          storeName,
          config: {}
        }
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation("HRMS")(StaffingListContainer));
