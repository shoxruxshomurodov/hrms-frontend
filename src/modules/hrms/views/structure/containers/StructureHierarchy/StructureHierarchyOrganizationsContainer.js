import React, {useEffect, useState} from 'react';
import {get, isEqual} from "lodash";
import {connect} from "react-redux";
import ApiActions from "../../../../../../services/api/Actions";
import Loader from "../../../../../../components/Loader";
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import Map from "../../../../../../components/Map/Map";
import TableBase from "../../../../../../components/Table/TableBase";
import classNames from "classnames";
import Breadcrumb from "../../../../../../components/Breadcrumb";
import {withTranslation} from "react-i18next";


const Styled = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const StructureHierarchyCreateContainer = ({
                                               t,
                                               entities,
                                               getTreeDataList,
                                               treeData,
                                               ...rest
                                           }) => {
    const history = useHistory();
    const [active, setActive] = useState(false);

    useEffect(() => {
        getTreeDataList({});
    }, []);


    if (!get(treeData, 'isFetched', false)) {
        return <Loader/>
    }




    const mapData = get(treeData, 'result.regionalList', []).map((item) => ({
        id:get(item,'region.id',null),
        title:get(item,'region.title','-'),
        mapSvg: JSON.parse(get(item,'region.mapSvg')) || null
    }))

    return (
        <>
            <Breadcrumb
                titles={[
                    {id: 1, title: t("Structure Hierarchy"), url: "#"}
                ]}
            />
            <div className={'row'}>
                <div className="col-md-6">
                    <div style={{marginBottom: '30px'}}><TableBase
                        className={'g-bg-primary-scrolling table-hover'} head={[
                        "№",
                        "МФО",
                        "Organization"
                    ]}>
                        {get(treeData, 'result.countryStructuresList', []).map((structure, index) =><tr
                            key={index + 1}
                            style={{verticalAlign: "middle"}}
                            onClick={() => setActive(100)}
                            className={classNames("mode-dark pointer", {
                                bg_active: isEqual(active, 100)
                            })}
                            onDoubleClick={() => history.push(`/structure-hierarchy/${get(structure, 'id', null)}`)}
                        >
                            <td className={'text-left'}><strong>{index + 1}</strong></td>
                            <td>{get(structure, 'altAbsCode', '-')}</td>
                            <td>{get(structure, 'title', '-')}</td>
                        </tr>)

                        }
                    </TableBase>
                    </div>
                    <div style={{height: '80vh', overflowY: 'auto'}}><TableBase
                        className={'g-bg-primary-scrolling table-hover'} head={[
                        "№",
                        "Region"
                    ]}>
                        {get(treeData, 'result.regionalList', []).map((region, index) =><tr
                            key={index + 1}
                            style={{verticalAlign: "middle"}}
                            onClick={() => setActive(index)}
                            className={classNames("mode-dark pointer", {
                                bg_active: isEqual(active, index)
                            })}
                            onDoubleClick={() => history.push(`/structure-hierarchy/region/${get(region, 'region.id', null)}`)}
                        >
                            <td className={'text-left'}><strong>{index + 1}</strong></td>
                            <td>{get(region, 'region.title', '-')}</td>
                        </tr>)

                        }
                    </TableBase>
                    </div>
                </div>
                <div className="col-md-6 ">
                    <Map url={'region'} items={mapData}/>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        entities: get(state, 'normalizer.entities', {}),
        regions: get(state, 'normalizer.data.region-list', {}),
        treeData: get(state, 'normalizer.data.structure-organizations-tree-list', {}),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTreeDataList: ({size = 200}) => {
            const storeName = "structure-organizations-tree-list";
            dispatch({
                type: ApiActions.GET_ONE.REQUEST,
                payload: {
                    url: `/structure-hierarchies/organizations/structures/tree`,
                    config: {
                        params: {
                            pageSize: size
                        }
                    },
                    storeName
                }
            });
        },
    }
}
export default withTranslation("HRMS")(connect(mapStateToProps, mapDispatchToProps)(StructureHierarchyCreateContainer));
