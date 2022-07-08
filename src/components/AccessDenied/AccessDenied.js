import * as React from 'react';
import {useHistory} from "react-router";
import {Button, Result} from "antd";

export default function AccessDenied() {
    const history = useHistory();
    return (
        <Result
            status="403"
            title="Доступ запрешен"
            subTitle="У вас нету доступа на данную страницу."
            extra={<Button type="primary" onClick={() => history.push("/")}>Перейти на главную страницу</Button>}
        />
    );
};