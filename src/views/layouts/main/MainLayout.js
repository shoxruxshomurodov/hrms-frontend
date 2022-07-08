import React, {Component} from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import LogOutAlert from "../../../components/Sweetalerts/LogOut";
import HomeNotify from "../../../components/Sweetalerts/LogIn";
import AuthActions from "../../../services/auth/actions";
import Actions from "../../../modules/hrms/Actions";
import AuthModuleActions from "../../../modules/auth/Actions";
import NormalizerAction from "../../../services/normalizer/actions";
import {get, isNull} from "lodash";
import storage from "../../../services/storage";
import Api from "../../../modules/hrms/Api";
import SuccessNotify from "../../../components/Sweetalerts/SuccessNotify";
import ErrorNotify from "../../../components/Sweetalerts/ErrorNotify";
import {ToastContainer} from "react-toastify";
import {withTranslation} from "react-i18next";
import ApiActions from "../../../services/api/Actions";
import Task from "../../../schema/Task";
import Normalizer from "../../../services/normalizer";


class MainLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logOut: false,
        };
    }

    componentDidMount() {
        const {trigger, getTaskList, user} = this.props;
        trigger();
        // getTaskList(get(user, 'accessQueryBpms', []));
    }

    logOut = () => {
        this.setState({logOut: true});
    };
    notLogOut = () => {
        this.setState({logOut: false});
    };

    changeUrl = (lang) => {
        const {changeLang, getTranslations} = this.props;
        changeLang(lang);
        getTranslations(lang);
    };

    AvatarIconType = (avatarIconType) => {
        const {checkAuth} = this.props;
        this.setState({isFetched: true});
        Api.avatarIconType(avatarIconType)
            .then((_res) => {
                this.setState({isFetched: false});
                SuccessNotify("Изображение было успешно загружено");
                setTimeout(() => {
                    checkAuth();
                }, 1500);
            })
            .catch((e) => {
                this.setState({isFetched: true});
                ErrorNotify("Изображение не загружено");
            });
    };

    openSidebar = () => {
        let {sidebarRequest, isSidebarOpen = true} = this.props;
        isSidebarOpen = !isSidebarOpen;
        sidebarRequest(isSidebarOpen);
    }


    render() {
        let {
            t,
            children,
            logoutAuth,
            user,
            isFetchedWelcome,
            lang,
            isFetchedInitial,
            isSidebarOpen,
            entities,
            tasks
        } = this.props;
        tasks = Normalizer.Denormalize(tasks, {content: [Task]}, entities);
        const {logOut} = this.state;
        return (
            <div className={`layout-column ${storage.get("mode")}`}>
                <Header
                    lang={lang}
                    changeUrl={this.changeUrl}
                    user={user}
                    logOut={this.logOut}
                    openSidebar={this.openSidebar}
                    sidebarIsOpen={isSidebarOpen}
                    tasks={tasks}
                />
                <main className="container-fluid px-0 g-pt-65">
                    <div className="row no-gutters g-pos-rel g-overflow-x-hidden">
                        <Sidebar sidebarIsOpen={isSidebarOpen}/>
                        <div className="col g-ml-45 g-ml-0--lg g-pb-65--md">
                            <div className="g-pa-20 dark-theme" style={{minHeight: "90vh"}}> {/* dark-theme */}
                                {children}
                            </div>
                            {isFetchedInitial && <HomeNotify title={t("Добро пожаловать в нашу систему")}/>}
                            {logOut && (
                                <LogOutAlert
                                    logoutAuth={logoutAuth}
                                    notLogOut={this.notLogOut}
                                />
                            )}
                            {!isNull(get(user, "avatarIconType", null)) &&
                                isFetchedWelcome && (
                                    <HomeNotify title="Добро пожаловать в нашу систему"/>
                                )}
                            <Footer/>
                        </div>
                    </div>
                </main>
                {/* {isNull(get(user, "avatarIconType", null)) && (
          <SelectAvatars AvatarIconType={this.AvatarIconType} user={user} />
        )} */}
                <ToastContainer/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: get(state, "authCheck.user", null),
        isFetched: get(state, "authCheck.isFetched", false),
        isFetchedWelcome: get(state, "normalizer.data.welcome.isFetched", false),
        isFetchedInitial: get(state, "auth.welcome", false),
        mode: get(state, "hrms.mode", storage.get("mode")),
        isSidebarOpen: get(state, "hrms.isSidebarOpen", true),
        lang: get(
            state,
            "hrms.lang",
            storage.get("lang") ? storage.get("lang") : "ru"
        ),
        tasks: get(state, 'normalizer.data.current-tasks-list.result', {}),
        entities: get(state, 'normalizer.entities', {})
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        sidebarRequest: (value) => {
            dispatch({
                type: AuthModuleActions.SET_SIDEBAR_CONDITION.REQUEST, payload: value
            })
        },
        logoutAuth: () => {
            dispatch({
                type: AuthActions.LOGOUT_AUTH.REQUEST
            });
        },
        changeLang: (lang) => {
            dispatch({
                type: Actions.CHANGE_LANG.REQUEST,
                payload: {lang}
            });
        },
        getTranslations: (lang) => {
            dispatch({
                type: Actions.GET_TRANSLATIONS.REQUEST,
                payload: {lang}
            });
        },
        trigger: () => {
            dispatch({
                type: NormalizerAction.NORMALIZE.TRIGGER,
                payload: {
                    storeName: "welcome"
                }
            });
        },
        checkAuth: () => {
            dispatch({
                type: AuthActions.CHECK_AUTH.REQUEST
            });
        },
        getTaskList: (authorities) => {
            const storeName = "current-tasks-list";
            const entityName = "task";
            const scheme = {content: [Task]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: `tasks-user/list-full2`,
                    scheme,
                    storeName,
                    entityName,
                    config: {
                        searchCriteria: {
                            types: ["WAITING"],
                            authorities
                        },
                        page: {}
                    },
                    baseUrl: 'bpmn',
                    method: 'post'
                }
            });
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(withTranslation("HRMS")(MainLayout)));
