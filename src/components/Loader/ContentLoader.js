import React from 'react';
import PuffLoader from "react-spinners/PuffLoader";
import styled from "styled-components";

const Styled = styled.div`
  width: 100%;
  min-height: 25vh;
  display: flex;
  padding: 30px;
  justify-content: center;
  align-items: center;
`;
const ContentLoader = ({...rest}) => {
    return (
        <Styled {...rest} >
            <PuffLoader size={60} color="#72c02c" />
        </Styled>
    );

}

export default ContentLoader;
