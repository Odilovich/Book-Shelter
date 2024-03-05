"use strict";

let submitForm = $('#submit-form');
let userName = $('#username');
let password = $('#password');
let loginBtn = $('#login-btn')


let baseUrl = `https://fakestoreapi.com`;


async function authorization() {
    const user = {
        username:userName.value,
        password: password.value
    }

    try {

        if(user.password.trim().length === 0 || user.username.trim().length === 0) {
            alert(`Iltimos formni to'ldiring`)
        }else {
            const response = await fetch(`${baseUrl}/auth/login`, {
                method:"POST",
                headers: {
                    "Content-Type":"appLication/json"
                },
                body:JSON.stringify(user)
            });

            const result = await response.json();

            localStorage.setItem('token', result.token);

            if(localStorage.getItem('token')) {
                window.location.href = "../../index.html"
            }
        }

    }catch {
        console.log("mana xatolik:" , err);
    }
}


submitForm.addEventListener("submit", (e)=> {
    e.preventDefault();

    authorization();
})