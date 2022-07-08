import React from "react";
import {Controller, useForm} from "react-hook-form";
import Process from "../component/Process/Process";
import {withTranslation} from "react-i18next";
import Input from "../../../../../containers/Form/component/Inputs/Input";
import InputMask from "../../../../../containers/Form/component/Inputs/InputMask";
import ReSelect from "../../../../../containers/Form/component/Select/SelectAsync";
import SelectAsyncPaginate from "../../../../../containers/Form/component/Select/SelectAsyncPagination";
import DatePicker from "../../../../../containers/Form/component/Inputs/DatePicker";
import Label from "../../../../../components/Common/Label";
import {useSelector} from "react-redux";
import {get} from "lodash";
import Loader from "../../../../../components/Loader";
import Normalizer from "../../../../../services/normalizer";
import parserPhone from "../../../../../components/InputGroup/ParserPhone";
import EmployeesScheme from "../../../../../schema/Employees";

const EmployeeInfo = (props) => {
  const {t} = props;
  const resultUserId = useSelector((state) =>
      get(state, "normalizer.data.get-employee-information-view-data.result", null)
  );
  const isFetched = useSelector((state) =>
      get(state, "normalizer.data.get-employee-information-view-data.isFetched", false)
  );
  const entities = useSelector((state) =>
    get(state, "normalizer.entities", {})
  );
  const employee = Normalizer.Denormalize(resultUserId, EmployeesScheme, entities);


  const {
    register,
    handleSubmit,
    formState: {isSubmitting, errors},
    control,
    setValue
  } = useForm();
  const onSubmit = (data) => {
    let { phoneNumber, workNumber } = data;
    const {saveFinished} = props;
    phoneNumber = phoneNumber.replace(/[\s()-]+/gi, "");
    workNumber = workNumber.replace(/[\s()-]+/gi, "");
    data = {...data,phoneNumber,workNumber};
    saveFinished(resultUserId,data)
  };
  if (!isFetched) {
    return <Loader />;
  }
  return (
    <div className="container-semiboxed">
      <Process process={1} />
      <form
        className="g-brd-around g-brd-gray-light-v4 g-pa-30 g-mb-30"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-group row g-mb-25">
          <Label title={"ФИО"} column={2} />
          <div className="col-10">
            <div className="row">
              <div className="col-4">
                <Controller
                  render={({ field }) => {
                    return (
                      <Input
                          hideLabel
                          register={register}
                          name={"lastName"}
                          defaultValue={get(employee, "employeesPassport.lastName")}
                          errors={errors}
                          params={{required: false}}
                          property={{disabled: true}}
                          column = {[2, 0]}
                      />
                    );
                  }}
                  control={control}
                  name={"lastName"}
                  defaultValue={get(employee, "employeesPassport.lastName")}
                />
              </div>
              <div className="col-4">
                <Controller
                  render={({ field }) => {
                    return (
                        <Input
                            hideLabel
                            register={register}
                            name={"firstName"}
                            defaultValue={get(employee, "employeesPassport.firstName")}
                            errors={errors}
                            params={{required: false}}
                            property={{disabled: true}}
                            column = {[2, 0]}
                        />
                    );
                  }}
                  control={control}
                  name={"firstName"}
                  defaultValue={get(employee, "employeesPassport.firstName")}
                />
              </div>
              <div className="col-4">
                <Controller
                  render={({ field }) => {
                    return (
                        <Input
                            hideLabel
                            register={register}
                            name={"middleName"}
                            defaultValue={get(employee, "employeesPassport.middleName")}
                            errors={errors}
                            params={{required: false}}
                            property={{disabled: true}}
                            column = {[2, 0]}
                        />
                    );
                  }}
                  control={control}
                  name={"patronymicName"}
                  defaultValue={get(employee, "employeesPassport.middleName")}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="form-group row g-mb-25">
          <Label title={"Пол"} column={2} />
          <div className="col-4">
            <select {...register("gender")} name={"gender"} className="form-control disabled form-control-sm rounded-0 p-3">
              <option value={get(employee, "employeesPassport.gender")}>
                {get(employee, "employeesPassport.gender")}
              </option>
            </select>
          </div>
          {/*<Label title={"Пенсионер"} />*/}
          {/*<div className="col-4">*/}
          {/*  <Checkbox*/}
          {/*    register={register}*/}
          {/*    name={"pensioner"}*/}
          {/*    errors={errors}*/}
          {/*    control={control}*/}
          {/*    defaultChecked={get(employee, "pensioner")}*/}
          {/*    params={{ required: false }}*/}
          {/*    property={{ disabled: false }}*/}
          {/*  />*/}
          {/*</div>*/}
        </div>
        <div className="form-group row g-mb-25">
          <Label title={"ИНН"} column={2} />
          <div className="col-4">
            <Controller
              render={({ field }) => {
                return (
                    <InputMask
                        hideLabel
                        register={register}
                        mask="999999999"
                        placeholder={"ИНН"}
                        name={"inn"}
                        defaultValue={get(employee, "tinid")}
                        errors={errors}
                        params={{required: false}}
                        property={{disabled: true}}
                        column = {[2, 0]}
                    />
                );
              }}
              control={control}
              name={"inn"}
              defaultValue={get(employee, "tinid")}
            />
          </div>
          <Label title={"ИНПС"} column={2} />
          <div className="col-4">
            <Controller
              render={({ field }) => {
                return (
                    <Input
                        hideLabel
                        register={register}
                        name={"pinid"}
                        defaultValue={get(employee, "pinid")}
                        value={get(employee, "pinid")}
                        errors={errors}

                        params={{required: false}}
                        property={{disabled: true}}
                        column = {[2, 0]}
                    />
                );
              }}
              control={control}
              name={"pinid"}
              defaultValue={get(employee, "pinid")}
            />
          </div>
        </div>
        <hr />
        <div className="form-group row g-mb-25">
          <Label title={"Страна рождения"} column={2} />
          <div className="col-4">
            <select {...register("birthCountryId")} name={"birthCountryId"} className="form-control disabled form-control-sm rounded-0 p-3">
              <option value={get(employee, "employeesAddressRegistration.country.id")}>
                {get(employee, "employeesAddressRegistration.country.title")}
              </option>
            </select>
          </div>
          <Label title={"Область рождения"} column={2} />
          <div className="col-4">
            <select {...register("birthRegionId")} name={"birthRegionId"} className="form-control disabled form-control-sm rounded-0 p-3">
              <option value={get(employee, "employeesAddressRegistration.region.id")}>
                {get(employee, "employeesAddressRegistration.region.title")}
              </option>
            </select>
          </div>
        </div>
        <div className="form-group row g-mb-25">
          <Label title={"Насел. пункт рождения"} column={2} />
          <div className="col-4">
            <select {...register("birthDistrict")} name={"birthDistrict"} className="form-control disabled form-control-sm rounded-0 p-3">
              <option value={get(employee, "employeesAddressRegistration.district.id")}>
                {get(employee, "employeesAddressRegistration.district.title")}
              </option>
            </select>
          </div>
          <Label title={"Дата рождения"} column={2} />
          <div className="col-4">
            <Controller
              render={({ field }) => {
                return (
                  <DatePicker
                      hideLabel
                      register={register}
                      name={"birthDate"}
                      defaultValue={get(employee, "employeesPassport.birthDate")}
                      errors={errors}
                      control={control}
                      params={{ required: false }}
                      property={{ disabled: true }}
                      column = {[2, 0]}
                  />
                );
              }}
              control={control}
              name={"birthDate"}
              defaultValue={get(employee, "employeesPassport.birthDate")}
            />
          </div>
        </div>
{/*        <div className="form-group row g-mb-25">
          <Label title={"Место рождения"} column={2} />
          <div className="col-10">
            <Controller
              render={({ field }) => {
                return (
                  <Input
                    register={register}
                    name={"birthPlace"}
                    defaultValue={get(employee, "employeesPassport.birthCountry.title")}
                    errors={errors}
                    params={{ required: false }}
                    property={{ disabled: true }}
                  />
                );
              }}
              control={control}
              name={"birthPlace"}
            />
          </div>
        </div>*/}


        {/*<hr />*/}
        {/*<div className="form-group row g-mb-25">*/}
        {/*  <Label title={"Гражданство"} column={2}/>*/}
        {/*  <div className="col-4">*/}

        {/*  </div>*/}
        {/*</div>*/}

        <hr />
        <div className="form-group row g-mb-25">
          <Label title={"Серия паспорта"} column={2} />
          <div className="col-4">
            <Controller
              render={({ field }) => {
                return (
                  <Input
                      hideLabel
                    register={register}
                    name={"passportSeries"}
                    defaultValue={get(employee, "employeesPassport.docSeries")}
                    errors={errors}
                    params={{ required: false }}
                    property={{ disabled: true }}
                      column = {[2, 0]}
                  />
                );
              }}
              control={control}
              name={"passportSeries"}
              defaultValue={get(employee, "employeesPassport.docSeries")}
            />
          </div>
          <Label title={"Номер паспорта"} column={2} />
          <div className="col-4">
            <Controller
              render={({ field }) => {
                return (
                  <Input
                      hideLabel
                    register={register}
                    name={"passportNumber"}
                    defaultValue={get(employee, "employeesPassport.docNumber")}
                    errors={errors}
                    params={{ required: false }}
                    property={{ disabled: true }}
                      column = {[2, 0]}
                  />
                );
              }}
              control={control}
              name={"passportNumber"}
              defaultValue={get(employee, "employeesPassport.docNumber")}
            />
          </div>
        </div>

        <div className="form-group row g-mb-25">
          <Label title={"Когда выдан паспорт"} column={2} />
          <div className="col-4">
            <Controller
              render={({ field }) => {
                return (
                  <Input
                      hideLabel
                    register={register}
                    name={"docIssueDate"}
                    defaultValue={get(employee, "employeesPassport.docIssueDate")}
                    errors={errors}
                    params={{ required: false }}
                    property={{ disabled: true }}
                      column = {[2, 0]}
                  />
                );
              }}
              control={control}
              name={"docIssueDate"}
              defaultValue={get(employee, "employeesPassport.docIssueDate")}
            />
          </div>
          <Label title={"Срок годности паспорта"} />
          <div className="col-4">
            <Controller
              render={({ field }) => {
                return (
                  <Input
                      hideLabel
                    register={register}
                    name={"docExpireDate"}
                    defaultValue={get(employee, "employeesPassport.docExpireDate")}
                    errors={errors}
                    params={{ required: false }}
                    property={{ disabled: true }}
                      column = {[2, 0]}
                  />
                );
              }}
              control={control}
              name={"docExpireDate"}
              defaultValue={get(employee, "employeesPassport.docExpireDate")}
            />
          </div>
        </div>

        <div className="form-group row g-mb-25">
          <Label title={"Кем выдан паспорт"} />
          <div className="col-10">
            <Controller
              render={({ field }) => {
                return (
                  <Input
                      hideLabel
                    register={register}
                    name={"docIssuePlace"}
                    defaultValue="24"
                    errors={errors}
                    params={{ required: false }}
                    property={{ disabled: true }}
                      column = {[2, 0]}
                  />
                );
              }}
              control={control}
              name={"docIssuePlace"}
              defaultValue={get(employee, "employeesPassport.docIssuePlace")}
            />
          </div>
        </div>

        <div className="form-group row g-mb-25">
          <Label title={"Проживания"} />
          <div className="col-10">
            <div className="row">
              <div className="col-4">
                <Controller
                    render={({ field }) => {
                      return (
                          <Input
                              hideLabel
                              register={register}
                              name={"residenceCountryId"}
                              defaultValue="24"
                              errors={errors}
                              params={{ required: false }}
                              property={{ disabled: true }}
                              column = {[2, 0]}
                          />
                      );
                    }}
                    control={control}
                    name={"residenceCountryId"}
                    defaultValue={get(employee, "employeesAddressRegistration.country.title")}
                />
              </div>
              <div className="col-4">
                <Controller
                    render={({ field }) => {
                      return (
                          <Input
                              hideLabel
                              register={register}
                              name={"residenceRegionId"}
                              defaultValue="24"
                              errors={errors}
                              params={{ required: false }}
                              property={{ disabled: true }}
                              column = {[2, 0]}
                          />
                      );
                    }}
                    control={control}
                    name={"residenceRegionId"}
                    defaultValue={get(employee, "employeesAddressRegistration.region.title")}
                />
              </div>
              <div className="col-4">
                <Controller
                    render={({ field }) => {
                      return (
                          <Input
                              hideLabel
                              register={register}
                              name={"residenceDistrictId"}
                              defaultValue="24"
                              errors={errors}
                              params={{ required: false }}
                              property={{ disabled: true }}
                              column = {[2, 0]}
                          />
                      );
                    }}
                    control={control}
                    name={"residenceDistrictId"}
                    defaultValue={get(employee, "employeesAddressRegistration.district.title")}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="form-group row g-mb-25">
          <Label title={"Адрес"} />
          <div className="col-10">
            <Input
                hideLabel
              register={register}
              name={"residenceAddress"}
              defaultValue={get(employee, "employeesAddressRegistration.address")}
              errors={errors}
              control={control}
              params={{ required: false }}
              property={{ disabled: false }}
                column = {[2, 0]}
            />
          </div>
        </div>


        <hr />
        <div className="form-group row g-mb-25">
          <Label title={"Рабочий телефон"} />
          <div className="col-4">
            <InputMask
                hideLabel
              mask="(99)-999-99-99"
              register={register}
              name={"workNumber"}
              errors={errors}
              defaultValue={get(employee, "workNumber")}
              beforeMaskedValueChange={parserPhone}
              params={{ required: false }}
              property={{ disabled: false }}
                column = {[2, 0]}
            />
          </div>
          <Label title={"Телефон моб."} />
          <div className="col-4">
            <InputMask
                hideLabel
              mask="(99)-999-99-99"
              register={register}
              name={"phoneNumber"}
              errors={errors}
              defaultValue={get(employee, "phoneNumber")}
              stateChange={parserPhone}
              params={{ required: false }}
              property={{ disabled: false }}
                column = {[2, 0]}
            />
          </div>
        </div>
        <hr />

        <div className="form-group row g-mb-25">
          <Label title={"Национальность"}/>
          <div className="col-4">

            <select {...register("nationalityId")} name={"nationalityId"} className="form-control disabled form-control-sm rounded-0 p-3">
              <option value={get(employee, "employeesPassport.nationality.id")}>
                {get(employee, "employeesPassport.nationality.title")}
              </option>
            </select>
          </div>
          <Label title={"Партийность "}/>
          <div className="col-4">
          <SelectAsyncPaginate
              hideLabel
               register={register}
               control={control}
               errors={errors}
               value={{value:get(employee, "party.id"),label:get(employee, "party.title")}}
               asyncSelectProperty={["id", "title","code"]}
              name={"partyId"}
              url={"/party"}
              column = {[2, 0]}
              onChange={setValue}/>
          </div>

        </div>

        <div className="form-group row g-mb-25">
          {/*<Label title={"Член профсоюза"} />*/}
          {/*<div className="col-4">*/}
          {/*  <Checkbox*/}
          {/*    register={register}*/}
          {/*    name={"tradeUnionist"}*/}
          {/*    errors={errors}*/}
          {/*    control={control}*/}
          {/*    params={{ required: false }}*/}
          {/*    property={{ disabled: false }}*/}
          {/*    defaultChecked={get(employee, "tradeUnionist")}*/}
          {/*  />*/}
          {/*</div>*/}
          <Label title={"Образование"} />
          <div className="col-4">
            <ReSelect
                hideLabel
              register={register}
              name={"educationStatus"}
              defaultValue={get(employee, "educationStatus")}
              errors={errors}
              options={[
                { value: "BACHELOR", label: "BAKALAVR" },
                { value: "MASTER", label: "MAGISTR" },
                {
                  value: "UNFINISHED_HIGHEST",
                  label: "TUGALLANMAGAN OLIY (institut talabasi)"
                },
                { value: "UNFINISHED", label: "UNFINISHED" },
                { value: "MEDIUM", label: "O'RTA" },
                { value: "MEDIUM_SPECIAL ", label: "O'RTA MAXSUS" }
              ]}
              params={{ required: false }}
              property={{ disabled: false }}
              control={control}
                column = {[2, 0]}
            />
          </div>
        </div>
        <hr />
        <div className="text-right">
          <button
            type="submit"
            className="btn btn-md u-btn-darkgray rounded-0 g-py-12 g-px-25 btn-block"
          >
            {isSubmitting ? <Loader /> : <span>{t("Save and Next")}</span>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default withTranslation("HRMS")(EmployeeInfo);
