import React, {Component} from "react";
import Normalizer from "../../services/normalizer";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {get, head, isEmpty, isEqual, isNil, values} from "lodash";
import {withTranslation} from "react-i18next";
import DataIsEmpty from "../../components/AccessDenied/DataIsEmpty";
import ApiActions from "../../services/api/Actions";
import Loader from "../../components/Loader";
import {decode, encode} from "js-base64";

class GridView extends Component {
    state = {
        dynamicPage: 1,
        isActive: null,
        search: "",
        pageSize: 10,
        sort: get(this.props, "sort", "id"),
        orderby: get(this.props, "orderby", "DESC"),
        filter: get(this.props, "filter", {}),
        selected: null,
        selectParams: null
    };
    getSortOrder = () => {
        return this.state.orderby == "ASC"
            ? this.state.sort
            : "-" + this.state.sort;
    };
    changeSortOrder = (sort, orderby = "ASC") => {
        const {callToRender, params} = this.props;
        this.setState({
            ...this.state,
            sort: sort,
            orderby: orderby
        });
        callToRender({sortDirection: orderby, sortBy: sort, ...params});
    };
    revertSort = (sort) => {
        this.changeSortOrder(sort, this.state.orderby == "ASC" ? "DESC" : "ASC");
    };

    sortByField = (field) => {

    }

    checkUrlEncode = () => {
        let {callToRender, callToRenderTrigger, encoded, params, drawToRender} = this.props;
        const {dynamicPage, pageSize} = this.state;
        if (!isNil(encoded)) {
            encoded = decode(encoded);
            encoded = JSON.parse(encoded);
            const {currentPage, pageSize, selectParams, selected, search} = encoded;
            this.setState({dynamicPage: currentPage, pageSize, selectParams, selected, search});
            callToRenderTrigger();
            callToRender({pageNumber: currentPage - 1, pageSize, ...params, ...selectParams, ...search});
        } else {
            callToRender({pageNumber: dynamicPage - 1, pageSize, ...params});
        }
    };

    changeUrl = (pageNumber, pageSize) => {
        let {
            callToRender,
            history,
            meta,
            totalPages,
            totalElements,
            callToRenderTrigger,
            storeName,
            params,
            customUrl = null
        } = this.props;
        let {selectParams, selected, search} = this.state;
        meta = {totalElements, totalPages, currentPage: pageNumber, pageSize, selectParams, selected, search};
        meta = encode(JSON.stringify(meta));
        callToRenderTrigger();
        callToRender({pageNumber: pageNumber - 1, pageSize, ...params, ...selectParams, ...search});
        if (!isNil(customUrl)) {
            history.push(`/${customUrl}/${meta}`);
        } else {
            history.push(`/${storeName}/${meta}`);
        }
    };

    componentDidMount() {
        let {callToRenderTrigger} = this.props;
        callToRenderTrigger();
        this.checkUrlEncode();
    }

    onSearch = (e) => {
        const {callToRender, params} = this.props;
        this.setState({search: {[e.target.name]: e.target.value}});
        callToRender({[e.target.name]: e.target.value, ...params});
    };

    onPerPage = (pageSize) => {
        const {dynamicPage} = this.state;
        this.setState({pageSize});
        this.changeUrl(dynamicPage, pageSize);
    };

    onSelectFilter = ({selected, param}) => {
        const {callToRender, params} = this.props;
        this.setState(state => ({...state, selected, selectParams: param}));
        callToRender({...param, ...params})
    }
    handlePagination = (page) => {
        this.setState({dynamicPage: page});
        this.changeUrl(page);
    };

    render() {
        let {
            scheme,
            CustomPagination,
            CustomToolbar,
            CustomBreadcrumb,
            ComponentHead: Head,
            ComponentBody: Body,
            ComponentHeadTitles,
            meta,
            t,
            totalElements,
            totalPages,
            drawToRender,
            entities,
            isFetched,
            BreadCrumbTitles,
            createUrl,
            hideIcon = false,
            hasSelectFilter = false,
            isItemHeadTitleObject = false,
            hasStateFilter = false,
            stateTypesList = [],
            actions = {
                add: () => {
                }, remove: () => {
                }, update: () => {
                }
            }
        } = this.props;
        let data = Normalizer.Denormalize(drawToRender, [scheme], entities);
        const {dynamicPage, search, pageSize, selected} = this.state;

        meta = {
            totalElements,
            totalPages,
            currentPage: dynamicPage,
            ...meta
        };
        if (!isFetched) {
            return <Loader/>;
        }

        return (
            <>
                <CustomBreadcrumb titles={BreadCrumbTitles}/>
                <CustomToolbar
                    search={head(values(search))}
                    pageSize={pageSize}
                    onPerPage={this.onPerPage}
                    onSearch={this.onSearch}
                    onSelectFilter={this.onSelectFilter}
                    createUrl={createUrl}
                    data={data}
                    selected={selected}
                    hasSelectFilter={hasSelectFilter}
                    hasStateFilter={hasStateFilter}
                    stateTypesList={stateTypesList}
                    add={get(actions, 'add', () => {
                    })}
                />
                {!isEmpty(data) ? (
                    <table className="table table-striped table-hover">
                        <Head
                            changeSortOrder={this.changeSortOrder}
                            revertSort={this.revertSort}
                            head={ComponentHeadTitles}
                            hideIcon={hideIcon}
                            isItemHeadTitleObject={isItemHeadTitleObject}
                        />
                        <Body body={data} remove={get(actions, 'remove', () => {
                        })} update={get(actions, 'update', () => {
                        })}/>
                    </table>
                ) : (
                    <DataIsEmpty/>
                )}
                <CustomPagination
                    t={t}
                    currentPage={get(meta, "currentPage", 1)}
                    totalCount={get(meta, "totalElements", 10)}
                    pageSize={get(meta, "pageSize", 10)}
                    onPageChange={this.handlePagination}
                />
            </>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        drawToRender: ownProps.schemeStructure ? get(
            state,
            `normalizer.data.${ownProps.storeName}.result`,
            []
        ) : get(
            state,
            `normalizer.data.${ownProps.storeName}.result.content`,
            []
        ),
        isFetched: get(
            state,
            `normalizer.data.${ownProps.storeName}.isFetched`,
            false
        ),
        meta: get(
            state,
            `normalizer.data.${ownProps.storeName}.result.pageable`,
            {}
        ),
        totalElements: get(
            state,
            `normalizer.data.${ownProps.storeName}.result.totalElements`,
            0
        ),
        totalPages: get(
            state,
            `normalizer.data.${ownProps.storeName}.result.totalPages`,
            0
        ),
        entities: get(state, "normalizer.entities", [])
    };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        callToRender: (params) => {
            const storeName = ownProps.storeName;
            const entityName = ownProps.storeName;
            const scheme = ownProps.schemeStructure ? [ownProps.scheme] : {content: [ownProps.scheme]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: ownProps.url,
                    baseUrl: ownProps.baseUrl,
                    config: isEqual(get(ownProps, 'method', 'get'), 'get') ? {
                        params,
                        pageSize: 10,
                        ...ownProps.params
                    } : {
                        page: {
                            ...params,
                            pageSize: 100,
                        },
                        searchCriteria: {
                            ...ownProps.params
                        }
                    },
                    scheme,
                    storeName,
                    entityName,
                    method: get(ownProps, 'method', 'get')
                }
            });
        },
        callToRenderTrigger: () => {
            const storeName = ownProps.storeName;
            const entityName = ownProps.entityName;
            dispatch({
                type: ApiActions.GET_ALL.TRIGGER,
                payload: {
                    storeName,
                    entityName
                }
            });
        }
    };
};
export default withTranslation("HRMS")(
    connect(mapStateToProps, mapDispatchToProps)(withRouter(GridView))
);
