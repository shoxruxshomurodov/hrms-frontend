import React, {useEffect, useState} from 'react';
import {withTranslation} from "react-i18next";
import Tabs from '../../../../../components/Tabs';
import ContentLoader from "../../../../../components/Loader/ContentLoader";
import FileUploadForm from "./FileUploadForm";
import {connect} from "react-redux";
import ApiActions from "../../../../../services/api/Actions";
import {get, isArray, isNil} from "lodash";
import TableBase from "../../../../../components/Table/TableBase";

function EmployeeFiles({t, user, employeeFilesList, getEmployeeFilesList, hasAction = false}) {
    useEffect(() => {
        if (get(user, 'id')) {
            getEmployeeFilesList({id: get(user, 'id')})
        }
    }, [])

    console.log(employeeFilesList, 'employeeFilesList')

    return (
        <>
            <div>
                <div className='row'>
                    <div className='col col-12'>
                        <Tabs titles={!hasAction ? ["All files", "Upload file"] : ["All files"]}
                              texts={[<>{get(employeeFilesList, 'isFetched', false) ? <div>
                                  <TableBase
                                      head={[
                                          "ID",
                                          "Title",
                                          "Description",
                                          "Download",
                                      ]}
                                  >
                                      {isArray(get(employeeFilesList, 'result.content')) &&
                                          get(employeeFilesList, 'result.content', []).map((file) => {
                                              return (
                                                  <tr
                                                      key={file.id}
                                                      style={{verticalAlign: "middle"}}
                                                      className="mode-dark"
                                                  >
                                                      <td>{get(file, "fileId", "")}</td>
                                                      <td>{get(file, "title", "")}</td>
                                                      <td>{get(file, "description", "")}</td>
                                                      <td><a target={'_blank'} download
                                                             href={get(file, 'file.url', '#')}><i
                                                          className={'fa fa-download download-icon'}></i></a></td>
                                                  </tr>
                                              );
                                          })}
                                  </TableBase>
                                  {get(employeeFilesList, 'result.content', []).length === 0 &&
                                      <p className={"text-center"}>No File</p>}
                              </div> : <ContentLoader/>}</>,
                                  <FileUploadForm user={user} getEmployeeFilesList={getEmployeeFilesList}/>
                              ]}/>
                    </div>

                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        employeeFilesList: get(
            state,
            "apiReducer.data.employee-files-list",
            []
        ),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getEmployeeFilesList: ({id}) => {
            const storeName = "employee-files-list";
            dispatch({
                type: ApiActions.GET_DATA.REQUEST,
                payload: {
                    url: `employee-files?employeeId=${id}`,
                    storeName,
                    config: {},
                },
            });
        },
    }
}

export default withTranslation("HRMS")(connect(mapStateToProps, mapDispatchToProps)((EmployeeFiles)));