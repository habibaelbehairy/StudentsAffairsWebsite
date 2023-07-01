// go to page from select options in header
function goToPage() {
    var select = document.getElementById("studentoptions");
    var selectedOption = select.options[select.selectedIndex];
    if (selectedOption.value != "") {
        if (localStorage.getItem("isloggedin") === "true") {
            window.location.href = selectedOption.value;
        } else {
            alert("Please log in first");
            pop_up();
        }
    }
}

// change page from select options in active student table
function ChangePage(select) {
    var selectedOption = select.options[select.selectedIndex];
    if (selectedOption.value != "") {
        if (localStorage.getItem("isloggedin") === "true") {
            window.location.href = selectedOption.value;
        }
    }
}

//switch login and logout button
function switchbtn() {
    if (localStorage.getItem("isloggedin") === "true") {
        document.getElementById("btnlogin").style.zIndex = "1";
        document.getElementById("btnlogout").style.zIndex = "2";
    } else {
        document.getElementById("btnlogin").style.zIndex = "2";
        document.getElementById("btnlogout").style.zIndex = "1";
    }
}

//logout function
function logout() {
    localStorage.setItem("isloggedin", false);
    switchbtn();
    if (localStorage.getItem("isloggedin") === "false") {
        window.location.href = "";
        switchbtn();
    } else {
        window.location.href = window.location.href;
    }
}

//go to home page
function gotohomepage() {
    window.location.href = "/pages/Home/";
}

//check level and set department
function checklevel() {
    var select = document.getElementById("Level");
    var selectedOption = select.options[select.selectedIndex];
    if (selectedOption.value == "1" || selectedOption.value == "2") {
        document.getElementById("Department").value = "General";
    }
}

//remove access from logged out user from pressing back button to go to the previous page
window.onload = function () {
    switchbtn();
    if ((!window.location.href.indexOf("/about.html")) && localStorage.getItem("isloggedin") !== "true" && window.location.href.indexOf("/Home.html") === -1) {
        window.location.href = "/Home.html";
    }
};

//class for student object
class Student {
    constructor(name, ID, mobile, email, dateOfBirth, level, department, active, gender, gpa) {
        this.name = name;
        this.ID = ID;
        this.mobile = mobile;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.level = level;
        this.department = department;
        this.active = active;
        this.gender = gender;
        this.gpa = gpa;
    }
}

function validation(id) {
    var element = document.getElementById(id);
    if (element.value == "") {
        element.setCustomValidity("Please fill this field");
        return false;
    } else {
        element.setCustomValidity("");
    }
    return true;
}

function checkValidation() {
    validation("ID");
    validation("NameOfStudent");
    validation("Dateofbirth");
    validation("Level");
    validation("Department");
    validation("gpa");
}

//close the pop up screen for login page
function close_modal() {
    document.getElementById("login-modal").style.display = "none";
    document.getElementById("homeid").style.filter = "blur(0px)";
}

//pop up login screen
function pop_up() {
    document.getElementById("login-modal").style.display = "block";
    document.getElementById("homeid").style.filter = "blur(5px)";
}

// check valid users and password
function checkData() {
    const userName = document.querySelector(".EnterUsername").value;
    const password = document.querySelector(".EnterPassword").value;
    if ((userName === "Tawfik" && password === "12345") || (userName === "Habiba" && password === "123456") || (userName === "Amira" && password === "1234567") || (userName === "Omran" && password === "12345678") || (userName === "Alaa" && password === "123456789") || (userName === "Karem" && password === "1234567890")) {
        close_modal();
        localStorage.setItem("isloggedin", true);
        switchbtn();
    } else {
        alert("Username or password incorrect");
    }
}

function Search() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchbar");
    filter = input.value.toUpperCase();
    table = document.getElementsByClassName("tabledb")[0];
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

//==========================================================================================================================================

function getDataFromDB() {

    var url = window.location.pathname; // Get the current URL
    var parts = url.split('/'); // Split the URL by '/'
    var id = parts[parts.length - 2]; // Access the second-to-last part


    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/pages/studentinfo/' + id + '/');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var index = JSON.parse(xhr.responseText);
                console.log(index);
                document.getElementById("NameOfStudent").value = index.name;

                var active = document.getElementsByName('ActivationStutes');
                for (var i = 0; i < active.length; i++) {
                    if (active[i].value == (index.status ? "Active" : "Inactive")) {
                        active[i].checked = true;
                        break;
                    }
                }

                var gender = document.getElementsByName('Gender');
                for (var i = 0; i < gender.length; i++) {
                    if (gender[i].value == index.gender) {
                        gender[i].checked = true;
                        break;
                    }
                }

                document.getElementById("gpa").value = index.gpa;
                document.getElementById("Department").value = index.department;
                document.getElementById("Level").value = index.level;
                document.getElementById("Dateofbirth").value = index.date_of_birth;
                document.getElementById("Email").value = index.email;
                document.getElementById("Moblie").value = index.mobile;
                document.getElementById("ID").value = id;
            } else {
                console.error('Failed to fetch student data');
            }
        }
    };
    xhr.send();
}

// if condition to add the data in update page
if (window.location.href.includes('/pages/UpdateAndDelete')) {
    getDataFromDB();
}

var a = document.getElementById("myForm");
if (a) {
    a.addEventListener("submit", function (a) {
        a.preventDefault();
        // if (checkIdUpdate()) {
        updateStudentInfo();
        // }
    });
}

//function to update data of specific student in database
function updateStudentInfo() {

    const ID = document.querySelector("#ID").value;
    const name = document.querySelector("#NameOfStudent").value;
    const mobile = document.querySelector("#Moblie").value;
    const email = document.querySelector("#Email").value;
    const dateOfBirth = document.querySelector("#Dateofbirth").value;
    const level = document.querySelector("#Level").value;
    const department = document.querySelector("#Department").value;
    var active = document.getElementsByName('ActivationStutes');
    const gpa = document.querySelector("#gpa").value;

    var avtiveValue;
    for (var i = 0, length = active.length; i < length; i++) {
        if (active[i].checked) {
            avtiveValue = active[i].value == "Active" ? true : false;
            break;
        }
    }
    var gender = document.getElementsByName('Gender');
    var genderValue;
    for (var i = 0, length = gender.length; i < length; i++) {
        if (gender[i].checked) {
            genderValue = gender[i].value;
            break;
        }
    }

    var formData = new FormData();
    formData.append('ID', ID);
    formData.append('name', name);
    formData.append('mobile', mobile);
    formData.append('email', email);
    formData.append('date_of_birth', dateOfBirth);
    formData.append('level', level);
    formData.append('department', department);
    formData.append('status', avtiveValue);
    formData.append('gpa', gpa);
    formData.append('gender', genderValue);


    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/pages/update/', false);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    addCSRFToken(xhr); // Add CSRF token to the request headers

    xhr.onload = function () {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);


            if (avtiveValue == true) {
                window.location.href = "/pages/StudentDataBase/";
            } else {
                window.location.href = "/pages/studentStatusPage/";
            }

        } else {
            // Handle error case
        }
    }
    xhr.send(formData);
}

//==========================================================================================================================================

var dep = document.getElementById("dep");
if (dep) {
    dep.addEventListener("submit", function (dep) {
        dep.preventDefault();

        // if (checkIdUpdate()) {
        updatestuddep();
        // }
    });
}

function updatestuddep() {
    const name = document.querySelector("#NameOfStudent").value;
    const department = document.querySelector("#Department").value;
    const level = document.querySelector("#Level").value;
    const ID = document.querySelector("#ID").value;
    var formDep = new FormData();
    formDep.append('ID', ID);
    formDep.append('name', name);
    formDep.append('department', department);
    formDep.append('level', level);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/pages/updatedep/', false);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    addCSRFToken(xhr); // Add CSRF token to the request headers
    xhr.onload = function () {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            window.location.href = "/pages/StudentDataBase/";

        } else {
            // Handle error case
        }
    }
    xhr.send(formDep);
}

// 
if (window.location.href.includes('/pages/AssignDep')) {
    getDataFromDB_dep();
}

function getDataFromDB_dep() {
    var url = window.location.pathname; // Get the current URL
    var parts = url.split('/'); // Split the URL by '/'
    var id = parts[parts.length - 2]; // Access the second-to-last part
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/pages/depinfo/' + id + '/');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var index = JSON.parse(xhr.responseText);
                console.log(index);
                document.getElementById("NameOfStudent").value = index.name;
                document.getElementById("Department").value = index.department;
                document.getElementById("Level").value = index.level;
                document.getElementById("ID").value = id;
            } else {
                console.error('Failed to fetch student data');
            }
        }
    };
    xhr.send();

}

//=========================================================================================================================================

function getCSRFToken() {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.substring(0, 10) == ('csrftoken' + '=')) {
            return decodeURIComponent(cookie.substring(10));
        }
    }
    return null;
}

function addCSRFToken(xhr) {
    var csrftoken = getCSRFToken();
    if (csrftoken) {
        xhr.setRequestHeader('X-CSRFToken', csrftoken);
    }
}


function delete_student() {
    var confirmation = confirm("Are you sure you want to delete?");
    if (!confirmation) {
        return;
    }
    var id = document.getElementById("ID").value;
    var ajax = new XMLHttpRequest();
    ajax.open("POST", "/pages/deletestudent/" + id + "/", true);
    addCSRFToken(ajax);
    console.log(id);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var response = JSON.parse(ajax.responseText);
            if (response.redirect) {
                window.location.href = response.redirect;
            }
        }
    }
}

// CheckId if Exist in DataBase
// function checkid() {
//     return new Promise(function (resolve,reject){
//         const id = document.querySelector("#ID").value;
//         var xhr = new XMLHttpRequest();
//         xhr.open('GET', '/pages/CheckID/' + id + '/');
//         xhr.onreadystatechange = function() {
//         if (xhr.readyState === XMLHttpRequest.DONE) {
//             if (xhr.status === 200) {
//                     var index = JSON.parse(xhr.responseText);
//                     if(index.okId){
//                         console.log(index.okId);
//                         resolve(index.okId)
//                     }
//                     else{
//                         reject(false)
//                     }
//             } else {
//             console.error('Failed to fetch student data');
//             }
//         }
//         };
//         xhr.send();
//     })
//     return true;
// }

// ==========================student status page =========================

// GlobalIDs is an array used to save the current table IDs; its purpose is explained in the saveStatus function.
let GlobalIDs = [];

// viewAll function runs when you open the student status's page , it projects all active/inactive students


function clearTable() {
    let table = document.getElementById("statusTable");
    table.innerHTML = ' <thead>\n' +
        '            <tr>\n' +
        '                <th>Student Name</th>\n' +
        '                <th>Student ID</th>\n' +
        '                <th>Current Status</th>\n' +
        '            </tr>\n' +
        '        </thead>';

}

function viewAll() {
    $(document).ready(function () {
        $.ajax({
            url: '/pages/getStuds/',
            type: 'GET',
            success: function (response) {
                console.log(response)
                for (let i = 1; i < response.length; i++) {
                    GlobalIDs.push(response[i].id)
                    let table = document.getElementById("statusTable");
                    let row = table.insertRow(-1);

                    let nameCell = row.insertCell(0);
                    let idCell = row.insertCell(1);
                    let statusCell = row.insertCell(2);

                    nameCell.innerHTML = response[i].name;
                    idCell.innerHTML = response[i].id;
                    statusCell.innerHTML = `
        <label>
          <input type="radio" name=${"activity" + i} value="activity" id=${"active" + response[i].id}
                                                            ${response[i].status ? 'checked' : ''} style="display: inline-flex"> Active
        </label>
        
        <label>
          <input type="radio" name=${"activity" + i} value="inactivity" id=${"inactive" + response[i].id} 
                                                            ${!response[i].status ? 'checked' : ''}  style="display: inline-flex"> Inactive
        </label>`;

                    if (table.rows.length % 2 === 1) {
                        row.classList.add("even-row");
                    }
                }
            },
            error: function (xhr, status, error) {
                console.log(error);
            }
        });
    });
}

function searchByName(name) {
    GlobalIDs.length = 0;
    $(document).ready(function () {
        $.ajax({
            url: '/pages/getStuds/',
            type: 'GET',
            success: function (response) {
                clearTable();
                console.log(response)
                for (let i = 1; i < response.length; i++) {
                    // add space to name to handle (one word name) case in substring function >> e.g. (mohamed, kareem, alaa)
                    response[i].name += ' ';
                    let tempName = response[i].name.toLowerCase().substring(0, response[i].name.indexOf(' '));

                    // Revert to the original name.
                    response[i].name = response[i].name.slice(0, -1);

                    // If user input was the first name or full name, then pass .
                    if (name === tempName || name === response[i].name.toLowerCase()) {
                        GlobalIDs.push(response[i].id)
                        let table = document.getElementById("statusTable");
                        let row = table.insertRow();

                        let nameCell = row.insertCell(0);
                        let idCell = row.insertCell(1);
                        let statusCell = row.insertCell(2);

                        nameCell.innerHTML = response[i].name;
                        idCell.innerHTML = response[i].id;
                        statusCell.innerHTML = `
        <label>
          <input type="radio" name=${"activity" + i} value="activity" id=${"active" + response[i].id}
                                                            ${response[i].status ? 'checked' : ''} style="display: inline-flex"> Active
        </label>
        
        <label>
          <input type="radio" name=${"activity" + i} value="inactivity" id=${"inactive" + response[i].id} 
                                                            ${!response[i].status ? 'checked' : ''}  style="display: inline-flex"> Inactive
        </label>`;
                        if (table.rows.length % 2 === 1) {
                            row.classList.add("even-row");
                        }
                    }
                }
            }
            ,
            error: function (xhr, status, error) {
                console.log(error);
            }
        });
    })
    ;
}


function searchByID(ID) {
    GlobalIDs.length = 0;
    $(document).ready(function () {
        $.ajax({
            url: '/pages/getStuds/',
            type: 'GET',
            success: function (response) {
                clearTable();
                console.log(response)
                for (let i = 1; i < response.length; i++) {
                    if (response[i].id === ID) {
                        GlobalIDs.push(response[i].id)
                        let table = document.getElementById("statusTable");
                        let row = table.insertRow();

                        let nameCell = row.insertCell(0);
                        let idCell = row.insertCell(1);
                        let statusCell = row.insertCell(2);

                        nameCell.innerHTML = response[i].name;
                        idCell.innerHTML = response[i].id;
                        statusCell.innerHTML = `
        <label>
          <input type="radio" name=${"activity" + i} value="activity" id=${"active" + response[i].id}
                                                            ${response[i].status ? 'checked' : ''} style="display: inline-flex"> Active
        </label>
        
        <label>
          <input type="radio" name=${"activity" + i} value="inactivity" id=${"inactive" + response[i].id} 
                                                            ${!response[i].status ? 'checked' : ''}  style="display: inline-flex"> Inactive
        </label>`;
                    }


                }
            }
            ,
            error: function (xhr, status, error) {
                console.log(error);
            }
        });
    })
    ;

}

// Handle the event when the user clicks the search button.
document.addEventListener('click', () => {
    const searchButton = document.getElementById("search-button");
    const idOption = document.getElementById("idOption");

    searchButton.addEventListener("click", () => {
        // Get user input
        let userInputValue = document.getElementById('userInput').value;

        // If the user clicks search with the ID option selected, then search by ID; otherwise, search by name.
        if (idOption.checked) {
            searchByID(userInputValue);
        } else {
            searchByName(userInputValue.toLowerCase());

        }
    });
});

// Save status function runs when user click "save status" button , it
// saves the changes made by the user in the students' activity status.

function saveStatus() {

    // Flag is a boolean variable that determines whether the user changed at least one status.
    let flag = false;
    for (let i = 0; i < GlobalIDs.length; i++) {
        // We can easily access the current table that the user wants to save its status by assisting with GlobalIDs data.

        let getActive = "active" + GlobalIDs[i];
        console.log(getActive)
        let element = document.getElementById(getActive);
        let status = element.checked;

        postData([GlobalIDs[i], status]);

    }
}

function postData(dataToPost) {
    $(document).ready(function (e) {
        // e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/pages/updateStatus/',
            data: {
                'id': dataToPost[0],
                'status': dataToPost[1],
            },
            success: function (response) {
                console.log("Data posted!");
                console.log(response);
            },
            error: function (xhr, status, error) {
                console.log(error);
            }
        });
    });
}

$(document).ready(function () {
    viewAll();
});

