import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {get, isEmpty} from "lodash";
import CreateForm from "../../containers/Form/Form";
import CustomButton from "../../containers/Form/component/Common/Button";
import {ReactEIMZO} from "../../services/e-imzo";

const Styled = styled.div`
  .close-eimzo{
    position: absolute;
    right: 15px;
    top: 15px;
    cursor: pointer;
    font-weight: 700;
    font-size: 24px;
  }
`;

const Eimzo = ({
                   eSign = () => {
                   },
                   onClose = () => {},
                   ...rest
               }) => {
    const [keys, setKeys] = useState([]);
    const [result, setResult] = useState(null);


    useEffect(() => {
        initEIMZO();
    }, [])


    const initEIMZO = async () => {
        await ReactEIMZO.install();
        const allKeys = await ReactEIMZO.listAllUserKeys();
        await setKeys(allKeys);
    }


    const values = [
        {
            id: 1,
            label: "Select key",
            name: "key",
            type: "select",
            options: keys.map(key => ({value: key, label: get(key, 'CN', '-')})),
            params: {required: true},
            column: [2, 10],
        },
    ];

    const create = async (values) => {
        const {key} = values;
        let res = await ReactEIMZO.signPkcs7(key, 'Hello world');
        await setResult(res);
        console.log('result', res)
        eSign(res);
    }


    return (
        <Styled {...rest}>
            <div
                className="custombox-overlay custombox-fadein custombox-open"
                style={{backgroundColor: "rgb(0, 0, 0)"}}
            />
            <div
                className="custombox-content custombox-x-center custombox-y-center custombox-fadein custombox-open"
                style={{animationDuration: "300ms", animationDelay: "150ms"}}
            >

                <div
                    id="modal1"
                    className="text-left g-bg-white  g-pa-20 position-relative"
                    style={{display: "block", width: 800, minHeight: "400px"}}
                >
                    <h1>Select key</h1>  <i onClick={onClose} className="hs-icon hs-icon-close close-eimzo" />
                    <CreateForm
                        formRequest={create}
                        values={values}
                        CustomButton={CustomButton}
                        cancelLink={null}
                        buttonText={"Sign"}
                        params={{required: false}}
                        property={{disabled: false}}
                    />
                </div>
            </div>
        </Styled>
    );
};

export default Eimzo;