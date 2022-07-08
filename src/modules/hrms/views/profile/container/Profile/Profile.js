import React, {useEffect} from "react";
import {connect} from "react-redux";
import EmployeesScheme from "../../../../../../schema/Employees";
import {get, isEqual, isNil, isNull} from "lodash";
import {withTranslation} from "react-i18next";
import VerticalTab from "../../components/Sidebar/VerticalTab";
import ProfileInfo from "./components/ProfileInfo";
import PassportInfo from "./components/PassportInfo";
import HistoryPositionInfo from "./components/HistoryPositionInfo";
import TaxInfo from "./components/TaxInfo";
import EducationInfo from "./components/EducationInfo";
import RelationInfo from "./components/RelationInfo";
import VaccineCertificate from "./components/VaccineCertificate";
import ConvictionInfo from "./components/ConvictionInfo";
import PsychoInfo from "./components/PsychoInfo";
import NarcoInfo from "./components/NarcoInfo";
import IabsInfo from "./components/IabsInfo";
import CvInfo from "./components/CvInfo";
import AuthActions from "../../../../../../services/auth/actions";
import Normalizer from "../../../../../../services/normalizer";
import ApiActions from "../../../../../../services/api/Actions";
import Loader from "react-spinners/PuffLoader";
import Settings from "../Settings/Settings";
import ProfileConsumer from "../../../../../../context/profile/ProfileConsumer";
import man1 from "../../../../../../assets/profile/man1.svg";
import woman1 from "../../../../../../assets/profile/woman1.svg";
import WorkReference from "./components/WorkReference";
import Actions from "../../../../Actions";

const Profile = ({
                     user,
                     t,
                     drawToRender,
                     entities,
                     isFetched,
                     employeeProfileImageResult,
                     isFetchedEmployeeProfileImage,
                     reloadInfoFromIabsRequest,
                     getEmployeePositionProfileInfo,
                     profileInfo,
                     relatives,
                     ...rest
                 }) => {

    const result = Normalizer.Denormalize(
        profileInfo,
        {result: EmployeesScheme},
        entities
    );
    const avatar =
        isNull(get(user, "avatar"))
            ?
            isNull(get(user, "avatarIconType")) || isEqual(get(result, "result.employeesPassport.gender"), "MALE")
                ? man1 : woman1 :
            get(user, "avatar");
    useEffect(() => {
        getEmployeePositionProfileInfo();
    }, []);

    return (
        <div
            style={{
                position: "relative",
            }}
        >

            {!get(result, "isFetched", false) ? (
                <div
                    style={{
                        position: "absolute",
                        top: "330px",
                        left: "40%",
                    }}
                >
                    <Loader/>
                </div>
            ) : (
                <ProfileConsumer>
                    {({isFetched, changeAvatar}) => (
                        <VerticalTab
                            avatar={avatar}
                            isFetched={isFetched}
                            ChangeAvatar={changeAvatar}
                            user={get(result, "result", {})}
                            // gender={get(result, "employeesPassport.gender")}

                            titles={[
                                {title: t("Profile"), icon: "icon-cursor"},
                                {
                                    title: t("Info"),
                                    icon: "icon-home",
                                },
                                {title: t("Position Info"), icon: "icon-briefcase"},
                                {
                                    title: t("Tax Info"),
                                    icon: "icon-cursor",
                                },
                                {title: t("Education Info"), icon: "icon-notebook"},
                                {
                                    title: t("Relation Info"),
                                    icon: "icon-user",
                                },
                                {
                                    title: t("Vaccine certificate"),
                                    icon: "hs-admin-receipt",
                                },
                                {
                                    title: t("Conviction info"),
                                    icon: "hs-admin-receipt",
                                },
                                {
                                    title: t("Psycho info"),
                                    icon: "hs-admin-user",
                                },
                                {
                                    title: t("Narcology info"),
                                    icon: "hs-admin-receipt",
                                },
                                {
                                    title: t("IABS info"),
                                    icon: "hs-admin-user",
                                },
                                {
                                    title: t("CV"),
                                    icon: "hs-admin-receipt",
                                },
                                {
                                    title: t("Work reference"),
                                    icon: "hs-admin-receipt",
                                },
                                {
                                    title: t("Settings"),
                                    icon: "hs-admin-settings",
                                },
                            ]}
                            texts={[
                                <ProfileInfo
                                    avatar={avatar}
                                    user={get(result, "result", {})}
                                    profile={user}
                                />,
                                <PassportInfo user={get(result, "result", {})}/>,
                                <HistoryPositionInfo user={get(result, "result", {})}/>,
                                <TaxInfo user={get(result, "result", {})}/>,
                                <EducationInfo
                                    education={get(result, "result.employeesQualifications", [])}
                                    user={get(result, "result", {})}
                                />,
                                <RelationInfo
                                    id={get(result, "id", null)}
                                    relatives={get(result, "result.employeesRelatives", [])}
                                />,
                                <VaccineCertificate user={get(result, "result", {})}/>,
                                <ConvictionInfo user={get(result, "result", {})}/>,
                                <PsychoInfo user={get(result, "result", {})}/>,
                                <NarcoInfo user={get(result, "result", {})}/>,
                                <IabsInfo reloadInfoFromIabsRequest={reloadInfoFromIabsRequest} user={get(result, "result", {})}/>,
                                <CvInfo user={get(result, "result", {})}/>,
                                <WorkReference user={get(result, "result", {})}/>,
                                <Settings employee={get(result, "result", {})}/>,
                            ]}
                        />
                    )}
                </ProfileConsumer>
            )}
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        drawToRender: get(state, "normalizer.data.employees.result", []),
        entities: get(state, "normalizer.entities", {}),
        isFetched: get(state, "authCheck.isFetched", false),
        user: get(state, "authCheck.user", {}),
        profileInfo: get(
            state,
            "normalizer.data.get-employee-information-view-data",
            {}
        ),
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        checkAuth: () => {
            dispatch({
                type: AuthActions.CHECK_AUTH.REQUEST,
            });
        },
        getEmployeePositionProfileInfo: () => {
            const storeName = "get-employee-information-view-data";
            const entityName = "employees";
            const scheme = EmployeesScheme;
            dispatch({
                type: ApiActions.GET_ONE.REQUEST,
                payload: {
                    url: `/employees/current-user-employee`,
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
        reloadInfoFromIabsRequest: ({ id, cb }) => {
            dispatch({
                type: Actions.RELOAD_EMPLOYEE_INFO_FROM_IABS.REQUEST,
                payload: {
                    id,
                    cb,
                },
            });
        },
    };
};
export default withTranslation("HRMS")(
    connect(mapStateToProps, mapDispatchToProps)(Profile)
);
