import React, {memo} from 'react';
import ListContainer from "../containers/ListContainer";

const ListPage = ({...rest}) => {
    return (
        <>
            <ListContainer {...rest} />
        </>
    );
};

export default memo(ListPage);
