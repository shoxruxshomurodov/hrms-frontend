import React, {useEffect, useState,useRef} from 'react';
import styled from "styled-components";
import {includes, isEmpty, toLower,orderBy} from "lodash";
import {withTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";

const StyledAutoCompleteSearch = styled.div`
  .autocomplete-list {
    //display: none;
    position: absolute;
    top: 100%;
    padding-left: 0;
    list-style: none;
    background-color: #F5F9F9;
    width: 100%;
    padding: 15px;
    z-index: 99;
    max-height: 50vh;
    overflow-y: auto;

    li {
      margin-bottom: 5px;
      padding: 5px;
      font-size: 14px;
      cursor: pointer;
      transition: 0.3s ease;

      &:hover {
        color: #8cd54a;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .form-control:focus ~ ul {
    display: block;
  }
`;
const AutoCompleteSearch = ({
                                t,
                                data = [
                                    {id: 1, title: t("CRM Employee"), url: '/employees'},
                                    {id: 2, title: t('Structure'), url: '/structure'},
                                    {id: 3, title: t('Hierarchy'),url:'/structure-hierarchy'},
                                    {id: 4, title: t('Structure Type'),url:'/structure-type'},
                                    {id: 5, title: t('Structure Relation'),url:'/structure-relation'},
                                    {id: 6, title: t('Structure Version'),url:'/structure-version/list'},
                                    {id: 7, title: t('Справочник'),url:'/country'},
                                    {id: 8, title: t('Country'),url:'/country'},
                                    {id: 9, title: t('Region'),url:'/region'},
                                    {id: 10, title: t('Gsp Country'),url:'/gsp-country'},
                                    {id: 11, title: t('Gsp Region'),url:'/gsp-region'},
                                    {id: 12, title: t('District'),url:'/district'},
                                    {id: 13, title: t('Gsp District'),url:'/gsp-district'},
                                    {id: 14, title: t('Party'),url:'/party'},
                                    {id: 15, title: t('Nationality'),url:'/nationality'},
                                    {id: 16, title: t('Gsp Nationality'),url:'/gsp-nationality'},
                                    {id: 17, title: t('Staff'),url:'/staff'},
                                    {id: 18, title: t('Position'),url:'/position'},
                                    {id: 19, title: t('Diploma Qualification'),url:'/diploma-qualification'},
                                    {id: 20, title: t('Educational Institution'),url:'/educational-institution'},
                                    {id: 21, title: t('Faculty'),url:'/faculty'},
                                    {id: 22, title: t('Form study'),url:'/form-study'},
                                    {id: 23, title: t('Relatives'),url:'/relatives'},
                                    {id: 24, title: t('Speciality'),url:'/speciality'},
                                    {id: 25, title: t('Company'),url:'/company'},
                                    {id: 26, title: t('Education'),url:'/education'},
                                    {id: 27, title: t('Settings'),url:'/setting'},
                                    {id: 28, title: t('Templates'),url:'/document'},
                                    {id: 29, title: t('Document'),url:'/document'},
                                    {id: 30, title: t('Variable'),url:'/custom-document'},
                                    {id: 31, title: t('Employee'),url:'/employees'},
                                    {id: 32, title: t('Employee Information'),url:'/employee/information'},
                                    {id: 33, title: t('Employee Work History'),url:'/employee/work-history'},
                                    {id: 34, title: t('Employee Relation'),url:'/employee/relation'},
                                    {id: 35, title: t('Employee Education'),url:'/employee/education'},
                                    {id: 36, title: t('Employee Photo'),url:'/employee/photo'},
                                    {id: 37, title: t('Tasks'),url:'/task/list'},
                                    {id: 38, title: t('Documents'),url:'/document-list'},
                                    {id: 39, title: t('Languages'),url:'/language'},
                                    {id: 40, title: t('Employee Requests'),url:'/employee-requests'},
                                    {id: 41, title: t('Recruitment List'),url:'/recruitment/list'},
                                    {id: 42, title: t('Staffing List'),url:'/staffing/list'},
                                    ],
                                ...rest
                            }) => {
    const [items, setItems] = useState(data);
    const [search, setSearch] = useState('');
    const [open,setOpen] = useState(false);
    const history = useHistory();
    const ref = useRef()
    useEffect(() => {
        if (!isEmpty(search)) {
            setOpen(true);
            const searched = orderBy(data.filter(({title}) => includes(toLower(title), toLower(search)) || includes(toLower(search), toLower(title))),['title'],['asc'])
            setItems(searched)
        }else{
            setOpen(false);
        }
    }, [search])
    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (open && ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
                setSearch('');
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [open])
    return (
        <div
            id="searchMenu"
            className="u-header--search col-sm g-py-12 g-ml-15--sm g-ml-20--md g-mr-10--sm u-dropdown--css-animation u-dropdown--hidden"
            aria-labelledby="searchInvoker"
            style={{animationDuration: "300ms"}}
        >
            <StyledAutoCompleteSearch {...rest}>

                <div className="input-group g-max-width-450--sm position-relative">
                    <input
                        className="form-control h-100 form-control-md g-rounded-4 g-pr-40"
                        type="text"
                        placeholder={t("Enter search keywords")}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="btn u-btn-outline-primary g-brd-none g-bg-transparent--hover g-pos-abs g-top-0 g-right-0 d-flex g-width-40 h-100 align-items-center justify-content-center g-font-size-18 g-z-index-2"
                    >
                        <i className="hs-admin-search"/>
                    </button>
                    {
                        open && !isEmpty(items) && <ul ref={ref} className={'autocomplete-list'}>
                            {
                                items && items.map(({id,title,url='/'}) => <li key={id} onClick={()=>{setOpen(false);setSearch('');history.push(url)}}>{title}</li>)
                            }

                        </ul>
                    }
                </div>
            </StyledAutoCompleteSearch>
        </div>
    );
};

export default withTranslation("HRMS")(AutoCompleteSearch);
