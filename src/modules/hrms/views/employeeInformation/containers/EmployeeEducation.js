import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Process from "../component/Process/Process";
import { withTranslation } from "react-i18next";
import Input from "../../../../../containers/Form/component/Inputs/Input";
import ReSelect from "../../../../../containers/Form/component/Select/SelectAsync";
import SelectAsyncPaginate from "../../../../../containers/Form/component/Select/SelectAsyncPagination";
import DatePicker from "../../../../../containers/Form/component/Inputs/DatePicker";
import Label from "../../../../../components/Common/Label";
import TableBase from "../../../../../components/Table/TableBase";
import { useDispatch, useSelector } from "react-redux";
import EmployeeEducationsScheme from "../../../../../schema/EmployeeEducations";
import ApiActions from "../../../../../services/api/Actions";
import Normalizer from "../../../../../services/normalizer";
import Action from "../../../Actions";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import { get, isEmpty, isEqual, isNil } from "lodash";
import LoaderMini from "../../../../../components/Loader/LoaderMini";
import Modal from "../component/Modal/ModalEducation";
import classNames from "classnames";
import EmployeesScheme from "../../../../../schema/Employees";
const EmployeeEducation = (props) => {

  const [educationId, setEducationId] = useState(null);
  const [id, setId] = useState(null);
  const educationRef = useRef(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const { t,isLoading,setLoading,create,userId,saveFinished } = props;
  const dispatch = useDispatch();
  const entities = useSelector((state) =>
    get(state, "normalizer.entities", {})
  );

  const resultEmployeeId = useSelector((state) =>
      get(state, "normalizer.data.get-employee-information-view-data.result", null)
  );
  const isFetchedEmployee = useSelector((state) =>
      get(state, "normalizer.data.get-employee-information-view-data.isFetched", false)
  );
  const employee = Normalizer.Denormalize(resultEmployeeId, EmployeesScheme, entities);
  const employeeId = get(employee,'id');

  let education = useSelector((state) =>
    get(state, "normalizer.data.employeeEducations.result", [])
  );
  let educationById = useSelector((state) =>
    get(state, "normalizer.data.employeeEducations-by-id.result", [])
  );

  educationById = Normalizer.Denormalize(
    educationById,
      EmployeeEducationsScheme,
    entities
  );


  const isFetchedById = useSelector((state) =>
    get(state, "normalizer.data.employeeEducations-by-id.isFetched", false)
  );

  education = Normalizer.Denormalize(education, [EmployeeEducationsScheme], entities);
  const {
    register,
    handleSubmit,
    formState: {isSubmitting, errors},
    watch,
    control,
    setValue
  } = useForm();
  const getEducationById = (id) => {
    const storeName = "employeeEducations-by-id";
    const entityName = "employeeEducations";
    const scheme = EmployeeEducationsScheme;
    dispatch({
      type: ApiActions.GET_ONE.REQUEST,
      payload: {
        url: `employees-education/${id}`,
        scheme,
        storeName,
        entityName
      }
    });
  };


  const watchCourse = watch("course", false);
  const Delete = () => {
    Swal.fire({
      title: t("Do you want to delete this education ?"),
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: t("O'chirish"),
      denyButtonText: t("Rad etish"),
      denyButtonColor: "#000",
      confirmButtonColor: "#dc3545"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: Action.EMPLOYEE_EDUCATION_DELETE.REQUEST,
          payload: {
            attributes: educationId,
            cb: {
              success: (nData, data) => {
                toast.dismiss();
                toast.success("Успешно", {
                  position: "top-right",
                  autoClose: 1000
                });
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              },
              fail: (e) => {
                toast.dismiss();
                toast.error("Ошибка", {
                  position: "top-right",
                  autoClose: 1000
                });
              }
            }
          }
        });
      }
    });
  };
  const updateBtn = () => {
    setIsUpdate(true);
    getEducationById(educationId);
  };
  const saveUpdate = (attributes) => {
    setLoading("update");
    attributes = {employeeId,...attributes};
    dispatch({
      type: Action.EMPLOYEE_EDUCATION_UPDATE.REQUEST,
      payload: {
        id,
        attributes,
        cb: {
          success: (nData, data) => {
            setLoading(false);
            toast.dismiss();
            toast.success("Успешно", {
              position: "top-right",
              autoClose: 1000
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          },
          fail: (e) => {
            setLoading(false);
            toast.dismiss();
            toast.error(get(e, "response.data.message"), {
              position: "top-right",
              autoClose: 1000
            });
          }
        }
      }
    });
  };

  useEffect(() => {
    const pageClickEventDropdown = (e) => {
      if (
        educationRef.current !== null &&
        !educationRef.current.contains(e.target)
      ) {
        setEducationId(!educationId);
      }
    };

    if (educationId) {
      window.addEventListener("click", pageClickEventDropdown);
    }
    return () => {
      window.removeEventListener("click", pageClickEventDropdown);
    };
  }, [educationId]);
  const onSubmit = (data) => {
    create(employeeId,data);
  };

  const saveButton = (data={}) => {
    saveFinished(userId,data);
  }

  return (
    <div className="container-semiboxed">
      <Process process={4} />
      <form
        className="g-brd-around g-brd-gray-light-v4 g-pa-30 g-mb-30"
        onSubmit={handleSubmit(onSubmit)}
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
              params={{ required: true }}
              property={{ disabled: false }}
                column = {[2, 0]}
            />
          </div>

          <Label title={"Учёба по профилю"} column={2} />
          <div className="col-4">
            <ReSelect
                hideLabel
              register={register}
              name={"studyByProfile"}
              errors={errors}
              control={control}
              options={[
                { value: true, label: "Да" },
                { value: false, label: "Нет" }
              ]}
              params={{ required: true }}
              property={{ disabled: false }}
                column = {[2, 0]}
            />
          </div>
        </div>

        <div className="form-group row g-mb-25">
          <Label title={"Учебное заведение"} column={2} />
          <div className="col-4">
            <SelectAsyncPaginate
                hideLabel
              register={register}
              errors={errors}
              property={["id", "title", "id"]}
              name={"educationalInstitutionId"}
              url={"/educational-institution"}
              params={{ required: true }}
              control={control}
                column = {[2, 0]}
              onChange={setValue} />
          </div>
          <Label title={"Специальность"} column={2} />
          <div className="col-4">
            <SelectAsyncPaginate
                hideLabel
              register={register}
              errors={errors}
              property={["id", "title", "id"]}
              name={"specialityId"}
              url={"/speciality"}
              params={{ required: true }}
              control={control}
                column = {[2, 0]}
              onChange={setValue} />
          </div>
        </div>

        <div className="form-group row g-mb-25">
          <Label title={"Квалификация по диплому"} column={2} />
          <div className="col-4">
            <SelectAsyncPaginate
                hideLabel
              register={register}
              errors={errors}
              property={["id", "title", "id"]}
              name={"diplomaQualificationId"}
              url={"/diploma-qualification"}
              params={{ required: true }}
              control={control}
                column = {[2, 0]}
              onChange={setValue} />
          </div>
          <Label title={"Форма обучения"} column={2} />
          <div className="col-4">
            <SelectAsyncPaginate
                hideLabel
              register={register}
              errors={errors}
              property={["id", "title", "id"]}
              name={"formStudyId"}
              params={{ required: true }}
              url={"/form-study"}
              control={control}
                column = {[2, 0]}
              onChange={setValue} />
          </div>
        </div>
        <div className="form-group row g-mb-25">
          <Label title={"Факультет"} column={2} />
          <div className="col-10">
            <SelectAsyncPaginate
                hideLabel
              register={register}
              errors={errors}
              asyncSelectProperty={["id", "title", "id"]}
              name={"facultyId"}
              url={"/faculty"}
              params={{ required: true }}
              control={control}
                column = {[2, 0]}
              onChange={setValue} />
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
                column = {[2, 0]}
              params={{ required: true }}
              property={{ disabled: false }}
            />
          </div>

        </div>

        {!watchCourse && (
          <>
            <div className="form-group row g-mb-25">
              <Label title={"Дата окончания"} column={2} />
              <div className="col-4">
                <DatePicker
                    hideLabel
                  register={register}
                  name={"expirationDate"}
                  errors={errors}
                  control={control}
                    column = {[2, 0]}
                  params={{ required: false }}
                  property={{ disabled: false }}
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
                    column = {[2, 0]}
                  params={{ required: false }}
                  property={{ disabled: false }}
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
                    column = {[2, 0]}
                  params={{ required: false }}
                  property={{ disabled: false }}
                />
              </div>
            </div>
          </>
        )}

        <div className="form-group row g-mb-25">
          <div className="col-1 offset-2">
            <button
              type="submit"
              className="btn btn-md u-btn-primary rounded-0"
            >
              {isEqual(isLoading, "create") ? <LoaderMini /> : "Add"}
            </button>
          </div>
          <button
            onClick={updateBtn}
            type="button"
            className="btn btn-md u-btn-primary rounded-0"
            disabled={!educationId}
          >
            Update
          </button>
          <button
            onClick={Delete}
            type="button"
            className="btn btn-md u-btn-danger rounded-0 ml-4"
            disabled={!educationId}
          >
            Remove
          </button>
        </div>

        {!isEmpty(education) ? (
          <div ref={educationRef}>
            <TableBase
              head={[
                "№",
                "Тип образования",
                "Учебное заведение",
                "Дата поступления",
                "Дата окончания",
                "Специальность по диплома"
              ]}
              hideIcon={true}
            >
              {education.map((edu, i) => {
                return (
                  <tr
                    key={get(edu, "id")}
                    className={classNames("mode-dark pointer", {
                      bg_active: isEqual(educationId, get(edu, "id"))
                    })}
                    onClick={() => {
                      setEducationId(get(edu, "id"));
                      setId(get(edu, "id"));
                    }}
                  >
                    <td>{i + 1}</td>
                    <td>{get(edu, "level")}</td>
                    <td>{get(edu, "educationalInstitution.title")}</td>
                    <td>{get(edu, "receiptDate")}</td>
                    <td>
                      {!isNil(get(edu, "expirationDate", ""))
                        ? get(edu, "expirationDate", "")
                        : "Tugallanmagan"}
                    </td>
                    <td>{get(edu, "speciality.title")}</td>
                  </tr>
                );
              })}
            </TableBase>
          </div>
        ) : (
          <p className="text-center">No data</p>
        )}

        <div className="text-right g-mt-25">
          <button
              type="button"
              onClick={saveButton}
              className="btn btn-md u-btn-darkgray rounded-0 g-py-12 g-px-25 btn-block"
          >
            <span>{t("Save and Next")}</span>
          </button>
        </div>
      </form>
      <ToastContainer />

      {isUpdate && (
        <Modal
          onSave={saveUpdate}
          resultById={educationById}
          setIsUpdate={setIsUpdate}
          isFetched={isFetchedById}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default withTranslation("HRMS")(EmployeeEducation);
