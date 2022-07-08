import React, {memo} from 'react';
import CreateContainer from "../containers/CreateContainer";

const CreatePage = ({...rest}) => {
    return (
        <>
            <CreateContainer {...rest}/>
        </>
    );
};

export default memo(CreatePage);
