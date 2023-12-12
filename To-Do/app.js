let submit = document.getElementById("submit");

let gArr = []
let editItem = '';

// Load data from local storage on page load
loadDataFromLocalStorage();

cardPrint();
submit.addEventListener('click', todoHandler);


//this is for todo
function todoHandler() {
    let msg = document.getElementById("msg");
    // console.log("you clicked"+msg);
    if (!msg.value) {
        alert("Input cant be blank");
    }
    else {
        if (editItem) {
            let newArr = gArr.map((item) => {
                if (item.id == editItem.id) {
                    let obj = { id: item.id, text: msg.value };
                    return obj;
                }
                else {
                    return item;
                }
            })
            gArr = newArr;
            editItem = '';
            submit.innerText = "submit";
        }
        else {
            let obj = {
                id: Math.trunc(Math.random() * 10000),
                text: msg.value
            };
            // console.log(obj);
            gArr.unshift(obj);
            // console.log(gArr);
        }
        saveDataToLocalStorage();
        cardPrint();
    }
    //after submit input must be clear
    msg.value = "";

}


//functionality for delete btn

function deleteHandler(id) {
    gArr = gArr.filter((item) => {
        return item.id != id;
    });
    saveDataToLocalStorage();
    cardPrint();
}

//functionality for edit btn

function editHandler(id) {
    let findData = gArr.find((item) => {
        // console.log('clicked on edit',item)
        return item.id == id;
    })
    editItem = findData;
    // console.log(editItem);
    msg.value = findData.text;
    submit.innerText = "UPDATE";
}


//for printing card

function cardPrint() {
    let template = '';
    let body = document.getElementById("body");
    let count = document.getElementById("count");
    let todolength = gArr.length;
    if (gArr.length == 0) {
        template += '<h3 style="text-align:center">No Data</h3>'
    }
    else {
        gArr.forEach((item) => {
            // console.log(item);
            template += `<div class="col-md-3 m-3" >
            <div class="card bg-dark text-white">
       <div class="card-body">
         <p>${item.text}</p>
       </div>
       <div class="card-footer">
         <div class="d-flex justify-content-between">
           <button class="btn btn-primary" onclick="editHandler(${item.id})">edit</button>
           <button class="btn btn-danger" onclick="deleteHandler(${item.id})">delete</button>
         </div>
       </div>
     </div>
   </div>`
        })
    }

    body.innerHTML = template;
    count.innerText = todolength;
}

//functionality for clearall

let clear = document.getElementById("clear");
clear.addEventListener("click", () => {
    gArr = [];
    saveDataToLocalStorage();
    cardPrint();
})

function saveDataToLocalStorage() {
    localStorage.setItem("todoData", JSON.stringify(gArr));
}
function loadDataFromLocalStorage() {
    const storedData = localStorage.getItem("todoData");
    if (storedData) {
        gArr = JSON.parse(storedData);
    }
}


