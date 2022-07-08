import React from 'react';
import styled from "styled-components";
import {get} from "lodash";
import {withTranslation} from "react-i18next";

const StyledCustomField = styled.div`
  width: 100%;
`;

const Sign = ({
                  t,
                  sign = () => {
                  },
                  eimzo = () => {
                  },
                  name,
                  signed = {},
                  values = {},
                  unSign = () => {
                  },
                  ...rest
              }) => {
    return (
        <>
            <label
                className="col-2 col-form-label text-right"
                htmlFor="vacation_application_process_user_sign_field">{t("Подписать")}</label>
            <div className="col-6">
                <div className="d-flex align-items-center">
                    {!get(values, `${name}`, null) && <button type={'button'} onClick={unSign}
                                                              className="btn btn-md  u-btn-danger btn-block   rounded-0">
                        <span className="ml-2">{t("Cancel")}</span>
                    </button>}
                    {!get(values, `${name}`, null) ? <><button onClick={() => sign(name)} type={'button'}
                                                             className={'btn btn-md btn-block u-btn-primary rounded-0 ml-2 mt-0'}>
                        <i className={'icon-pencil'}></i>
                    </button> <button onClick={() =>eimzo(name)} type={'button'}
                                      className={'btn btn-md btn-block u-btn-cyan rounded-0 ml-2 mt-0'}>E-imzo</button></>: <h2 className={' h4 text-success mb-0'}>{t("Подписано")}</h2>}

                </div>
            </div>
        </>
    );
};

export default withTranslation("HRMS")(Sign);
