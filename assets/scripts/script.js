const listUsers = document.querySelector(".list");
const buttonSort = document.querySelector(".sort__button");
const spanA_ZtoZ_A = document.querySelector("span");
/////
const renderFunction = (firstname, lastname, phoneNumber) => {
    const li = document.createElement("li");
    const p = document.createElement("p");
    const a = document.createElement("a");

    p.innerText = `Имя: ${
        firstname.charAt(0).toUpperCase() + firstname.slice(1)
    } ${lastname.charAt(0).toUpperCase() + lastname.slice(1)}`;

    a.innerText = `Телефон:${phoneNumber}`;
    a.setAttribute("href", "#");

    li.append(p, a);

    listUsers.append(li);

    a.addEventListener("click", () => {
        alert(phoneNumber);
    });
};
////
let arrSort = [];
fetch("https://fakestoreapi.com/users")
    .then((res) => res.json())
    .then((json) => {
        json.forEach((el) => {
            renderFunction(el.name.firstname, el.name.lastname, el.phone);
        });
        arrSort = arrSort.concat(json);
    });
/////
let isActive = true;
let sortArray;
/////
buttonSort.addEventListener("click", () => {
    listUsers.innerHTML = "";
    if (isActive) {
        sortArray = arrSort.sort((a, b) => {
            if (a.name.firstname < b.name.firstname) {
                return -1;
            }
            if (a.name.firstname > b.name.firstname) {
                return 1;
            }
            return 0;
        });
        sortArray.forEach((el) => {
            renderFunction(el.name.firstname, el.name.lastname, el.phone);
        });
        spanA_ZtoZ_A.innerText = "(Z-A)";
    } else {
        sortArray = sortArray.sort((a, b) => {
            if (a.name.firstname > b.name.firstname) {
                return -1;
            }
            if (a.name.firstname < b.name.firstname) {
                return 1;
            }
            return 0;
        });
        sortArray.forEach((el) => {
            renderFunction(el.name.firstname, el.name.lastname, el.phone);
        });
        spanA_ZtoZ_A.innerText = "(A-Z)";
    }
    isActive = !isActive;
});