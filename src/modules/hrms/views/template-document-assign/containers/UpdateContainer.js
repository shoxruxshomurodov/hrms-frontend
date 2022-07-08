import React, {memo, useEffect} from 'react';
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import Breadcrumb from "../../../../../components/Breadcrumb";
import Form from "../../../../../containers/Form/Form";
import CustomButton from "../../../../../containers/Form/component/Common/Button";
import ApiActions from "../../../../../services/api/Actions";
import {toast} from "react-toastify";
import {entries, get, head, last, split} from "lodash";
import Normalizer from "../../../../../services/normalizer";
import Loader from "../../../../../components/Loader";
import VacancyScheme from "../../../../../schema/VacancyScheme";
import VacationGraphic from "../../../../../schema/VacationGraphic";

const UpdateContainer = ({
                             t,
                             id,
                             column,
                             vacationGraphicUpdateRequest,
                             getVacationGraphicRequest,
                             entities,
                             vacationGraphic,
                             ...rest
                         }) => {


    useEffect(() => {
        getVacationGraphicRequest(id);
    }, [id])

    vacationGraphic = Normalizer.Denormalize(vacationGraphic, {result: VacationGraphic}, entities);


    const update = (data) => {
        const {date, ...rest} = data;
        vacationGraphicUpdateRequest({
            id,
            attributes: {...rest, month: last(split(date, "-")), year: head(split(date, "-"))},
            formMethods: {},
            cb: {
                success: (nData, data) => {
                    toast.dismiss();
                    toast.success("Успешно", {
                        position: "top-right",
                        autoClose: 1000
                    });
                    setTimeout(() => {
                        window.history.back();
                    }, 1000);
                },
            }
        })
    };


    const values = [
        {
            id: 1,
            label: t("Date"),
            name: "date",
            defaultValue: `${get(vacationGraphic, 'result.year')}-${get(vacationGraphic, 'result.month')}`,
            type: "datepicker",
            dateType: "month",
            params: {required: true}
        }

    ];

    if (!get(vacationGraphic, 'isFetched', false)) {
        return <Loader/>;
    }

    return (
        <>
            <Breadcrumb
                titles={[
                    {id: 1, title: t("Vacation graphic"), url: "/VacationGraphic"},
                    {id: 3, title: t("Update"), url: ""}
                ]}
            />
            <Form
                formRequest={update}
                values={values}
                cancelLink={"/VacationGraphic"}
                buttonText={t("Save")}
                CustomButton={CustomButton}
                isFetched={true}
                params={{required: false}}
                property={{disabled: false}}
                column={column ?? [2, 6]}
            />
        </>
    );
};

const makeMapStateToProps = (state) => {
    return {
        entities: get(state, 'normalizer.entities', {}),
        vacationGraphic: get(state, 'normalizer.data.VacationGraphic', {}),
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        vacationGraphicUpdateRequest: ({
                                           id,
                                           attributes,
                                           url = 'vacation-graphic',
                                           formMethods = {},
                                           scheme = VacationGraphic,
                                           storeName = 'VacationGraphic',
                                           entityName = 'VacationGraphic',
                                           cb
                                       }) => {
            dispatch({
                type: ApiActions.OPERATION_UPDATE.REQUEST,
                payload: {
                    attributes,
                    url: `${url}/${id}`,
                    formMethods,
                    scheme,
                    storeName,
                    entityName,
                    cb
                }
            });
        },
        getVacationGraphicRequest: (id) => {
            const storeName = "VacationGraphic";
            const entityName = "VacationGraphic";
            const scheme = VacationGraphic;
            dispatch({
                type: ApiActions.GET_ONE.REQUEST,
                payload: {
                    url: `vacation-graphic/${id}`,
                    scheme,
                    storeName,
                    entityName
                }
            });
        },

    }
}


export default withTranslation("HRMS")(connect(makeMapStateToProps, mapDispatchToProps)(memo(UpdateContainer)));