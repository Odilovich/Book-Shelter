"use strict";

let logOut = $('#logout-btn')

function qwqwrert() {
    let token = localStorage.getItem("token");
    if(!token) {
        window.location.href = "../../pages/login.html"
    }
}
qwqwrert()

function logOutFunction() {
    localStorage.removeItem("token");
    window.location.href = "../../pages/login.html"
}

logOut.addEventListener("click",() => {
    logOutFunction();
})