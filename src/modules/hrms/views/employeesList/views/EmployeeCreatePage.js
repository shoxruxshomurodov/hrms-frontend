import React, {useState} from "react";
import CreateForm from "../../../../../containers/Form/Form";
import CustomButton from "../../../../../containers/Form/component/Common/Button";
import Breadcrumb from "../../../../../components/Breadcrumb";
import {withTranslation} from "react-i18next";
import {toast, ToastContainer} from "react-toastify";
import {useDispatch} from 'react-redux';
import {useHistory} from "react-router-dom";
import Actions from "../../../Actions";
import {toUpper} from "lodash";

const EmployeeCreatePage = ({t,...rest}) => {
  const [isFetched, setIsFetched] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const create = (attributes) => {
    let {passport,pinid} = attributes;
    passport = toUpper(passport);
    attributes = {passport,pinid};
    setIsFetched("Create");
    dispatch({
      type: Actions.EMPLOYEE_CREATE_BY_DOCUMENT.REQUEST,
      payload: {
        attributes,
        cb: {
          success: (nData, {id}) => {
            setIsFetched(false)
            toast.dismiss();
            toast.success('Успешно', {
              position: "top-right",
              autoClose: 5000,
            })
            setTimeout(() => {
              history.push(`/employees/view/${id}`)
            }, 1000)
          },
          fail: (e) => {
            setIsFetched(false)
            toast.dismiss();
            toast.error(e.response.data.message, {
              position: "top-right",
              autoClose: 5000,
            })
          },
        },
      },
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
  ]
  const values = [
    {id: 1, name: "passport",label:"Seriya va raqami", type: "input-mask",mask:"aa9999999",property:{placeholder:'Seriya va raqami',hasAppend:true,className:'text-uppercase  form-control-md border-right-0 rounded-0 g-py-13 pr-0'}, params: {required: true},column :[3, 9]},
    {id: 2, name: "pinid",label:"Pinfl", type: "input-mask",mask:"99999999999999",property:{placeholder:'PINFL',hasAppend:true,className:'form-control-md border-right-0 rounded-0 g-py-13 pr-0'}, params: {required: true},column :[3, 9]},

  ];
  return (
    <>
      <Breadcrumb
          titles={[
            {id: 1, title: t("Справочник"), url: "/employees"},
            {id: 2, title: t("Employee List"), url: "/employees"},
            {id: 3, title: t("Create"), url: ""}
          ]}
      />
      <div className="container">
        <header className="g-mb-80">
          <div className="u-heading-v6-2 text-uppercase">
            <h2 className="h4 u-heading-v6__title g-font-weight-300">Xodim qo'shish formasi
            </h2>
          </div>
          <div className="g-pl-90">
            <p>Xodimning shaxsini tasdiqlovchi hujjat (pasporti)ning birlamchi ma'lumotlari kiritib, O'zbekiston
              Rrespublikasi Ichki Ishkar vazirligi qoshidagi ma'lumotlar bazasiga elektron yuboriladi. Ushu elektron
              so'rov muvofiqiyatli javob hamma xodimning barcha pasport ma'lumotlari qaytarilgan taqdirda amaliyot
              bajariladi!</p>
          </div>
        </header>
        <div className="row">
          <div className="col-md-2">
            <h3 className="h4 g-font-weight-300">Yaratish</h3><p>Xodimning pasport <code>seriaya raqami</code> va <code>pinfl
            raqami</code>ni kiriting</p>
          </div>

          <div className="col-md-10">
            <div id="shortcode11">
              <div className="shortcode-html">
                <CreateForm
                    formRequest={create}
                    values={values}
                    CustomButton={CustomButton}
                    cancelLink={"/employees"}
                    buttonText={"Create"}
                    isFetched={isFetched}
                    params={{required: false}}
                    property={{disabled: false}}
                />

              </div>
            </div>
          </div>
        </div>
      </div>


      <ToastContainer/>
    </>
  );
}

export default withTranslation("HRMS")(EmployeeCreatePage);
