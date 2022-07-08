const ParserPhone = (nextState) => {
    let { value } = nextState;
    if (value.endsWith("/")) {
        value = value.slice(0, -1);
    }
    return {
        ...nextState,
        value
    };
}

export default ParserPhone