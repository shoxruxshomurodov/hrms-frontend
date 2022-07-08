import React from "react";
import LanguagesUpdate from "../../containers/UpdateForm";
import {withRouter} from "react-router-dom";

const LanguagesUpdatePage = (props) => {
    const {id} = props.match.params
    return <LanguagesUpdate id={id} />;
};

export default withRouter(LanguagesUpdatePage);
