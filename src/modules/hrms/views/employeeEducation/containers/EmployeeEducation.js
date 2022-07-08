import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { withTranslation } from "react-i18next";
import Input from "../../../../../containers/Form/component/Inputs/Input";
import ReSelect from "../../../../../containers/Form/component/Select/SelectAsync";
import SelectAsyncPaginate from "../../../../../containers/Form/component/Select/SelectAsyncPagination";
import DatePicker from "../../../../../containers/Form/component/Inputs/DatePicker";
import Label from "../../../../../components/Common/Label";
import TableBase from "../../../../../components/Table/TableBase";
import { useDispatch, useSelector } from "react-redux";
import EducationScheme from "../../../../../schema/Education";
import ApiActions from "../../../../../services/api/Actions";
import Normalizer from "../../../../../services/normalizer";
import Action from "../../../Actions";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import { get, isEmpty, isEqual, isNil } from "lodash";
import LoaderMini from "../../../../../components/Loader/LoaderMini";
import Modal from "../../employeeInformation/component/Modal/ModalEducation";
import classNames from "classnames";
const EmployeeEducation = (props) => {
  const [educationId, setEducationId] = useState(null);
  const [id, setId] = useState(null);
  const educationRef = useRef(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const { t,isLoading,setLoading,create} = props;
  const dispatch = useDispatch();
  const entities = useSelector((state) =>
    get(state, "normalizer.entities", {})
  );
  let education = useSelector((state) =>
    get(state, "normalizer.data.education.result", [])
  );
  let educationById = useSelector((state) =>
    get(state, "normalizer.data.education-by-id.result", [])
  );

  educationById = Normalizer.Denormalize(
    educationById,
    EducationScheme,
    entities
  );


  const isFetchedById = useSelector((state) =>
    get(state, "normalizer.data.education-by-id.isFetched", false)
  );
  education = Normalizer.Denormalize(education, [EducationScheme], entities);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    setValue
  } = useForm();
  const getEducationById = (id) => {
    const storeName = "education-by-id";
    const entityName = "education";
    const scheme = EducationScheme;
    dispatch({
      type: ApiActions.GET_ONE.REQUEST,
      payload: {
        url: `employeesEducation/${id}`,
        scheme,
        storeName,
        entityName
      }
    });
  };

  const getEducationsId = () => {
    const {id} = props;
    const storeName = "education";
    const entityName = "education";
    const scheme = [EducationScheme];
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: `employeesEducation/getByEmployeeId/${id}`,
        scheme,
        storeName,
        entityName
      }
    });
  };



  useEffect(() => {
    getEducationsId()
  }, []);
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
              success: () => {
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
    dispatch({
      type: Action.EMPLOYEE_EDUCATION_UPDATE.REQUEST,
      payload: {
        id,
        attributes,
        cb: {
          success: () => {
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
    create(data);
  };
  return (
    <div>
      <form
        className="g-brd-around g-brd-gray-light-v4 g-pa-30 g-mb-30"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-group row g-mb-25">
          <Label title={"Тип образования"} column={2} />
          <div className="col-4">
            <ReSelect
              register={register}
              name={"type"}
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
            />
          </div>

          <Label title={"Учёба по профилю"} column={2} />
          <div className="col-2">
            <ReSelect
              register={register}
              name={"isStudyByProfile"}
              errors={errors}
              control={control}
              options={[
                { value: true, label: "Да" },
                { value: false, label: "Нет" }
              ]}
              params={{ required: true }}
              property={{ disabled: false }}
            />
          </div>
        </div>

        <div className="form-group row g-mb-25">
          <Label title={"Учебное заведение"} column={2} />
          <div className="col-4">
             <SelectAsyncPaginate
                register={register}
                control={control}
                errors={errors}
                property={["id", "title", "id"]}
                name={"educationalInstitutionId"}
                url={"/educational-institution"}
                onChange={setValue}/>
          </div>
          <Label title={"Специальность"} column={2} />
          <div className="col-4">
            <SelectAsyncPaginate
                register={register}
                control={control}
                errors={errors}
                property={["id", "title", "id"]}
                name={"specialityId"}
                url={"/speciality"}
                onChange={setValue}/>
          </div>
        </div>

        <div className="form-group row g-mb-25">
          <Label title={"Квалификация по диплому"} column={2} />
          <div className="col-4">
            <SelectAsyncPaginate
                register={register}
                control={control}
                errors={errors}
                property={["id", "title", "id"]}
                name={"diplomaQualificationId"}
                url={"/diploma-qualification"}
                onChange={setValue}/>

          </div>
          <Label title={"Форма обучения"} column={2} />
          <div className="col-4">
            <SelectAsyncPaginate
                register={register}
                control={control}
                errors={errors}
                asyncSelectProperty={["id", "title", "id"]}
                name={"formStudyId"}
                url={"/form-study"}

                onChange={setValue}/>
          </div>
        </div>
        <div className="form-group row g-mb-25">
          <Label title={"Факультет"} column={2} />
          <div className="col-10">
            <SelectAsyncPaginate
                register={register}
                control={control}
                errors={errors}
                property={["id", "title", "id"]}
                name={"facultyId"}
                url={"/faculty"}
                onChange={setValue} />
          </div>
        </div>

        <div className="form-group row g-mb-25">
          <Label title={"Дата поступления"} column={2} />
          <div className="col-4">
            <DatePicker
              register={register}
              name={"receiptDate"}
              control={control}
              errors={errors}
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
                  register={register}
                  name={"expirationDate"}
                  control={control}
                  errors={errors}
                  params={{ required: false }}
                  property={{ disabled: false }}
                />
              </div>
            </div>

            <div className="form-group row g-mb-25">
              <Label title={"Дата регистрации диплома"} column={2} />
              <div className="col-4">
                <DatePicker
                  register={register}
                  name={"diplomaRegistrationDate"}
                  errors={errors}
                  control={control}
                  params={{ required: false }}
                  property={{ disabled: false }}
                />
              </div>
              <Label title={"Номер диплома"} column={2} />
              <div className="col-4">
                <Input
                  register={register}
                  name={"diplomaNumber"}
                  errors={errors}
                  control={control}
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
                    <td>{get(edu, "type")}</td>
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
