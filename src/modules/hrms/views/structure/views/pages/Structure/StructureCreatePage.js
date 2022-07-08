import React from "react";
import {withTranslation} from "react-i18next";
import StructureCreateContainer from "../../../containers/Structure/StructureCreateContainer";

function StructureCreatePage(props) {
    return <StructureCreateContainer />;
}

export default withTranslation("HRMS")(StructureCreatePage);
