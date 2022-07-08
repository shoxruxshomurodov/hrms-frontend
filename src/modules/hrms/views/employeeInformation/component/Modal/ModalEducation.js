import React, {useEffect} from "react";
import {get, isEmpty, isEqual} from "lodash";
import Input from "../../../../../../containers/Form/component/Inputs/Input";
import ReSelect from "../../../../../../containers/Form/component/Select/SelectAsync";
import DatePicker from "../../../../../../containers/Form/component/Inputs/DatePicker";
import Label from "../../../../../../components/Common/Label";
import {useForm} from "react-hook-form";
import Loader from "../../../../../../components/Loader";
import LoaderMini from "../../../../../../components/Loader/LoaderMini";
import {useDispatch, useSelector} from "react-redux";
import ApiActions from "../../../../../../services/api/Actions";
import DiplomaQualificationScheme from "../../../../../../schema/DiplomaQualification";
import SpecialityScheme from "../../../../../../schema/Speciality";
import EducationInstitutionScheme from "../../../../../../schema/EducationalInstitution";
import FormStudyScheme from "../../../../../../schema/FormStudy";
import Normalizer from "../../../../../../services/normalizer";
import helper from "../../../../../../containers/Form/helper";
import FacultyScheme from "../../../../../../schema/Faculty";

const Modal = ({ onSave, resultById, setIsUpdate, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm();
  const dispatch = useDispatch();
  const entities = useSelector((state) =>
    get(state, "normalizer.entities", {})
  );
  let diplomaQualification = useSelector((state) =>
    get(state, "normalizer.data.diploma-qualification.result.content", [])
  );
  let speciality = useSelector((state) =>
    get(state, "normalizer.data.speciality.result.content", [])
  );
  let educationalInstitution = useSelector((state) =>
    get(state, "normalizer.data.educational-institution.result.content", [])
  );
  let formStudy = useSelector((state) =>
    get(state, "normalizer.data.form-study.result.content", [])
  );
  let faculty = useSelector((state) =>
    get(state, "normalizer.data.faculty.result.content", [])
  );
  diplomaQualification = helper.renderProperty(
    Normalizer.Denormalize(
      diplomaQualification,
      [DiplomaQualificationScheme],
      entities
    ),
    ["id", "title"]
  );
  speciality = helper.renderProperty(
    Normalizer.Denormalize(speciality, [SpecialityScheme], entities),
    ["id", "title"]
  );
  educationalInstitution = helper.renderProperty(
    Normalizer.Denormalize(
      educationalInstitution,
      [EducationInstitutionScheme],
      entities
    ),
    ["id", "title"]
  );
  formStudy = helper.renderProperty(
    Normalizer.Denormalize(formStudy, [FormStudyScheme], entities),
    ["id", "title"]
  );
  faculty = helper.renderProperty(
    Normalizer.Denormalize(faculty, [FacultyScheme], entities),
    ["id", "title"]
  );
  const getDiplomaQualification = () => {
    const storeName = "diploma-qualification";
    const entityName = "diploma-qualification";
    const scheme = { content: [DiplomaQualificationScheme] };
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: `diploma-qualification`,
        scheme,
        storeName,
        entityName
      }
    });
  };
  const getSpeciality = () => {
    const storeName = "speciality";
    const entityName = "speciality";
    const scheme = { content: [SpecialityScheme] };
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: `speciality`,
        scheme,
        storeName,
        entityName
      }
    });
  };
  const getEducationalInstitution = () => {
    const storeName = "educational-institution";
    const entityName = "educational-institution";
    const scheme = { content: [EducationInstitutionScheme] };
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: `educational-institution`,
        scheme,
        storeName,
        entityName
      }
    });
  };
  const getFormStudy = () => {
    const storeName = "form-study";
    const entityName = "form-study";
    const scheme = { content: [FormStudyScheme] };
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: `form-study`,
        scheme,
        storeName,
        entityName
      }
    });
  };
  const getFaculty = () => {
    const storeName = "faculty";
    const entityName = "faculty";
    const scheme = { content: [FacultyScheme] };
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: `faculty`,
        scheme,
        storeName,
        entityName
      }
    });
  };
  useEffect(() => {
    getDiplomaQualification();
    getSpeciality();
    getEducationalInstitution();
    getFormStudy();
    getFaculty();
  }, []);

  if (isEmpty(resultById)) {
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
            onSubmit={handleSubmit(onSave)}
          >
            <div className="form-group row g-mb-25">
              <Label title={"Тип образования"} column={2} />
              <div className="col-4">
                <ReSelect
                    hideLabel
                    register={register}
                    name={"level"}
                    errors={errors}
                    control={control}
                    options={[
                    { value: "BACHELOR", label: "Bakalavr" },
                    { value: "MASTER", label: "Magistr" },
                    {
                      value: "UNFINISHED_HIGHEST",
                      label: "UNFINISHED_HIGHEST"
                    },
                    { value: "UNFINISHED", label: "Tugallanmagan Oliy" },
                    { value: "MEDIUM", label: "O'rta" },
                    { value: "MEDIUM_SPECIAL ", label: "O'rta maxsus" }
                  ]}
                    params={{ required: false }}
                    property={{ disabled: false }}
                    defaultValue={get(resultById, "level")}
                />
              </div>
              <Label title={"Учёба по профилю"} column={2} />
              <div className="col-3">
                <ReSelect
                    hideLabel
                    register={register}
                    name={"studyByProfile"}
                    defaultValue={get(resultById, "studyByProfile")}
                    errors={errors}
                    control={control}
                    options={[
                    { value: true, label: "Да" },
                    { value: false, label: "Нет" }
                  ]}
                    params={{ required: false }}
                    property={{ disabled: false }}
                />
              </div>
            </div>

            <div className="form-group row g-mb-25">
              <Label title={"Учебное заведение"} column={2} />
              <div className="col-4">
                <ReSelect
                    hideLabel
                    register={register}
                    name={"educationalInstitutionId"}
                    errors={errors}
                    options={educationalInstitution}
                    defaultValue={get(resultById, "educationalInstitution.id")}
                    params={{ required: false }}
                    property={{ disabled: false }}
                    control={control}
                />
              </div>
              <Label title={"Специальность"} column={2} />
              <div className="col-4">
                <ReSelect
                    hideLabel
                    register={register}
                    name={"specialityId"}
                    errors={errors}
                    options={speciality}
                    params={{ required: false }}
                    property={{ disabled: false }}
                    defaultValue={get(resultById, "speciality.id")}
                    control={control}
                />
              </div>
            </div>

            <div className="form-group row g-mb-25">
              <Label title={"Квалификация по диплому"} column={2} />
              <div className="col-4">
                <ReSelect
                    hideLabel
                    register={register}
                    name={"diplomaQualificationId"}
                    defaultValue={get(resultById, "diplomaQualification.id")}
                    errors={errors}
                    options={diplomaQualification}
                    params={{ required: false }}
                    property={{ disabled: false }}
                    control={control}
                />
              </div>
              <Label title={"Форма обучения"} column={2} />
              <div className="col-4">
                <ReSelect
                    hideLabel
                    register={register}
                    name={"formStudyId"}
                    defaultValue={get(resultById, "formStudy.id")}
                    errors={errors}
                    options={formStudy}
                    params={{ required: false }}
                    property={{ disabled: false }}
                    control={control}
                />
              </div>
            </div>
            <div className="form-group row g-mb-25">
              <Label title={"Факультет"} column={2} />
              <div className="col-10">
                <ReSelect
                    hideLabel
                    register={register}
                    name={"facultyId"}
                    errors={errors}
                    options={faculty}
                    params={{ required: true }}
                    property={{ disabled: false }}
                    control={control}
                    defaultValue={get(resultById, "faculty.id")}
                />
              </div>
            </div>

            <div className="form-group row g-mb-25">
              <Label title={"Дата поступления"} column={2} />
              <div className="col-4">
                <DatePicker
                    hideLabel
                    register={register}
                    name={"receiptDate"}
                    errors={errors}
                    control={control}
                    params={{ required: false }}
                    property={{ disabled: false }}
                    defaultValue={get(resultById, "receiptDate")}
                />
              </div>
            </div>

            <div className="form-group row g-mb-25">
              <Label title={"Дата окончания"} column={2} />
              <div className="col-4">
                <DatePicker
                    hideLabel
                    register={register}
                    name={"expirationDate"}
                    errors={errors}
                    control={control}
                    params={{ required: false }}
                    property={{ disabled: false }}
                    defaultValue={get(resultById, "expirationDate")}
                />
              </div>
            </div>

            <div className="form-group row g-mb-25">
              <Label title={"Дата регистрации диплома"} column={2} />
              <div className="col-4">
                <DatePicker
                    hideLabel
                    register={register}
                    name={"diplomaRegistrationDate"}
                    errors={errors}
                    control={control}
                    params={{ required: false }}
                    property={{ disabled: false }}
                    defaultValue={get(resultById, "diplomaRegistrationDate")}
                />
              </div>
              <Label title={"Номер диплома"} column={2} />
              <div className="col-4">
                <Input
                    hideLabel
                    register={register}
                    name={"diplomaNumber"}
                    errors={errors}
                    control={control}
                    params={{ required: false }}
                    property={{ disabled: false }}
                    defaultValue={get(resultById, "diplomaNumber")}
                />
              </div>
            </div>

            <div className="form-group row g-mb-25">
              <div className="col-4 offset-2">
                <button
                  type="submit"
                  className="btn btn-md u-btn-primary rounded-0"
                >
                  {isEqual(isLoading, "update") ? <LoaderMini /> : "Сохранять"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsUpdate(false)}
                  className="btn btn-md u-btn-danger rounded-0 ml-2"
                >
                  Назад
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
