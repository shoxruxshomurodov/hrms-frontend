import React from 'react';
import {useParams} from "react-router-dom";
import TaskDetailContainer from "../containers/TaskDetailContainer";

const TaskDetailPage = (props) => {
    const {id} = useParams();
    return (
      <TaskDetailContainer id={id} {...props} />
    );
};

export default TaskDetailPage;
