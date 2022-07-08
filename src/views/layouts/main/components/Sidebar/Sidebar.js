import React, {useState} from "react";
import {NavLink, useLocation, withRouter} from "react-router-dom";
import {withTranslation} from "react-i18next";
import MenuParent from "../../../../../components/MenuItem/MenuParent";
import MenuItem from "../../../../../components/MenuItem/MenuItem";
import WithUser from "../../../../../services/auth/context/WithUser";
import config from "../../../../../config";
import Utils from "../../../../../services/helpers/Utils";
import styled, {css} from "styled-components";
import {includes, isEqual} from "lodash";
import classNames from "classnames";


const Styled = styled.div`

  .miniSidebar {
    width: 75px;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__dropdown {
      position: absolute;
      width: 250px;
      left: 75px;
      max-height: 50vh;
      overflow-y: auto;
      background-color: #F5F9F9;
      z-index: 9999 !important;
      top: 0;
      padding-left: 0px;
      transition: 0.3s ease;
      list-style: none;
      border-left: 2px solid #fff;
      color: #8c8f92;
      display: none;

      .media-body.align-self-center {
        text-align: left !important;
      }

      .fa {
        font-size: 18px !important;
        color: #8c8f92 !important;
      }

    }

    & > li {
      cursor: pointer;
      width: 75px;
      padding: 15px;
      text-align: center;
      position: relative;

      i.fa {
        font-size: 24px;
        color: #8c8f92;
      }

      &.active {
        background-color: #fff;

        i.fa {
          color: #72C02C;
        }
      }

      &:hover {
        &.active {
          .miniSidebar__dropdown {
            display: block;
          }
        }
      }
    }
  }


  .u-sidebar-navigation-v1-menu.u-side-nav--top-level-menu.g-min-height-100vh.mb-0 {
    padding-top: 75px;
    max-height: 98vh;


    ${({sidebarIsOpen}) => sidebarIsOpen && css`
      overflow-y: scroll;
      width: 275px;
    `}
  }
`;
const Sidebar = ({sidebarIsOpen = true, t, ...rest}) => {
    const [activeMenuID, setActiveMenuID] = useState(null);
    const {pathname} = useLocation();
    return (
        <div
            id="sideNav"
            className="col-auto u-sidebar-navigation-v1 u-sidebar-navigation--light dark-sidebar"
            style={{width: sidebarIsOpen ? '275px' : '75px'}}
        >
            <Styled sidebarIsOpen={sidebarIsOpen} {...rest}>
                <div className=" mCustomScrollbar _mCS_3 mCS-autoHide u-header--sticky-top">
                    <div className="mCSB_outside">
                        <div>
                            <WithUser>
                                {({userCan}) => {
                                    return (
                                        <> {sidebarIsOpen ? <ul
                                                id="sideNavMenu"
                                                className="u-sidebar-navigation-v1-menu u-side-nav--top-level-menu g-min-height-100vh mb-0"
                                            >
                                                <MenuItem
                                                    to="/employees"
                                                    icon={<i className="fa fa-list"/>}
                                                    title={t("CRM Employee")}
                                                    style={Utils.userCanStyle(userCan, `${config.ROLES.CRM},${config.ROLES.ADMIN},${config.ROLES.ROLE__HR_REGIONAL}`)}
                                                />
                                                <MenuParent
                                                    icon={<i className="fa fa-sitemap"/>}
                                                    title={t('Structure')}
                                                    height={250}
                                                    style={Utils.userCanStyle(userCan, config.ROLES.ADMIN)}
                                                >
                                                    <MenuItem
                                                        to="/structure-hierarchy"
                                                        icon={<i className="icon-organization"/>}
                                                        title={t('Hierarchy')}
                                                        style={Utils.userCanStyle(userCan, config.ROLES.ADMIN)}
                                                    />
                                                    <MenuItem
                                                        to="/structure"
                                                        icon={<i className="fa fa-usb"/>}
                                                        title={t('Structure')}
                                                        style={Utils.userCanStyle(userCan, config.ROLES.ADMIN)}
                                                    />
                                                    <MenuItem
                                                        to="/structure-type"
                                                        icon={<i className="fa fa-chain"/>}
                                                        title={t('Structure Type')}
                                                        style={Utils.userCanStyle(userCan, config.ROLES.ADMIN)}
                                                    />
                                                    <MenuItem
                                                        to="/structure-relation"
                                                        icon={
                                                            <i className="icon-finance-005 u-line-icon-pro"/>
                                                        }
                                                        title={t('Structure Relation')}
                                                        style={Utils.userCanStyle(userCan, config.ROLES.ADMIN)}
                                                    />
                                                    <MenuItem
                                                        to="/structure-version/list"
                                                        icon={<i className="fa fa-retweet"/>}
                                                        title={t('Structure Version')}
                                                        style={Utils.userCanStyle(userCan, config.ROLES.ADMIN)}
                                                    />
                                                </MenuParent>
                                                <MenuParent
                                                    icon={<i className="fa fa-address-book"/>}
                                                    height={970}
                                                    title={t('Справочник')}
                                                    style={Utils.userCanStyle(userCan, config.ROLES.ADMIN)}
                                                >

                                                    <MenuItem
                                                        to="/country"
                                                        icon={<i className="fa fa-globe"/>}
                                                        title={t('Country')}
                                                    />
                                                    <MenuItem
                                                        to="/region"
                                                        icon={<i className="fa fa-map"/>}
                                                        title={t('Region')}
                                                    />
                                                    <MenuItem
                                                        to="/gsp-country"
                                                        icon={<i className="fa fa-globe"/>}
                                                        title={t('Gsp Country')}
                                                    />
                                                    <MenuItem
                                                        to="/gsp-region"
                                                        icon={<i className="fa fa-map-o"/>}
                                                        title={t('Gsp Region')}
                                                    />
                                                    <MenuItem
                                                        to="/district"
                                                        icon={<i className="fa fa-map-marker"/>}
                                                        title={t('District')}
                                                    />
                                                    <MenuItem
                                                        to="/gsp-district"
                                                        icon={<i className="fa fa-map-pin"/>}
                                                        title={t('Gsp District')}
                                                    />
                                                    <MenuItem
                                                        to="/party"
                                                        icon={<i className="fa fa-map-signs"/>}
                                                        title={t('Party')}
                                                    />
                                                    <MenuItem
                                                        to="/nationality"
                                                        icon={<i className="fa fa-drivers-license"/>}
                                                        title={t('Nationality')}
                                                    />
                                                    <MenuItem
                                                        to="/gsp-nationality"
                                                        icon={<i className="fa fa-drivers-license-o"/>}
                                                        title={t('Gsp Nationality')}
                                                    />
                                                    <MenuItem
                                                        to="/staff"
                                                        icon={<i className="fa fa-group"/>}
                                                        title={t('Staff')}
                                                    />
                                                    <MenuItem
                                                        to="/position"
                                                        icon={<i className="fa fa-user-secret"/>}
                                                        title={t('Position')}
                                                    />

                                                    <MenuItem
                                                        to="/diploma-qualification"
                                                        icon={<i className="fa fa-graduation-cap"/>}
                                                        title={t('Diploma Qualification')}
                                                    />
                                                    <MenuItem
                                                        to="/educational-institution"
                                                        icon={<i className="fa fa-institution"/>}
                                                        title={t('Educational Institution')}
                                                    />
                                                    <MenuItem
                                                        to="/faculty"
                                                        icon={<i className="fa fa-paperclip"/>}
                                                        title={t('Faculty')}
                                                    />
                                                    <MenuItem
                                                        to="/form-study"
                                                        icon={<i className="fa fa-leanpub"/>}
                                                        title={t('Form study')}
                                                    />
                                                    <MenuItem
                                                        to="/relatives"
                                                        icon={<i className="fa fa-skyatlas"/>}
                                                        title={t('Relatives')}
                                                    />
                                                    <MenuItem
                                                        to="/speciality"
                                                        icon={<i className="fa fa-resistance"/>}
                                                        title={t('Speciality')}
                                                    />
                                                    <MenuItem
                                                        to="/company"
                                                        icon={<i className="fa fa-dropbox"/>}
                                                        title={t('Company')}
                                                    />
                                                    <MenuItem
                                                        to="/education"
                                                        icon={<i className="fa fa-etsy"/>}
                                                        title={t('Education')}
                                                    />
                                                    <MenuItem
                                                        to="/business-process"
                                                        icon={<i className="fa fa-pie-chart"/>}
                                                        title={t('Business Process')}
                                                    />
                                                    <MenuItem
                                                        to="/calendar"
                                                        icon={<i className="fa fa-calendar"/>}
                                                        title={t('Calendar settings')}
                                                    />
                                                    <MenuItem
                                                        to="/skill"
                                                        icon={<i className="fa fa-cog"/>}
                                                        title={t('Skill')}
                                                    />


                                                    <MenuItem
                                                        to="/template-document-assign"
                                                        icon={<i className="fa fa-file"/>}
                                                        title={t('Template document assign')}
                                                    />
                                                    <MenuItem
                                                        to="/blacklist-employee"
                                                        icon={<i className="fa fa-users"/>}
                                                        title={t('Blacklist')}
                                                    />

                                                    <MenuItem
                                                        to="/setting"
                                                        icon={<i className="fa fa-cog"/>}
                                                        title={t('Settings')}
                                                    />

                                                </MenuParent>

                                                <MenuParent
                                                    icon={<i className="fa fa-folder-open-o"/>}
                                                    title={t('Templates')}
                                                    height={90}
                                                    style={Utils.userCanStyle(userCan, config.ROLES.ADMIN)}
                                                >
                                                    <MenuItem
                                                        to="/document"
                                                        icon={<i className="fa fa-folder-open-o"/>}
                                                        title={t('Document')}
                                                    />
                                                    <MenuItem
                                                        to="/custom-document"
                                                        icon={<i className="fa fa-folder-o"/>}
                                                        title={t('Variable')}
                                                    />
                                                </MenuParent>
                                                <MenuParent
                                                    icon={<i className="fa fa-users"/>}
                                                    title={t('Employee')}
                                                    height={230}
                                                    style={Utils.userCanStyle(userCan, `${config.ROLES.ADMIN},${config.ROLES.CRM},${config.ROLES.USER},${config.ROLES.ROLE__HR_DEPARTMENT},${config.ROLES.ROLE__HR_DEPARTMENT_HEAD},${config.ROLES.ROLE_CHIEF_ACCOUNTANT},${config.ROLES.ROLE__AUTONOMOUS_STRUCTURE},
                                                    ${config.ROLES.ROLE__ASSISTANT_PERSONNEL_HEAD},${config.ROLES.DIRECTOR},${config.ROLES.ROLE_LAWYER},${config.ROLES.SUB_CHAIRMAN},${config.ROLES.HEAD}`)}
                                                >
                                                    <MenuItem
                                                        to="/employee/information"
                                                        icon={<i className="fa fa-language"/>}
                                                        title={t('Employee Information')}
                                                    />
                                                    <MenuItem
                                                        to="/employee/work-history"
                                                        icon={<i className="fa fa-language"/>}
                                                        title={t('Employee Work History')}
                                                    />
                                                    <MenuItem
                                                        to="/employee/relation"
                                                        icon={<i className="fa fa-language"/>}
                                                        title={t('Employee Relation')}
                                                    />
                                                    <MenuItem
                                                        to="/employee/education"
                                                        icon={<i className="fa fa-language"/>}
                                                        title={t('Employee Education')}
                                                    />
                                                    <MenuItem
                                                        to="/employee/photo"
                                                        icon={<i className="fa fa-language"/>}
                                                        title={t('Employee Photo')}
                                                    />
                                                </MenuParent>
                                                <MenuItem
                                                    to="/task"
                                                    icon={<i className="fa fa-tasks"/>}
                                                    title={t("Tasks")}
                                                />
                                                <MenuItem
                                                    to="/language"
                                                    icon={<i className="fa fa-language"/>}
                                                    title={t("Languages")}
                                                    style={Utils.userCanStyle(userCan, `${config.ROLES.ADMIN},${config.ROLES.ROLE__ASSISTANT_PERSONNEL_HEAD}`)}
                                                />
                                                <MenuItem
                                                    to="/employee-requests"
                                                    icon={<i className="fa fa-user-plus"/>}
                                                    title={t("Employee Requests")}
                                                    style={Utils.userCanStyle(userCan, config.ROLES.ADMIN)}
                                                />
                                                <MenuItem
                                                    to="/recruitment"
                                                    icon={<i className="fa fa-list"/>}
                                                    title={t("Recruitment List")}
                                                    style={Utils.userCanStyle(userCan, config.ROLES.ADMIN)}
                                                />
                                                <MenuItem
                                                    to="/staffing/list"
                                                    icon={<i className="fa fa-users"/>}
                                                    title={t("Staffing List")}
                                                    style={Utils.userCanStyle(userCan, `${config.ROLES.ADMIN},${config.ROLES.CRM}`)}
                                                />
                                                <MenuItem
                                                    to="/vacancy"
                                                    icon={<i className="fa fa-users"/>}
                                                    title={t("Vacancy")}
                                                    style={Utils.userCanStyle(userCan, `${config.ROLES.DIRECTOR},${config.ROLES.ADMIN},${config.ROLES.SUB_CHAIRMAN},${config.ROLES.ROLE__HR_DEPARTMENT},${config.ROLES.ROLE__HR_REGIONAL},${config.ROLES.VACANCY_PERMISSION}`)}
                                                />

                                                <MenuItem
                                                    to="/CvRequest"
                                                    icon={<i className="fa fa-user-plus"/>}
                                                    title={t("CV requests")}
                                                    style={Utils.userCanStyle(userCan, `${config.ROLES.ADMIN},${config.ROLES.DIRECTOR},${config.ROLES.ROLE__HR_DEPARTMENT},${config.ROLES.SUB_CHAIRMAN},${config.ROLES.ROLE_CHAIRMAN},${config.ROLES.ROLE__AUTONOMOUS_STRUCTURE},${config.ROLES.CV_REQUEST_PERMISSION}`)}
                                                />
                                                <MenuItem
                                                    to="/VacationGraphic"
                                                    icon={<i className="fa fa-user-plus"/>}
                                                    title={t("Vacation graphic")}
                                                    style={Utils.userCanStyle(userCan, `${config.ROLES.ADMIN},${config.ROLES.DIRECTOR},${config.ROLES.ROLE__HR_DEPARTMENT},${config.ROLES.SUB_CHAIRMAN},${config.ROLES.ROLE_CHAIRMAN},${config.ROLES.VACATION_GRAPHIC_PERMISSION}`)}
                                                />

                                                <MenuItem
                                                    to="/DocumentDocRequests"
                                                    icon={<i className="fa fa-file"/>}
                                                    title={t("Document requests")}
                                                    style={Utils.userCanStyle(userCan, `${config.ROLES.ADMIN},${config.ROLES.CRM},${config.ROLES.USER},${config.ROLES.ROLE__HR_DEPARTMENT},${config.ROLES.ROLE__HR_DEPARTMENT_HEAD},${config.ROLES.ROLE_CHIEF_ACCOUNTANT},${config.ROLES.ROLE__AUTONOMOUS_STRUCTURE},
                                                    ${config.ROLES.ROLE__ASSISTANT_PERSONNEL_HEAD},${config.ROLES.DIRECTOR},${config.ROLES.ROLE_LAWYER},${config.ROLES.SUB_CHAIRMAN},${config.ROLES.HEAD}`)}
                                                />
                                                <MenuItem
                                                    to="/DocumentDocOrders"
                                                    icon={<i className="fa fa-file"/>}
                                                    title={t("Document orders")}
                                                    style={Utils.userCanStyle(userCan, `${config.ROLES.ADMIN},${config.ROLES.DIRECTOR},${config.ROLES.ROLE__HR_DEPARTMENT},${config.ROLES.SUB_CHAIRMAN},${config.ROLES.ROLE_CHAIRMAN},${config.ROLES.DOCUMENT_ORDERS_PERMISSION}`)}
                                                />
                                                <MenuItem
                                                    to="/document-holidays"
                                                    icon={<i className="fa fa-file"/>}
                                                    title={t("Document holidays")}
                                                    style={Utils.userCanStyle(userCan, `${config.ROLES.ADMIN},${config.ROLES.ROLE__AUTONOMOUS_STRUCTURE}`)}
                                                />
                                                <MenuItem
                                                    to="/DocumentBranchCandidate"
                                                    icon={<i className="fa fa-file"/>}
                                                    title={t("Document branch candidates")}
                                                    style={Utils.userCanStyle(userCan, `${config.ROLES.ADMIN},${config.ROLES.ROLE__HR_REGIONAL},${config.ROLES.ROLE__AUTONOMOUS_STRUCTURE},${config.ROLES.ROLE__HR_DEPARTMENT_HEAD}`)}
                                                />

                                            </ul> :
                                            <ul id="sideNavMenu"
                                                className={'u-sidebar-navigation-v1-menu u-side-nav--top-level-menu g-min-height-100vh mb-0 miniSidebar xx-large-padding-t'}>
                                                <li style={Utils.userCanStyle(userCan, config.ROLES.ADMIN)}
                                                    onClick={() => setActiveMenuID(1)} className={classNames({
                                                    active: isEqual(activeMenuID, 1) || includes(
                                                        ['/country', '/region', '/gsp-country', '/gsp-region', '/district', '/gsp-district', '/party',
                                                            '/nationality', '/gsp-nationality', '/staff', '/position', '/diploma-qualification', '/educational-institution',
                                                            '/faculty', '/form-study', '/relatives', '/speciality', '/company', '/education', '/setting'], pathname)
                                                })}
                                                ><i className="fa fa-address-book"/>
                                                    <ul className={'miniSidebar__dropdown'}>
                                                        <MenuItem
                                                            to="/country"
                                                            icon={<i className="fa fa-globe"/>}
                                                            title={t("Country")}
                                                        />
                                                        <MenuItem
                                                            to="/region"
                                                            icon={<i className="fa fa-map"/>}
                                                            title={t("Region")}
                                                        />
                                                        <MenuItem
                                                            to="/gsp-country"
                                                            icon={<i className="fa fa-globe"/>}
                                                            title={t("Gsp Country")}
                                                        />
                                                        <MenuItem
                                                            to="/gsp-region"
                                                            icon={<i className="fa fa-map-o"/>}
                                                            title={t("Gsp Region")}
                                                        />
                                                        <MenuItem
                                                            to="/district"
                                                            icon={<i className="fa fa-map-marker"/>}
                                                            title={t("District")}
                                                        />
                                                        <MenuItem
                                                            to="/gsp-district"
                                                            icon={<i className="fa fa-map-pin"/>}
                                                            title={t("Gsp District")}
                                                        />
                                                        <MenuItem
                                                            to="/party"
                                                            icon={<i className="fa fa-map-signs"/>}
                                                            title={t("Party")}
                                                        />
                                                        <MenuItem
                                                            to="/nationality"
                                                            icon={<i className="fa fa-drivers-license"/>}
                                                            title={t("Nationality")}
                                                        />
                                                        <MenuItem
                                                            to="/gsp-nationality"
                                                            icon={<i className="fa fa-drivers-license-o"/>}
                                                            title={t("Gsp Nationality")}
                                                        />
                                                        <MenuItem
                                                            to="/staff"
                                                            icon={<i className="fa fa-group"/>}
                                                            title={t("Staff")}

                                                        />
                                                        <MenuItem
                                                            to="/position"
                                                            icon={<i className="fa fa-user-secret"/>}
                                                            title={t("Position")}
                                                        />

                                                        <MenuItem
                                                            to="/diploma-qualification"
                                                            icon={<i className="fa fa-graduation-cap"/>}
                                                            title={t("Diploma Qualification")}
                                                        />
                                                        <MenuItem
                                                            to="/educational-institution"
                                                            icon={<i className="fa fa-institution"/>}
                                                            title={t("Educational Institution")}
                                                        />
                                                        <MenuItem
                                                            to="/faculty"
                                                            icon={<i className="fa fa-paperclip"/>}
                                                            title={t("Faculty")}
                                                        />
                                                        <MenuItem
                                                            to="/form-study"
                                                            icon={<i className="fa fa-leanpub"/>}
                                                            title={t("Form study")}
                                                        />
                                                        <MenuItem
                                                            to="/relatives"
                                                            icon={<i className="fa fa-skyatlas"/>}
                                                            title={t("Relatives")}
                                                        />
                                                        <MenuItem
                                                            to="/speciality"
                                                            icon={<i className="fa fa-resistance"/>}
                                                            title={t("Speciality")}
                                                        />
                                                        <MenuItem
                                                            to="/company"
                                                            icon={<i className="fa fa-dropbox"/>}
                                                            title={t("Company")}
                                                        />
                                                        <MenuItem
                                                            to="/education"
                                                            icon={<i className="fa fa-etsy"/>}
                                                            title={t("Education")}
                                                        />
                                                        <MenuItem
                                                            to="/setting"
                                                            icon={<i className="fa fa-cog"/>}
                                                            title={t("Settings")}
                                                        />
                                                    </ul>
                                                </li>
                                                <li style={Utils.userCanStyle(userCan, config.ROLES.ADMIN)}
                                                    onClick={() => setActiveMenuID(2)}
                                                    className={classNames({active: isEqual(activeMenuID, 2) || includes(['/document', '/custom-document'], pathname)})}
                                                ><i className="fa fa-folder-open-o"/>
                                                    <ul className={'miniSidebar__dropdown'}>
                                                        <MenuItem
                                                            to="/document"
                                                            icon={<i className="fa fa-folder-open-o"/>}
                                                            title={t("Document")}
                                                        />
                                                        <MenuItem
                                                            to="/custom-document"
                                                            icon={<i className="fa fa-folder-o"/>}
                                                            title={t("Custom Document Var")}
                                                        />
                                                    </ul>
                                                </li>
                                                <li style={Utils.userCanStyle(userCan, config.ROLES.ADMIN)}
                                                    onClick={() => setActiveMenuID(3)}
                                                    className={classNames({active: isEqual(activeMenuID, 3) || includes(['/structure-hierarchy', '/structure', '/structure-type', '/structure-relation', '/structure-version/list'], pathname)})}
                                                ><i className="fa fa-sitemap"/>
                                                    <ul className={'miniSidebar__dropdown'}>
                                                        <MenuItem
                                                            to="/structure-hierarchy"
                                                            icon={<i className="icon-organization"/>}
                                                            title={t("Hierarchy")}
                                                        />
                                                        <MenuItem
                                                            to="/structure"
                                                            icon={<i className="fa fa-usb"/>}
                                                            title={t("Structure")}
                                                        />
                                                        <MenuItem
                                                            to="/structure-type"
                                                            icon={<i className="fa fa-chain"/>}
                                                            title={t("Structure Type")}
                                                        />
                                                        <MenuItem
                                                            to="/structure-relation"
                                                            icon={
                                                                <i className="icon-finance-005 u-line-icon-pro"/>
                                                            }
                                                            title={t("Structure Relation")}
                                                        />
                                                        <MenuItem
                                                            to="/structure-version/list"
                                                            icon={<i className="fa fa-retweet"/>}
                                                            title={t("Structure Version")}
                                                        />
                                                    </ul>
                                                </li>
                                                <li style={Utils.userCanStyle(userCan, config.ROLES.CRM)}
                                                    onClick={() => setActiveMenuID(null)}
                                                    className={classNames({active: isEqual(pathname, '/employees')})}>
                                                    <NavLink to={"/employees"}> <i className="fa fa-list"/></NavLink>
                                                </li>
                                                <li style={Utils.userCanStyle(userCan, config.ROLES.USER)}
                                                    className={classNames({active: isEqual(activeMenuID, 4) || includes(['/employee/information', '/employee/work-history', '/employee/relation', '/employee/education', '/employee/photo'], pathname)})}
                                                    onClick={() => setActiveMenuID(4)}>
                                                    <i className="fa fa-users"/>
                                                    <ul className={'miniSidebar__dropdown'}>
                                                        <MenuItem
                                                            to="/employee/information"
                                                            icon={<i className="fa fa-language"/>}
                                                            title={t("Employee Information")}
                                                        />
                                                        <MenuItem
                                                            to="/employee/work-history"
                                                            icon={<i className="fa fa-language"/>}
                                                            title={t("Employee Work History")}
                                                        />
                                                        <MenuItem
                                                            to="/employee/relation"
                                                            icon={<i className="fa fa-language"/>}
                                                            title={t("Employee Relation")}
                                                        />
                                                        <MenuItem
                                                            to="/employee/education"
                                                            icon={<i className="fa fa-language"/>}
                                                            title={t("Employee Education")}
                                                        />
                                                        <MenuItem
                                                            to="/employee/photo"
                                                            icon={<i className="fa fa-language"/>}
                                                            title={t("Employee Photo")}
                                                        />
                                                    </ul>
                                                </li>
                                                <li style={Utils.userCanStyle(userCan, config.ROLES.ADMIN)}
                                                    onClick={() => setActiveMenuID(null)}
                                                    className={classNames({active: isEqual(pathname, '/task')})}>
                                                    <NavLink to={"/task"}> <i className="fa fa-tasks"/></NavLink>
                                                </li>
                                                <li style={Utils.userCanStyle(userCan, config.ROLES.ADMIN)}
                                                    onClick={() => setActiveMenuID(null)}
                                                    className={classNames({active: isEqual(pathname, '/document-list')})}>
                                                    <NavLink to={"/document-list"}> <i
                                                        className="fa fa-files-o"/></NavLink>
                                                </li>
                                                <li style={Utils.userCanStyle(userCan, config.ROLES.ADMIN)}
                                                    onClick={() => setActiveMenuID(null)}
                                                    className={classNames({active: isEqual(pathname, '/language')})}>
                                                    <NavLink to={"/language"}><i className="fa fa-language"/></NavLink>
                                                </li>

                                                <li style={Utils.userCanStyle(userCan, config.ROLES.ADMIN)}
                                                    onClick={() => setActiveMenuID(null)}
                                                    className={classNames({active: isEqual(pathname, '/employee-requests')})}>
                                                    <NavLink to={"/employee-requests"}> <i
                                                        className=" fa fa-user-plus"/></NavLink>
                                                </li>
                                                <li style={Utils.userCanStyle(userCan, config.ROLES.ADMIN)}
                                                    onClick={() => setActiveMenuID(null)}
                                                    className={classNames({active: isEqual(pathname, '/recruitment/list')})}>
                                                    <NavLink to={"/recruitment/list"}> <i
                                                        className="fa fa-list"/></NavLink>
                                                </li>
                                                <li style={Utils.userCanStyle(userCan, `${config.ROLES.ADMIN},${config.ROLES.CRM}`)}
                                                    onClick={() => setActiveMenuID(null)}
                                                    className={classNames({active: isEqual(pathname, '/staffing/list')})}>
                                                    <NavLink to={"/staffing/list"}> <i
                                                        className="fa fa-users"/></NavLink>
                                                </li>

                                            </ul>} </>
                                    );
                                }}
                            </WithUser>
                        </div>
                    </div>
                </div>
            </Styled>
        </div>
    );
};

export default withTranslation("HRMS")(withRouter(Sidebar));
