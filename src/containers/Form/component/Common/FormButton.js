import React from "react";
import LoaderMini from "../../../../components/Loader/LoaderMini";
import {withTranslation} from "react-i18next";
import {isEqual} from "lodash";
import classNames from "classnames";

const FormButton = ({
                        isFetched, t, buttonText, col = 6,
                    }) => {
    return (
        <div className={'row'}>
            <div className={`col-6 offset-2 g-mt-10`}>
                <button
                    type="submit"
                    className={classNames("btn btn-block btn-md  rounded-0 u-btn-cyan")}
                >
                    {isEqual(isFetched, buttonText) ? <LoaderMini/> : t(buttonText)}
                </button>
            </div>
        </div>
    );
};

export default withTranslation("HRMS")(FormButton);
