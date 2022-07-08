import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import classNames from "classnames";
import {get, isEqual, isNull, slice} from "lodash";
import Utils from "../../../../../services/helpers/Utils";
import {FiMoon, FiSun} from "react-icons/fi";
import storage from "../../../../../services/storage";
import Actions from "../../../../../modules/hrms/Actions";
import uz from "../../../../../assets/uz.png";
import ru from "../../../../../assets/ru.svg";
import en from "../../../../../assets/en.png";
import DropDown from "../../../../../components/Dropdown/Dropdown";
import {withTranslation} from "react-i18next";
import hrLogo from "../../../../../assets/Hr.svg";
import miniLogo from "../../../../../assets/images/mini-logo.svg";
import AutoCompleteSearch from "../../../../../components/AutoCompleteSearch";
import man1 from "../../../../../assets/profile/man1.svg";
import woman1 from "../../../../../assets/profile/woman1.svg";
import Normalizer from "../../../../../services/normalizer";
import EmployeesScheme from "../../../../../schema/Employees";
import moment from "moment";

const Header = ({
                    openSidebar = () => {
                    }, sidebarIsOpen = true, tasks = {}, ...props
                }) => {
    const mode_state = useSelector((state) =>
        get(state, "hrms.mode", storage.get("mode"))
    );
    const [mode, setMode] = useState(mode_state || "light");
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const [dropdown, setDropdown] = useState(false);
    const [dropdownProfile, setDropdownProfile] = useState(false);
    const dropdownMenuRef = useRef(null);
    const dropdownProfileRef = useRef(null);
    const dropdownRef = useRef(null);
    const entities = useSelector((state) =>
        get(state, "normalizer.entities", {})
    );
    const user = useSelector((state) => get(state, "authCheck.user", {}));
    let employee = useSelector((state) => get(state, "normalizer.data.get-employee-information-view-data.result", {}));
    employee = Normalizer.Denormalize(employee, EmployeesScheme, entities);
    useEffect(() => {
        const pageClickEvent = (e) => {
            if (
                dropdownRef.current !== null &&
                !dropdownRef.current.contains(e.target)
            ) {
                setShow(!show);
            }
        };
        const pageClickEventDropdown = (e) => {
            if (
                dropdownMenuRef.current !== null &&
                !dropdownMenuRef.current.contains(e.target)
            ) {
                setDropdown(!dropdown);
            }
        };
        const pageClickEventDropdownProfile = (e) => {
            if (
                dropdownProfileRef.current !== null &&
                !dropdownProfileRef.current.contains(e.target)
            ) {
                setDropdownProfile(!dropdownProfile);
            }
        };

        if (show) {
            window.addEventListener("click", pageClickEvent);
        }
        if (dropdown) {
            window.addEventListener("click", pageClickEventDropdown);
        }
        if (dropdownProfile) {
            window.addEventListener("click", pageClickEventDropdownProfile);
        }
        return () => {
            window.removeEventListener("click", pageClickEvent);
            window.removeEventListener("click", pageClickEventDropdown);
            window.removeEventListener("click", pageClickEventDropdownProfile);
        };
    }, [show, dropdown, dropdownProfile]);
    const avatar =
        isNull(get(user, "avatar"))
            ?
            isNull(get(user, "avatarIconType")) || isEqual(get(user, "fidoGspIdentity.gender"), "1")
                ? man1 : woman1 :
            get(user, "avatar");
    const {lang, changeUrl, t} = props;
    return (
        <header id="js-header" className="u-header u-header--sticky-top">
            <div className="u-header__section dark-header u-header__section--admin-light g-min-height-65">
                <nav className="navbar no-gutters g-pa-0">
                    <div
                        className="col-auto d-flex dark-sidebar flex-nowrap u-header-logo-toggler g-py-12 align-items-center justify-content-between"
                        style={{
                            paddingLeft: sidebarIsOpen ? '1.07143rem !important' : '5px !important',
                            width: sidebarIsOpen ? '275px' : '75px'
                        }}>
                        {/* Logo */}
                        <Link
                            to={"/profile"}
                            className="navbar-brand d-flex align-self-center g-hidden-xs-down g-line-height-1 py-0 g-mt-5"
                        >
                            {sidebarIsOpen ? <img src={hrLogo} alt="hrlogo" style={{height: '45px'}}/> :
                                <img src={miniLogo} alt="hrlogo" style={{height: '43px'}}/>}
                        </Link>
                        {sidebarIsOpen && <i className={'hs-admin-align-left cursor-pointer'}
                                             style={{fontSize: '1.42857rem', color: '#000', cursor: 'pointer'}}
                                             onClick={() => openSidebar()}></i>}
                    </div>
                    {!sidebarIsOpen && <i className={'hs-admin-align-left cursor-pointer '}
                                          style={{
                                              fontSize: '1.42857rem',
                                              color: '#000',
                                              cursor: 'pointer',
                                              marginLeft: '5px'
                                          }}
                                          onClick={() => openSidebar()}></i>}

                    <AutoCompleteSearch/>
                    <div className="col-auto d-flex g-py-12 g-pl-40--lg ml-auto">
                        <DropDown
                            button={
                                <>
                  <span
                      className="u-badge-v1 g-top-7 g-right-7 g-width-18 g-height-18 g-bg-primary g-font-size-10 g-color-white rounded-circle p-0">
                    {get(tasks, 'totalElements', 0)}
                  </span>
                                    <i className="hs-admin-comment-alt g-absolute-centered"/>
                                </>
                            }
                        >
                            <div className="media u-header-dropdown-bordered-v1 g-pa-20">
                                <h4 className="d-flex align-self-center text-uppercase g-font-size-default g-letter-spacing-0_5 g-mr-20 g-mb-0">
                                    {get(tasks, 'totalElements', 0)} {t("new messages")}
                                </h4>
                                <div className="media-body align-self-center text-right">
                                    <Link to={"/task"} className="g-color-secondary" href="#">
                                        {t("View All")}
                                    </Link>
                                </div>
                            </div>
                            <ul className="p-0 mb-0">
                                {
                                    get(tasks, 'content', null) && slice(get(tasks, 'content', []), 0, 2).map((task, i) =>
                                        <li key={i} className="media g-pos-rel u-header-dropdown-item-v1 g-pa-20">
                                            <div className="d-flex g-mr-15 g-mt-1">
                                                {i + 1}.
                                            </div>
                                            <div className="media-body">
                                                <h5 className="g-font-size-16 g-font-weight-400 g-mb-5">
                                                    {get(task, 'processName')}
                                                </h5>
                                                <p className="g-mb-10">
                                                    {get(task, 'title')}
                                                </p>
                                                <em className="d-flex align-self-center align-items-center g-font-style-normal g-color-lightblue-v2">
                                                    <i className="fa fa-clock-o g-mr-5"/>{" "}
                                                    <small>{moment(get(task, 'createdAt')).format("DD-MM-YYYY MM:SS")}</small>
                                                </em>
                                            </div>
                                            <Link to={`/task/view/${get(task, 'id')}`} className="u-link-v2">
                                                Read
                                            </Link>
                                        </li>)
                                }

                            </ul>
                        </DropDown>


                        <div className="g-pos-rel g-hidden-sm-down">
                            <a className="d-block text-center u-header-icon-v1 g-pos-rel g-width-40 g-height-40 rounded-circle g-font-size-20">
                <span
                    className="header__lang text-uppercase d-inline-flex align-items-center"
                    onClick={() => setShow(!show)}
                    ref={dropdownRef}
                >
                  <img
                      src={
                          isEqual(lang, "ru") ? ru : isEqual(lang, "uz") ? uz : en
                      }
                      className="mt-2"
                  />
                    {show && (
                        <ul className="header__lang__dropdown">
                            {!isEqual(lang, "ru") && (
                                <li
                                    onClick={() => {
                                        setShow(false);
                                        changeUrl("ru");
                                    }}
                                >
                                    <span>РУС</span>
                                    <img src={ru}/>
                                </li>
                            )}
                            {!isEqual(lang, "uz") && (
                                <li
                                    onClick={() => {
                                        setShow(false);
                                        changeUrl("uz");
                                    }}
                                >
                                    <span>UZB</span> <img src={uz}/>
                                </li>
                            )}
                            {!isEqual(lang, "en") && (
                                <li
                                    onClick={() => {
                                        setShow(false);
                                        changeUrl("en");
                                    }}
                                >
                                    <span>ENG</span> <img src={en}/>
                                </li>
                            )}
                        </ul>
                    )}
                </span>
                            </a>
                        </div>
                        <div className="g-pos-rel g-hidden-sm-down">
                            <a className="d-block text-center  u-header-icon-v1 g-pos-rel g-width-40 g-height-40 rounded-circle g-font-size-20">
                                {isEqual(mode, "light") && (
                                    <FiSun
                                        size={22}
                                        onClick={() => {
                                            setMode("dark");
                                            setTimeout(() => {
                                                dispatch({
                                                    type: Actions.CHANGE_MODE.REQUEST,
                                                    payload: {mode: "dark"}
                                                });
                                            }, 300);
                                        }}
                                    />
                                )}
                                {isEqual(mode, "dark") && (
                                    <FiMoon
                                        size={22}
                                        onClick={() => {
                                            setMode("light");
                                            setTimeout(() => {
                                                dispatch({
                                                    type: Actions.CHANGE_MODE.REQUEST,
                                                    payload: {mode: "light"}
                                                });
                                            }, 300);
                                        }}
                                    />
                                )}
                            </a>
                        </div>
                        <div className="col-auto d-flex g-pt-5 g-pt-0--sm g-pl-10">
                            <div className="g-pos-rel g-px-10--lg">
                                <a
                                    onClick={() => setDropdownProfile(!dropdownProfile)}
                                    id="profileMenuInvoker"
                                    className={classNames("d-block", {
                                        active: dropdownProfile
                                    })}
                                >
                  <span className="g-pos-rel">
                    <span className="u-badge-v2--xs u-badge--top-right g-hidden-sm-up g-bg-secondary g-mr-5"/>
                    <img
                        className="g-width-30 g-width-40--md g-height-30 g-height-40--md rounded-circle g-mr-10--sm"
                        src={get(user, "avatar") ? get(user, "avatar") : avatar}
                        style={{objectFit: "cover"}}
                        alt="men"
                    />
                  </span>
                                    <span className="g-pos-rel g-top-2">
                    <span
                        className="g-hidden-sm-down"
                    >
                      {Utils.capitalizeFirstLetter(
                          get(employee, "employeesPassport.firstName", "")
                      )}{" "}
                        {Utils.capitalizeFirstLetter(
                            get(employee, "employeesPassport.middleName", "")
                        )}
                    </span>
                    <i className="hs-admin-angle-down g-pos-rel g-top-2 g-ml-10"/>
                  </span>
                                </a>

                                <ul
                                    id="profileMenu"
                                    ref={dropdownProfileRef}
                                    className={classNames(
                                        "g-pos-abs g-left-0 g-width-100x--lg g-nowrap g-font-size-14 g-py-20 g-mt-17 rounded u-dropdown--css-animation",
                                        {
                                            "u-dropdown--hidden": !dropdownProfile,
                                            fadeIn: dropdownProfile
                                        }
                                    )}
                                    aria-labelledby="profileMenuInvoker"
                                    style={{animationDuration: "300ms"}}
                                >
                                    <li className="g-hidden-sm-up g-mb-10">
                                        <a className="media g-py-5 g-px-20" href="#">
                      <span className="d-flex align-self-center g-pos-rel g-mr-12">
                        <span
                            className="u-badge-v1 g-top-minus-3 g-right-minus-3 g-width-18 g-height-18 g-bg-secondary g-font-size-10 g-color-white rounded-circle p-0">
                          10
                        </span>
                        <i className="hs-admin-comment-alt"/>
                      </span>
                                            <span className="media-body align-self-center">
                        Unread Messages
                      </span>
                                        </a>
                                    </li>
                                    <li className="g-hidden-sm-up g-mb-10">
                                        <a className="media g-py-5 g-px-20" href="#">
                      <span className="d-flex align-self-center g-mr-12">
                        <i className="hs-admin-bell"/>
                      </span>
                                            <span className="media-body align-self-center">
                        Notifications
                      </span>
                                        </a>
                                    </li>
                                    <li className="g-mb-10">
                                        <Link
                                            className="media g-color-primary--hover g-py-5 g-px-20"
                                            to="/profile"
                                            onClick={() => setDropdownProfile(false)}
                                        >
                      <span className="d-flex align-self-center g-mr-12">
                        <i className="hs-admin-user"/>
                      </span>
                                            <span className="media-body align-self-center">
                        {t("My Profile")}
                      </span>
                                        </Link>
                                    </li>
                                    <li className="mb-0" onClick={props.logOut}>
                                        <a className="media g-color-primary--hover g-py-5 g-px-20">
                      <span className="d-flex align-self-center g-mr-12">
                        <i className="hs-admin-shift-right"/>
                      </span>
                                            <span className="media-body align-self-center">
                        {t("Sign Out")}
                      </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <a
                        id="activityInvoker"
                        className="text-uppercase u-header-icon-v1 g-pos-rel g-width-40 g-height-40 rounded-circle g-font-size-20 target-of-invoker-has-dropdowns"
                        aria-controls="activityMenu"
                        aria-haspopup="true"
                        aria-expanded="false"
                        data-dropdown-event="click"
                        data-dropdown-target="#activityMenu"
                        data-dropdown-type="css-animation"
                        data-dropdown-animation-in="fadeInRight"
                        data-dropdown-animation-out="fadeOutRight"
                        data-dropdown-duration={300}
                    >
                        <i className="hs-admin-align-right g-absolute-centered"/>
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default withTranslation("HRMS")(Header);
