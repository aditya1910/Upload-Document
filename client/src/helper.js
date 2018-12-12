/**
 * Module which save/remove token and clientID
 */

function getCookieByName(name) {
    var matches = document.cookie.match(
        new RegExp(
            '(?:^|; )' +
                name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
                '=([^;]*)',
        ),
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setAccessToken(token) {
    document.cookie = `token=${token}`;
}

function setUserId(userId) {
    document.cookie = `userId=${userId}`;
}

function getUserId() {
    return getCookieByName('userId');
}

function getAccessToken() {
    return getCookieByName('token');
}

function setAuth(auth) {
    console.log(auth);
    localStorage.setItem('isDisabled', false);
    setAccessToken(auth.token);
    setUserId(auth.user.userId);
    return;
}

function getAuth() {
    return {
        token: getAccessToken(),
    };
}

function removeAuth() {
    localStorage.removeItem('isDisabled');
    document.cookie = 'token=';
}

function checkAuth() {
    console.log('hahahah');
    var auth = getAuth();
    if (auth.token) return true;
    else return false;
}

export {
    setAuth,
    setAccessToken,
    getAccessToken,
    getAuth,
    removeAuth,
    checkAuth,
    getUserId,
};
