import React, {memo} from 'react';
import ListContainer from "../containers/ListContainer";

const ListPage = ({
                      match: {
                          params: {encoded = null}
                      },
                      ...rest
                  }) => {
    return (
        <>
            <ListContainer encoded={encoded} {...rest} />
        </>
    );
};

export default memo(ListPage);
