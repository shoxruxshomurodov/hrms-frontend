import React, {Component} from 'react';
import TokenConfirmContainer from "./Container";
class TokenConfirmPage extends Component {
    render() {
        const {token} = this.props.match.params;
        return (
            <TokenConfirmContainer token={token} />
        );
    }
}

export default TokenConfirmPage;
