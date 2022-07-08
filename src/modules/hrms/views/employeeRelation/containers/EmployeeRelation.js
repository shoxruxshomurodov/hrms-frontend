import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { get, isEmpty, isEqual } from "lodash";
import Input from "../../../../../containers/Form/component/Inputs/Input";
import Reselect from "../../../../../containers/Form/component/Select/SelectAsync";
import InputMask from "../../../../../containers/Form/component/Inputs/InputMask";
import Label from "../../../../../components/Common/Label";
import TableBase from "../../../../../components/Table/TableBase";
import { withTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import RelativesScheme from "../../../../../schema/Relatives";
import ApiActions from "../../../../../services/api/Actions";
import Normalizer from "../../../../../services/normalizer";
import Actions from "../../../Actions";
import { toast } from "react-toastify";
import LoaderMini from "../../../../../components/Loader/LoaderMini";
import Swal from "sweetalert2";
import classNames from "classnames";
import Modal from "../../employeeInformation/component/Modal/ModalRelation";
const EmployeeRelation = (props) => {
  const dispatch = useDispatch();
  const { t ,isFetched,setIsFetched,create,userId } = props;
  const [relativeId, setRelativeId] = useState(null);
  const [id, setId] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const relativeRef = useRef(false);

  const relatives = useSelector((state) =>
    get(state, "normalizer.data.relatives.result", [])
  );
  const relativeById = useSelector((state) =>
    get(state, "normalizer.data.relative-by-id.result", [])
  );
  const isFetchedById = useSelector((state) =>
    get(state, "normalizer.data.relative-by-id.isFetched", false)
  );
  const isFetchedProps = useSelector((state) =>
    get(state, "normalizer.data.relatives.isFetched", false)
  );
  const entities = useSelector((state) =>
    get(state, "normalizer.entities", [])
  );
  let result = Normalizer.Denormalize(relatives, [RelativesScheme], entities);
  let resultById = Normalizer.Denormalize(
    relativeById,
    RelativesScheme,
    entities
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm();
  const getRelativeById = (id) => {
    const storeName = "relative-by-id";
    const entityName = "relatives";
    const scheme = RelativesScheme;
    dispatch({
      type: ApiActions.GET_ONE.REQUEST,
      payload: {
        url: `employeesRelatives/${id}`,
        scheme,
        storeName,
        entityName
      }
    });
  };
  const Delete = () => {
    Swal.fire({
      title: t("Do you want to delete this relatives ?"),
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: t("O'chirish"),
      denyButtonText: t("Rad etish"),
      denyButtonColor: "#000",
      confirmButtonColor: "#dc3545"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: Actions.EMPLOYEE_RELATION_DELETE.REQUEST,
          payload: {
            attributes: relativeId,
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

  const update = () => {
    setIsUpdate(true);
    getRelativeById(relativeId);
  };
  const saveUpdate = (attributes) => {
    setIsFetched("update");
    dispatch({
      type: Actions.EMPLOYEE_RELATION_UPDATE.REQUEST,
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
              window.location.reload();
            }, 1000);
          },
          fail: (e) => {
            setIsFetched(false);
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
        relativeRef.current !== null &&
        !relativeRef.current.contains(e.target)
      ) {
        setRelativeId(!relativeId);
      }
    };

    if (relativeId) {
      window.addEventListener("click", pageClickEventDropdown);
    }
    return () => {
      window.removeEventListener("click", pageClickEventDropdown);
    };
  }, [relativeId]);
  const onSubmit = (data) => {
    const {
      passport_series,
      passport_number,
      relationship,
      personalIdentificationNumber
    } = data;
    const passport = passport_series + passport_number;
    const dataCreate = { passport, relationship, personalIdentificationNumber };
    create(userId,dataCreate);
  };
  // if (!isFetchedProps) {
  //   return <Loader />;
  // }
  return (
    <div>
      <form
        className="g-brd-around g-brd-gray-light-v4 g-pa-30 g-mb-30"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="form-group row g-mb-25">
          <Label title={"Степень родства"} />
          <div className="col-4">
            <Reselect
              register={register}
              name={"relationship"}
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
              params={{ required: true }}
              property={{ disabled: false }}
            />
          </div>
        </div>
        <div className="form-group row g-mb-25">
          <Label title={"Серия паспорта"} column={2} />
          <div className="col-4">
            <InputMask
              register={register}
              mask="aa"
              name={"passport_series"}
              errors={errors}
              control={control}
              params={{ required: true }}
              property={{ disabled: false }}
            />
          </div>
          <Label title={"Номер паспорта"} column={2} />
          <div className="col-4">
            <InputMask
              register={register}
              name={"passport_number"}
              mask="9999999"
              errors={errors}
              control={control}
              params={{ required: true }}
              property={{ disabled: false }}
            />
          </div>
        </div>
        <div className="form-group row g-mb-25">
          <Label title="ИНПС" />
          <div className="col-4">
            <Input
              register={register}
              name={"personalIdentificationNumber"}
              placeholder={"INPS"}
              errors={errors}
              control={control}
              type="number"
              params={{ required: true }}
              property={{ disabled: false }}
            />
          </div>
        </div>
        <div className="form-group row g-mb-25">
          <div className="col-1 offset-2">
            <button type="submit" className="btn btn-md u-btn-blue rounded-0">
              {isEqual(isFetched, "create") ? <LoaderMini /> : t("Add")}
            </button>
          </div>
          <button
            onClick={update}
            type="button"
            className="btn btn-md u-btn-primary rounded-0"
            disabled={!relativeId}
          >
            Update
          </button>
          <button
            onClick={Delete}
            type="button"
            className="btn btn-md u-btn-danger rounded-0 ml-4"
            disabled={!relativeId}
          >
            Remove
          </button>
        </div>

        {!isEmpty(result) ? (
          <div ref={relativeRef}>
            <TableBase
              head={[
                "№",
                "Степень родства",
                "Фамилия",
                "Имя",
                "Отчество",
                "Дата рождения",
                "Место рождения",
                "Адрес",
                "Рабочее место"
              ]}
            >
              {result.map((r, i) => {
                return (
                  <tr
                    key={get(r, "id")}
                    className={classNames("mode-dark pointer", {
                      bg_active: isEqual(relativeId, get(r, "id"))
                    })}
                    onClick={() => {
                      setRelativeId(get(r, "id"));
                      setId(get(r, "id"));
                    }}
                  >
                    <td>{i + 1}</td>
                    <td>{get(r, "relationship")}</td>
                    <td>{get(r, "lastname")}</td>
                    <td>{get(r, "firstname")}</td>
                    <td>{get(r, "patronymic")}</td>
                    <td>{get(r, "birthdate")}</td>
                    <td>{get(r, "birthplace")}</td>
                    <td>{get(r, "address")}</td>
                    <td>{get(r, "workplace")}</td>
                  </tr>
                );
              })}
            </TableBase>
          </div>
        ) : (
          <p className="text-center">No Relatives</p>
        )}
      </form>
      {isUpdate && (
        <Modal
          onSubmit={saveUpdate}
          resultById={resultById}
          setIsUpdate={setIsUpdate}
          isFetched={isFetchedById}
          isLoading={isFetched}
        />
      )}
    </div>
  );
};

export default withTranslation("HRMS")(EmployeeRelation);
