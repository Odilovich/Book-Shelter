"use strict";

let logOut = $('#logout-btn');
let bookWrapper = $('.book-wrapper');
let inputSearch = $('#search-input');
let resultCount = $('.result-count');

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

// render card

let baseURL = 'https://www.googleapis.com/books/v1/volumes?q=harry&startIndex=1'

async function render() {
    try {
        let response = await fetch(`${baseURL}`)
        let result = await response.json()
        renderAllBooks(result)
    } catch(err) {
        console.log(err);
    }
}
render()

function renderAllBooks(data) {
    console.log(data);
    if (data.items.length) {
        data.items.forEach((el) => {
            let div = createElement('div', 'w-[300px] h-[441px] shadow-md rounded-[8px] bg-white py-[13px] px-[17px]', `
                                    <div class="grid place-content-center w-[249px] h-[238px] bg-[#F8FAFD] rounded-[5px] mb-[19px]">
                                        <img src="${el.volumeInfo.imageLinks.thumbnail}" alt="img">
                                    </div>
                                    <div>
                                        <p class="book-title font-semibold text-[18px]">${el.volumeInfo.title.length > 25 ? el.volumeInfo.title.substring(0, 23) + " ..." : el.volumeInfo.title}</p>
                                        <span class="block text-[13px] text-[#757881]">${el.volumeInfo.authors}</span>
                                        <span class="block text-[13px] text-[#757881] mb-[10px]">${el.volumeInfo.publishedDate}</span>
                                        <div class="flex justify-between mb-[5px]">
                                            <button class="w-[130px] h-[37px] font-semibold text-[14px] bg-[#0D75FF0D] rounded-[4px] text-[rgb(255,0,0)] hover:bg-[#FFD80D] hover:text-[#000] duration-150">Bookmark</button>
                                            <button class="w-[130px] h-[37px] font-semibold text-[14px] bg-[#0D75FF0D] rounded-[4px] text-[#0D75FF] hover:bg-[#FFD80D] hover:text-[#000] duration-150">More Info</button>
                                        </div>
                                        <button class="w-full h-[37px] font-semibold text-[14px] bg-[#75828A] hover:bg-[#75828a9f] duration-100 hover:text-[#2c2c2cce] rounded-[4px] text-white">Read</button>
                                    </div>
            `)
            bookWrapper.appendChild(div)
        })
    } else {
        bookWrapper.innerHTML = "Not found"
    }
}

renderAllBooks(result)

// // ------------- Filter Search Movies ---------------/>

inputSearch.addEventListener('keyup', (el) => {
    if (el.keyCode == 13) {
        bookWrapper.innerHTML = ""
    setTimeout(()=> {
        searchBooks(el)
    },1800)
    }
})
function searchBooks(data) {
    const searchResult = result.filter((el) => el.volumeInfo.title.toLowerCase().includes(data.toLowerCase()))
    
    if (searchResult.length) {
        bookWrapper.innerHTML = ""
        resultCount.innerHTML = `Result: ${searchResult.length} movies found`;
        renderAllBooks(searchResult)
    }
    else {
        resultCount.innerHTML = ""
        bookWrapper.innerHTML = `
        <div class="found">
        <h1 class=' font-bold text-red-600 font-serif text-3xl'>NO INFORMATION FOUND!</h1>
        <a href="/" class=" px-[16px] py-[8px]  bg-green-600 text-white rounded-lg my-6">Home</a>
        </div>
        `
    }
    
}