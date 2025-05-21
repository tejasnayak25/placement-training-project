const URL  = "http://localhost:8080"

async function deleteById(id) {
    if(confirm(`Are you sure to delete employee ${id}?`)) {
        await fetch(`${URL}/employees/${id}`,{
            headers: {
                "Content-Type": "application/json"
            },
            method: "DELETE"
        }).then(res => res.json())
        .then(res => {
            alert('Employee data deleted successfully');
            window.location.reload();
        }).catch(err => {
            console.error(err.message)
        })
    } else {
        alert('delete terminated')
    }
}

async function readEmps() {
    await fetch(`${URL}/employees`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "GET"
    })
    .then(res => res.json())
    .then(res => {
        printEmps(res)
    }).catch(err => {
        console.error(err.message)
    })
}

readEmps();

let tableEl = document.getElementById("employeeList")

function printEmps(data) {
    data.forEach(function(item,index){
        tableEl.innerHTML += `<tr>
            <td> ${item.id} </td>
            <td> ${item.name} </td>
            <td> ${item.email} </td>
            <td> ${item.mobile} </td>
            <td> ${item.gender} </td>
            <td>${item.job}</td>
            <td> ${item.address} </td>
            <td class="btn-list">
                <a href="update.html?empId=${item.id}" class="btn info">Edit</a>
                <button onclick="deleteById('${item.id}')" class="btn danger">Delete</button>
            </td>
        </tr>`
    })
}