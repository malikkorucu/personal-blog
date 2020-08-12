const comparePasswords = (pass1, pass2) => {
    return pass1 === pass2;
};


const sendTokenToClient = (user) => {
    const { EXPIRES_IN } = process.env;
    let token = user.generateJwtToken();
    //1 DK SÜRESİ VAR
    //3 saat farkını 10800000 ms ile kapattım
    const expireDate = new Date(
        Date.now() + parseInt(EXPIRES_IN)
    ).toGMTString();

    return { access_token: token, expireDate, expiresIn: EXPIRES_IN };
};

module.exports = {
    comparePasswords,
    sendTokenToClient
};