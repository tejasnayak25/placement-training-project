
// dom id targets
let nameEl = document.getElementById("name")
let emailEl = document.getElementById("email")
let mobileEl = document.getElementById("mobile")
let genderEl = document.getElementById("gender")
let addressEl = document.getElementById("address")

// server url
const URL = "http://localhost:8080"

let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("empId")

// read the data from api
async function readEmpById() {
    await fetch(`${URL}/employees/${id}`,{
        headers: {
            "Content-Type": "application/json"
        },
        method: "GET"
    }).then(res => res.json())
    .then(res => {
        nameEl.value = res.name;
        emailEl.value = res.email;
        mobileEl.value = res.mobile;
        genderEl.value = res.gender;
        addressEl.value = res.address;
    }).catch(err => console.error(err.message))
}

readEmpById();

async function submitHandler(event) {
    event.preventDefault();

    let newEmp = {
        name: nameEl.value,
        email: emailEl.value,
        mobile: mobileEl.value,
        gender: genderEl.value,
        address: addressEl.value
    }

    await fetch(`${URL}/employees/${id}`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify(newEmp)
    }).then(res => res.json())
    .then(res => {
        alert('Employee data updated successfully')
        window.location.href = "/index.html";
    }).catch(err => {
        console.error(err.message)
    })
}