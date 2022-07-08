import React from "react";
import { get, isEqual } from "lodash";
import Input from "../../../../../../containers/Form/component/Inputs/Input";
import ReSelect from "../../../../../../containers/Form/component/Select/SelectAsync";
import DatePicker from "../../../../../../containers/Form/component/Inputs/DatePicker";
import Label from "../../../../../../components/Common/Label";
import { useForm } from "react-hook-form";
import Loader from "../../../../../../components/Loader";
import LoaderMini from "../../../../../../components/Loader/LoaderMini";
const Modal = ({ onSubmit, resultById, setIsUpdate, isFetched, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm();

  if (!isFetched) {
   return <Loader />;
  }
  return (
    <>
      <div
        className="custombox-overlay custombox-fadein custombox-open"
        style={{ backgroundColor: "rgb(0, 0, 0)" }}
      />
      <div
        className="custombox-content custombox-x-center custombox-y-center custombox-fadein custombox-open"
        style={{ animationDuration: "300ms", animationDelay: "150ms" }}
      >
        <div
          id="modal1"
          className="text-left g-bg-white g-overflow-y-auto g-pa-20"
          style={{ display: "block", width: 1000 }}
        >
          <form
            className="g-brd-around g-brd-gray-light-v4 g-pa-30 g-mb-30"
            onSubmit={handleSubmit(onSubmit)}
          >
            {" "}
            <div>
              <div className="form-group row g-mb-25">
                <Label title={"Степень родства"} />
                <div className="col-4">
                  <ReSelect
                    register={register}
                    name={"relationship"}
                    defaultValue={get(resultById, "relationship")}
                    errors={errors}
                    control={control}
                    options={[
                      { value: "FATHER", label: "OTASI" },
                      { value: "MOTHER", label: "ONASI" },
                      { value: "BROTHER", label: "AKASI" },
                      { value: "SISTER", label: "OPASI" },
                      { value: "LITTLE_BROTHER", label: "UKASI" },
                      { value: "LITTLE_SISTER", label: "SINGLISI" },
                      { value: "HUSBAND", label: "ERI" },
                      { value: "WIFE", label: "XOTINI" },
                      { value: "FATHER_IN_LAW", label: "QAYNOTASI" },
                      { value: "MOTHER_IN_LAW", label: "QAYNONASI" },
                      { value: "SON", label: "O'GLI" },
                      { value: "DAUGHTER", label: "QIZI" },
                      { value: "EX_HUSBAND", label: "SOBIQ ERI" },
                      { value: "EX_WIFE", label: "SOBIQ XOTINI" }
                    ]}
                    params={{ required: false }}
                    property={{ disabled: false }}
                  />
                </div>
              </div>
              <div className="form-group row g-mb-25">
                {" "}
                <Label title={"ФИО"} column={2} />{" "}
                <div className="col-10">
                  {" "}
                  <div className="row">
                    {" "}
                    <div className="col-4">
                      {" "}
                      <Input
                        register={register}
                        name={"lastName"}
                        defaultValue={get(resultById, "lastName")}
                        errors={errors}
                        control={control}
                        params={{ required: false }}
                        property={{ disabled: true }}
                      />{" "}
                    </div>{" "}
                    <div className="col-4">
                      {" "}
                      <Input
                        register={register}
                        name={"firstName"}
                        defaultValue={get(resultById, "firstName")}
                        errors={errors}
                        control={control}
                        params={{ required: false }}
                        property={{ disabled: true }}
                      />{" "}
                    </div>{" "}
                    <div className="col-4">
                      {" "}
                      <Input
                        register={register}
                        name={"middleName"}
                        defaultValue={get(resultById, "middleName")}
                        errors={errors}
                        control={control}
                        params={{ required: false }}
                        property={{ disabled: true }}
                      />{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
              <div className="form-group row g-mb-25">
                {" "}
                <Label title={"Дата рождения"} column={2} />{" "}
                <div className="col-4">
                  {" "}
                  <DatePicker
                    register={register}
                    name={"birthdate"}
                    defaultValue={get(resultById, "birthdate")}
                    errors={errors}
                    control={control}
                    params={{ required: false }}
                    property={{ disabled: true }}
                  />{" "}
                </div>{" "}
                {/* <Label title={"Дата смерти"} /> <div className="col-1"> <Checkbox register={register} name={"deathdate"} defaultValue="1" errors={errors} params={{ required: false }} property={{ disabled: false }} /> </div> */}{" "}
                {/* <div className="col-3"> <DatePicker register={register} name={"death_date"} defaultValue="" errors={errors} params={{ required: false }} property={{ disabled: false }} /> </div> */}{" "}
              </div>{" "}
              <div className="form-group row g-mb-25">
                {" "}
                <Label title={"Место рождения"} />{" "}
                <div className="col-10">
                  {" "}
                  <Input
                    register={register}
                    name={"birthplace"}
                    defaultValue={get(resultById, "birthplace")}
                    errors={errors}
                    control={control}
                    params={{ required: false }}
                    property={{ disabled: false }}
                  />{" "}
                  {/* <div className="row"> <div className="col-4"> <Select register={register} name={"birthplace"} defaultValue="000860 - UZBEKISTAN RESPUBLIKASI" errors={errors} options={[ { value: "000860", label: "UZBEKISTAN RESPUBLIKASI" }, { value: "000066", label: "RUSSIAN RESPUBLIKASI" } ]} params={{ required: false }} property={{ disabled: false }} /> </div> <div className="col-4"> <Select register={register} name={"living_state_name"} defaultValue="000066 - TOSHKENT VILOYATI" errors={errors} options={[ { value: "000066", label: "TOSHKENT VILOYATI" }, { value: "000860", label: "TOSHKENT SHAHRI" } ]} params={{ required: false }} property={{ disabled: false }} /> </div> <div className="col-4"> <Select register={register} name={"living_state_name"} defaultValue="000066 - TOSHKENT VILOYATI" errors={errors} options={[ { value: "000066", label: "TOSHKENT VILOYATI" }, { value: "000860", label: "TOSHKENT SHAHRI" } ]} params={{ required: false }} property={{ disabled: false }} /> </div> </div> */}{" "}
                </div>{" "}
              </div>{" "}
              <div className="form-group row g-mb-25">
                {" "}
                <Label title={"Адрес"} />{" "}
                <div className="col-10">
                  {" "}
                  <Input
                    register={register}
                    name={"address"}
                    defaultValue={get(resultById, "address")}
                    errors={errors}
                    control={control}
                    params={{ required: false }}
                    property={{ disabled: false }}
                  />{" "}
                </div>{" "}
              </div>{" "}
              <div className="form-group row g-mb-25">
                {" "}
                <Label title={"Рабочее место"} />{" "}
                <div className="col-10">
                  {" "}
                  <Input
                    register={register}
                    name={"workplace"}
                    defaultValue={get(resultById, "workplace")}
                    errors={errors}
                    control={control}
                    params={{ required: false }}
                    property={{ disabled: false }}
                  />{" "}
                </div>{" "}
              </div>{" "}
              {/* <div className="form-group row g-mb-25"> <Label title={"Должность"} /> <div className="col-10"> <Input register={register} name={"position"} defaultValue="" errors={errors} params={{ required: false }} property={{ disabled: false }} /> </div> </div> */}{" "}
              {/* <div className="form-group row g-mb-25"> <Label title={"Гражданство"} column={2} /> <div className="col-4"> <Select register={register} name={"citizenship"} errors={errors} defaultValue="O'ZBEK" options={[ { value: "o'zbek", label: "O'ZBEK" }, { value: "boshqa", label: "BOSHQA" } ]} params={{ required: false }} property={{ disabled: false }} /> </div> <Label title={"Гражданин какой страны"} column={2} /> <div className="col-4"> <Input register={register} name={"citizenship_name"} defaultValue="000860 - UZBEKISTAN RESPUBLIKASI" errors={errors} params={{ required: false }} property={{ disabled: false }} /> </div> </div> */}{" "}
              <div className="form-group row g-mb-25">
                <div className="col-4 offset-2">
                  <button
                    type="submit"
                    className="btn btn-md u-btn-primary rounded-0"
                  >
                    {isEqual(isLoading, "update") ? (
                      <LoaderMini />
                    ) : (
                      "Сохранять"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsUpdate(false)}
                    className="btn btn-md u-btn-danger rounded-0 ml-2"
                  >
                    Назад
                  </button>
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
