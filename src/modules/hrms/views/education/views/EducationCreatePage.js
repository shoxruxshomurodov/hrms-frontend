import React, { useState } from "react";
import CreateForm from "../../../../../containers/Form/Form";
import CustomButton from "../../../../../containers/Form/component/Common/Button";
import Breadcrumb from "../../../../../components/Breadcrumb";
import { withTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import Actions from "../../../Actions";
function EducationCreatePage(props) {
  const [isFetched, setIsFetched] = useState(false);
  const dispatch = useDispatch();
  const create = (attributes) => {
    setIsFetched("Create");
    dispatch({
      type: Actions.EDUCATION_CREATE.REQUEST,
      payload: {
        attributes,
        cb: {
          success: () => {
            setIsFetched(false);
            toast.dismiss();
            toast.success("Успешно", {
              position: "top-right",
              autoClose: 1000
            });
            setTimeout(() => {
              window.history.back();
            }, 1000);
          },
          fail: (e) => {
            setIsFetched(false);
            toast.dismiss();
            toast.error("Ошибка", {
              position: "top-right",
              autoClose: 1000
            });
          }
        }
      }
    });
  };
  const degrees = [
    { value: "BACHELOR", label: "Bakalavr" },
    { value: "MASTER", label: "Magistr" },
    { value: "UNFINISHED_HIGHEST", label: "UNFINISHED_HIGHEST" },
    { value: "UNFINISHED", label: "Tugallanmagan Oliy" },
    { value: "MEDIUM", label: "O'rta" },
    { value: "MEDIUM_SPECIAL ", label: "O'rta maxsus" }
  ];
  const { t } = props;
  const values = [
    {
      id: 1,
      label:"Type",
      name: "type",
      type: "select",
      params: { required: true },
      options: degrees
    },
    { id: 2,label:"Diploma Number", sort:"number", name: "diplomaNumber", type: "input", params: { required: false } },
    {
      id: 3,
      label:"Diploma Registration Date",
      name: "diplomaRegistrationDate",
      type: "datepicker",
      params: { required: false }
    },
    {
      id: 4,
      label:"Diploma Qualification",
      name: "diplomaQualificationId",
      url:"diploma-qualification",
      asyncSelectProperty:["id","title","id"],
      type: "select-pagination",
      params: { required: true }
    },
    {
      id: 5,
      label:"Educational Institution",
      name: "educationalInstitutionId",
      type: "select-pagination",
      url:"educational-institution",
      asyncSelectProperty:["id","title","id"],
      params: { required: true }
    },
    { id: 6,label:"Speciality",url:"speciality", asyncSelectProperty:["id","title","id"], name: "specialityId", type: "select-pagination", params: { required: true } },
    { id: 7,label:"Faculty", name: "facultyId", type: "select-pagination", url:"faculty", asyncSelectProperty:["id","title","id"], params: { required: true } },

    {
      id: 8,
      label: "Receipt Date",
      name: "receiptDate",
      type: "datepicker",
      params: { required: true }
    },
    {
      id: 9,
      label: "Expiration Date",
      name: "expirationDate",
      type: "datepicker",
      params: { required: false }
    },
    {
      id: 10,
      label: "Form Study",
      name: "formStudyId",
      type: "select-pagination",
      url:"form-study",
      asyncSelectProperty:["id","title","id"],
      params: { required: true },
      column:[2,2]
    },
    {
      id: 11,
      name: "isStudyByProfile",
      type: "checkbox",
      params: { required: false },
      column:[2,2]
    }
  ];
  return (
    <>
      <Breadcrumb
        titles={[
          { id: 1, title: t("Справочник"), url: "/education" },
          { id: 2, title: "Education", url: "/education" },
          { id: 3, title: t("Create"), url: "" }
        ]}
      />
      <CreateForm
        formRequest={create}
        values={values}
        CustomButton={CustomButton}
        cancelLink={"/education"}
        buttonText={"Create"}
        isFetched={isFetched}
        params={{ required: false }}
        property={{ disabled: false }}
      />
      <ToastContainer />
    </>
  );
}

export default withTranslation("HRMS")(EducationCreatePage);
