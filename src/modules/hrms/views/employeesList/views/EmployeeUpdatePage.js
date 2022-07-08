import React, {useEffect, useState} from "react";
import UpdateForm from "../../../../../containers/Form/Form";
import CustomButton from "../../../../../containers/Form/component/Common/Button";
import Breadcrumb from "../../../../../components/Breadcrumb";
import {useDispatch, useSelector} from "react-redux";
import {withTranslation} from "react-i18next";
import {toast, ToastContainer} from "react-toastify";
import {get} from "lodash";
import EmployeeScheme from "../../../../../schema/Employees";
import ApiActions from "../../../../../services/api/Actions";
import Normalizer from "../../../../../services/normalizer";
import Actions from "../../../Actions";
import Tabs from "../../../../../components/Tabs";
import EmployeeEducationPage from "../../employeeEducation/views/EmployeeEducationPage";
import EmployeeRelationPage from "../../employeeRelation/views/EmployeeRelationPage";
import Loader from "../../../../../components/Loader";

function EmployeeUpdatePage(props) {
  const dispatch = useDispatch();
  const result = useSelector((state) =>
    get(state, "normalizer.data.employees", {})
  );
  const entities = useSelector((state) =>
    get(state, "normalizer.entities", {})
  );
  const [isFetched, setIsFetched] = useState(false);
  const { id } = props.match.params;
  const { t } = props;
  const getOne = (id) => {
    const storeName = "employees";
    const entityName = "employees";
    const scheme = EmployeeScheme;
    dispatch({
      type: ApiActions.GET_ONE.REQUEST,
      payload: {
        url: `employees/${id}`,
        scheme,
        storeName,
        entityName
      }
    });
  };
  useEffect(() => {
    getOne(id);
  }, []);
  const update = (attributes) => {
    const { id } = props.match.params;
    setIsFetched("Update");
    dispatch({
      type: Actions.EMPLOYEE_UPDATE.REQUEST,
      payload: {
        id,
        attributes,
        cb: {
          success: (nData, data) => {
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
  const status = [{
    value: "ACTIVE",
    label: "ACTIVE"
  },
    {
      value: "PASSIVE",
      label: "PASSIVE"
    }
  ];

  const response = Normalizer.Denormalize(get(result,'result'), EmployeeScheme, entities);

  const values =  [
    // {id: 1, name: "firstName", type: "input", label:'Имя',defaultValue:get(response,'employeesPassport.firstName'), params: {required: true,disabled:true}},
    // {id: 2, name: "lastName", type: "input", label:'Фамилия',defaultValue:get(response,'employeesPassport.lastName'), params: {required: true,disabled:true}},
    // {id: 3, name: "middleName", type: "input",label:'Отчество',defaultValue:get(response,'employeesPassport.middleName'), params: {required: true,disabled:true}},
    // {id: 4, name: "status",label:"Status", type: "select",options:status,disabled:true, params: {required: true}},
    {id: 1, name: "tinid", type: "input-mask", defaultValue:get(response,'tinid'), label: "ИНН", mask: "999999999", params: {required: true}},
    // {id: 2, name: "residenceAddress", type: "input",defaultValue:get(response,'employeesAddressRegistration.address'), label: 'Адрес', params: {required: true}},
    // {
    //   id: 3,
    //   label: "Партийность",
    //   name: "partyId",
    //   defaultValue:get(response,'party',""),
    //   url: "party",
    //   asyncSelectProperty: ["id", "title", "code"],
    //   type: "select-pagination",
    //   params: {required: true}
    // },
    // {
    //   id: 4,
    //   label: "Образование",
    //   name: "educationStatus",
    //   type: "select",
    //   params: {required: true},
    //   defaultValue: get(response,'educationStatus'),
    //   options: [
    //     {value: "BACHELOR", label: "BAKALAVR"},
    //     {value: "MASTER", label: "MAGISTR"},
    //     {
    //       value: "UNFINISHED_HIGHEST",
    //       label: "TUGALLANMAGAN OLIY (institut talabasi)"
    //     },
    //     {value: "UNFINISHED", label: "UNFINISHED"},
    //     {value: "MEDIUM", label: "O'RTA"},
    //     {value: "MEDIUM_SPECIAL ", label: "O'RTA MAXSUS"}
    //   ]
    // },
    // {id: 5, name: "pensioner", label: "Пенсионер", defaultValue:get(response,'pensioner',false), type: "checkbox", params: {required: false}},
    // {id: 6, name: "tradeUnionist", label: "Член профсоюза", defaultValue:get(response,'tradeUnionist',false), type: "checkbox", params: {required: false}},
    // {id: 7, name: "phoneNumber", type: "input-mask",defaultValue:get(response,'phoneNumber'), label: "Телефон моб.", params: {required: true}},
    // {id: 8, name: "workNumber", type: "input-mask",defaultValue:get(response,'workNumber'), label: "Рабочий телефон", params: {required: true,}},
  ];

  if(!get(result,'isFetched',false)){
    return <Loader />;
  }
  return (
      <>
        <Breadcrumb
            titles={[
              {id: 1, title: t("Справочник"), url: "/employees"},
              {
                id: 2,
                title: "Employees",
                url: `/employees/view/${id}`
              },
              {
                id: 3,
                title: t("Update"),
                url: `/employees/update/${id}`
              },
              {id: 4, title: get(response, "fullName", ""), url: ``}
            ]}
        />
      <Tabs
        titles={["Update Information", "Update Education", "Update Relation", "Update Position"]}
        texts={[<UpdateForm
          formRequest={update}
          values={values}
          CustomButton={CustomButton}
          cancelLink={"/employees"}
          buttonText={"Update"}
          isFetched={isFetched}
          params={{required: false}}
          property={{disabled: false}}
        />,
        <EmployeeEducationPage id={id} />,
          <EmployeeRelationPage id={id}  />
        ]}
      />

      <ToastContainer/>
    </>
  );
}

export default withTranslation("HRMS")(EmployeeUpdatePage);
