import React, {Component} from 'react';
import { css } from "@emotion/react";
import PuffLoader from "react-spinners/PuffLoader";
class OverlayLoader extends Component {
    render() {
        const override = css`
	display: block;
	margin: 0 auto;
	border-color: blue;
`;
        const style = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            minHeight: '100vh',
            position:'fixed',
            top:'0px',
            left:'0px',
            zIndex:9999
        };
        return (
            <div style={style}>
                <PuffLoader size={60} color="#72c02c" css={override} />
            </div>
        );
    }
}

export default OverlayLoader;
