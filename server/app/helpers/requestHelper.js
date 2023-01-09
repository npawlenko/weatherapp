const response = (payload, status=true) => {
    if(status)
        return payload;
    return {
        error: payload
    };
};

module.exports = {
    response
};