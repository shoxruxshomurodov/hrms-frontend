import React from "react";
import {get} from "lodash";
import PerPage from "../PerPage";
import {withTranslation} from "react-i18next";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
import AsyncSelect from "../AyncSelect/AsyncSelect";
import ReSelect from "../InputGroup/ReSelect";

const ToolBarStructure = (props) => {
    const {
        t,
        pageSize,
        onPerPage,
        search = "",
        hasSelectFilter = false,
        selected = null,
        onSearch,
        createUrl,
        onSelectFilter = () => {
        },
        hasStateFilter = false,
        stateTypesList = []
    } = props;


    const onChange = (stateType) => {
        onSelectFilter({
            selected: stateType,
            param: {state: get(stateType,'value',null)}
        })
    }
    return (
        <div className="media-md align-items-center g-mb-10 select-w-300">

            <div className="media d-md-flex align-items-center ml-auto">
                {
                    hasStateFilter &&
                    <ReSelect
                        options={stateTypesList}
                        className={'g-ml-15 g-ml-55--md'}
                        onChange={onChange}
                        defaultValue={get(selected, 'value', null)}
                    />
                }
                {hasSelectFilter && <AsyncSelect defaultValue={selected} url={'structure-type'}

                                                 property={["id", "title", "type"]}
                                                 className={'g-ml-15 g-ml-55--md'}
                                                 placeholder={'Select structure type'}
                                                 onChangeHandler={(data) => onSelectFilter({
                                                     selected: data,
                                                     param: {structureTypeId: get(data, 'value', null)}
                                                 })}/>}

                {createUrl && <Link
                    to={createUrl}
                    className="d-flex align-items-center u-link-v5 g-color-secondary g-color-primary--hover g-ml-15 g-ml-55--md"
                >
                    <i className="hs-admin-plus g-font-size-18" />
                    <span className="g-hidden-sm-down g-ml-10">{t("Create")} </span>
                </Link>}
                <PerPage value={pageSize} className="g-ml-15 g-ml-55--md" onPerPage={onPerPage}/>

                <div className="d-flex g-ml-15 g-ml-55--md">
                    <div className="input-group g-pos-rel g-width-320--md">
                        <input
                            id="datatableSearch2"
                            className="form-control g-font-size-default g-brd-gray-light-v7 g-brd-lightblue-v3--focus g-rounded-20 g-pl-20 g-pr-50 g-py-10"
                            onChange={(e) => onSearch(e)}
                            name="title"
                            type="text"
                            placeholder={t("Search for text...")}
                            value={search}
                            autoFocus={true}
            />
            <button
              className="btn g-pos-abs g-top-0 g-right-0 g-z-index-2 g-width-60 h-100 g-bg-transparent g-font-size-16 g-color-primary g-color-secondary--hover rounded-0"
              type="submit"
            >
              <i className="hs-admin-search g-absolute-centered" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation("HRMS")(withRouter(ToolBarStructure));
