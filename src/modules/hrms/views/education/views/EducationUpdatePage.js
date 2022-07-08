import React, {useEffect, useState} from "react";
import UpdateForm from "../../../../../containers/Form/Form";
import CustomButton from "../../../../../containers/Form/component/Common/Button";
import Breadcrumb from "../../../../../components/Breadcrumb";
import {useDispatch, useSelector} from "react-redux";
import {withTranslation} from "react-i18next";
import {toast, ToastContainer} from "react-toastify";
import {get} from "lodash";
import EducationScheme from "../../../../../schema/Education";
import ApiActions from "../../../../../services/api/Actions";
import Normalizer from "../../../../../services/normalizer";
import Actions from "../../../Actions";
import Loader from "../../../../../components/Loader/Loader";

function EducationUpdatePage(props) {
  const dispatch = useDispatch();
  const result = useSelector((state) =>
    get(state, "normalizer.data.education-by-id.result", [])
  );
  const isFetchedProps = useSelector((state) =>
    get(state, "normalizer.data.education-by-id.isFetched", false)
  );
  const entities = useSelector((state) =>
    get(state, "normalizer.entities", {})
  );
  const [isFetched, setIsFetched] = useState(false);
  const getOne = (id) => {
    const storeName = "education-by-id";
    const entityName = "education";
    const scheme = EducationScheme;
    dispatch({
      type: ApiActions.GET_ONE.REQUEST,
      payload: {
        url: `education/${id}`,
        scheme,
        storeName,
        entityName
      }
    });
  };
  useEffect(() => {
    const { id } = props.match.params;
    getOne(id);
  }, []);
  const update = (attributes) => {
    const { id } = props.match.params;
    setIsFetched("Update");
    dispatch({
      type: Actions.EDUCATION_UPDATE.REQUEST,
      payload: {
        id,
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
  const {t} = props;
  const {id} = props.match.params;
  const degrees = [
    {value: "BACHELOR", label: "Bakalavr"},
    {value: "MASTER", label: "Magistr"},
    {value: "UNFINISHED_HIGHEST", label: "UNFINISHED_HIGHEST"},
    {value: "UNFINISHED", label: "Tugallanmagan Oliy"},
    {value: "MEDIUM", label: "O'rta"},
    {value: "MEDIUM_SPECIAL ", label: "O'rta maxsus"}
  ];
  const response = Normalizer.Denormalize(result, EducationScheme, entities);
  const values = [
    {
      id: 1,
      label: "Type",
      name: "type",
      type: "select",
      params: {required: true},
      options: degrees,
      defaultValue: {value: get(response, "type"), label: get(response, "type")},
    },
    {
      id: 2,
      label: "Diploma Number",
      defaultValue: get(response, "diplomaNumber"),
      sort: "number",
      name: "diplomaNumber",
      type: "input",
      params: {required: false}
    },
    {
      id: 3,
      label: "Diploma Registration Date",
      name: "diplomaRegistrationDate",
      type: "datepicker",
      params: {required: false}
    },
    {
      id: 4,
      label: "Diploma Qualification",
      name: "diplomaQualificationId",
      url: "diploma-qualification",
      value: {value: get(response, "diplomaQualification.id"), label: get(response, "diplomaQualification.title")},
      asyncSelectProperty: ["id", "title", "id"],
      type: "select-pagination",
      params: {required: true}
    },
    {
      id: 5,
      label: "Educational Institution",
      name: "educationalInstitutionId",
      type: "select-pagination",
      url: "educational-institution",
      value: {value: get(response, "educationalInstitution.id"), label: get(response, "educationalInstitution.title")},
      asyncSelectProperty: ["id", "title", "id"],
      params: {required: true}
    },
    {
      id: 6,
      label: "Speciality",
      url: "speciality",
      asyncSelectProperty: ["id", "title", "id"],
      value:{value:get(response,"speciality.id"),label:get(response,"speciality.title")},
      name: "specialityId",
      type: "select-pagination",
      params: {required: true}
    },
    {
      id: 7,
      label: "Faculty",
      name: "facultyId",
      type: "select-pagination",
      url: "faculty",
      asyncSelectProperty: ["id", "title", "id"],
      value:{value:get(response,"faculty.id"),label:get(response,"faculty.title")},
      params: {required: true}
    },

    {
      id: 8,
      label: "Receipt Date",
      name: "receiptDate",
      type: "datepicker",
      params: {required: true}
    },
    {
      id: 9,
      label: "Expiration Date",
      name: "expirationDate",
      type: "datepicker",
      params: {required: false}
    },
    {
      id: 10,
      label: "Form Study",
      name: "formStudyId",
      type: "select-pagination",
      url: "form-study",
      asyncSelectProperty: ["id", "title", "id"],
      value:{value:get(response,"formStudy.id"),label:get(response,"formStudy.title")},
      params: {required: true},
      column: [2, 2]
    },
    {
      id: 11,
      name: "isStudyByProfile",
      type: "checkbox",
      defaultValue:get(response,"isStudyByProfile"),
      params: {required: false},
      column: [2, 2]
    }
  ];

  if (!isFetchedProps) {
    return <Loader/>
  }
  return (
    <>
      <Breadcrumb
        titles={[
          {id: 1, title: t("Справочник"), url: "/education"},
          {
            id: 2,
            title: "Education",
            url: `/education/view/${id}`
          },
          {
            id: 3,
            title: t("Update"),
            url: `/education/update/${id}`
          },
          {id: 4, title: get(response, "id", ""), url: ``}
        ]}
      />
      <UpdateForm
        formRequest={update}
        values={values}
        CustomButton={CustomButton}
        cancelLink={"/education"}
        buttonText={"Update"}
        isFetched={isFetched}
        params={{ required: false }}
        property={{ disabled: false }}
      />
      <ToastContainer />
    </>
  );
}

export default withTranslation("HRMS")(EducationUpdatePage);
