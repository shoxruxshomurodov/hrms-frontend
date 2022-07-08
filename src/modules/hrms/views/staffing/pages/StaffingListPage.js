import React from 'react';
import StaffingListContainer from "../containers/StaffingListContainer";
import styled from "styled-components";

const StyledPage = styled.div`
th{
  text-align: center;
  vertical-align: middle;
}
  td{
    vertical-align: middle;
    text-align: center;
  }
  .g-bg-teal td{
    text-align: left;
  }
  .table-striped tbody tr:not(.g-bg-teal){
    background-color: unset !important;
  }
  
  .flex-display-more{
    justify-content: center ;
  }
  .table thead th{
    vertical-align: middle;
  }
`;
const StaffingListPage = ({...rest}) => {
    return (
        <StyledPage>
            <StaffingListContainer {...rest} />
        </StyledPage>
    );
};

export default StaffingListPage;
