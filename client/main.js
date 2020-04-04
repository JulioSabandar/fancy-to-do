$(document).ready(function(){
    checkLogIn();
    $('#logInMenu').click(()=> {
        $('#logInDiv').show();
        $('#signUpDiv').hide();
        $('#message').text('');
    })
    $('#signUpMenu').click(()=> {
        $('#logInDiv').hide();
        $('#signUpDiv').show();
        $('#message').text('');
    })
    $('#logoutButton').click(()=>{
        localStorage.setItem("accessToken", '');
        checkLogIn();
        logOut();
        $('#message').text('Log Out Success')
    })
    $('#addButton').click(()=> {
        $('#addToDoDiv').show();
        $('#todoListDiv').hide();
        $('#actionButtons').hide();
    })
    $('#prayButton').click((e)=> {
        e.preventDefault();
        return $.ajax({
            url: 'http://localhost:5000/todos/pray/',
            method: 'POST',
            data: {
                city : 'Jakarta',
                country : 'Indonesia'
            },
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).done((data)=> {
            console.log(data);
            checkLogIn();
        }).fail(err => {
            $('#message').text(JSON.parse(err.responseText).message);
        })
    })
    $('#todoTable').on("click", "#editButton", (e)=> {
        e.preventDefault();
        let id = e.target.value;
        $('#editToDoDiv').show();
        $('#todoListDiv').hide();
        $('#actionButtons').hide();

        $.ajax({
            url: `http://localhost:5000/todos/${id}`,
            method: 'GET',
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).done((data)=> {
            console.log(data)
            $('#titleEdit').val(data.todo.title);
            $('#descriptionEdit').val(data.todo.description);
            $('#statusEdit').val(data.todo.status);
            $('#due_dateEdit').val(data.todo.due_date);
            $('#editForm').submit((e) => {
                e.preventDefault();
                let title = $('#titleEdit').val();
                let description = $('#descriptionEdit').val();
                let status = $('#statusEdit').val();
                let due_date = $('#due_dateEdit').val();
                $.ajax({
                    url: `http://localhost:5000/todos/${id}`,
                    method: 'PUT',
                    headers: {
                        accessToken: localStorage.getItem("accessToken")
                    },
                    data: {
                        title,
                        description,
                        status,
                        due_date
                    }
                }).done((data)=> {
                    console.log(data);
                    checkLogIn();
                })
            })

        }).fail(err => {
            $('#message').text(JSON.parse(err.responseText).message);
        })
    })
    
    $('#todoTable').on("click", "#deleteButton", (e)=> {
        let id = e.target.value;
        $.ajax({
            url: `http://localhost:5000/todos/${id}`,
            method: 'DELETE',
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).done((data)=> {
            console.log(data);
            checkLogIn();
        }).fail(err => {
            $('#message').text(JSON.parse(err.responseText).message);
        })
    })

    $('#signupForm').submit((e) => {
        e.preventDefault();
        let email = $('#emailSign').val();
        let password = $('#passwordSign').val();
        $.ajax({
            url: 'http://localhost:5000/register',
            method: 'POST',
            data: {
                email : email,
                password : password
            },
        }).done(function (data) {
            console.log(data);
            $('#signUpDiv').hide();
            $('#message').text('Sign Up Success')
            $('#emailSign').val('');
            $('#passwordSign').val('');
        }).fail((err) => {
            console.log(err);
            $('#message').text(JSON.parse(err.responseText).message);
        });
    })
    $('#loginForm').submit((e) => {
        e.preventDefault();
        let email = $('#emailLog').val();
        let password = $('#passwordLog').val();
        $.ajax({
            url: 'http://localhost:5000/login',
            method: 'POST',
            data: {
                email : email,
                password : password
            }
        }).done((data) => {
            localStorage.setItem("accessToken", data.accessToken);
            console.log(data.accessToken);
            $('#emailLog').val('');
            $('#passwordLog').val('');
            checkLogIn();
            $('#message').text('Log In Success');
        }).fail((err) => {
            $('#message').text(JSON.parse(err.responseText).message);
        });
    });
    $('#addForm').submit((e) => {
        let title = $('#titleAdd').val();
        let description = $('#descriptionAdd').val();
        let status = $('#statusAdd').val();
        let due_date = $('#due_dateAdd').val();
        $.ajax({
            url: 'http://localhost:5000/todos',
            method: 'POST',
            headers: {
                accessToken: localStorage.getItem("accessToken")
            },
            data: {
                title,
                description,
                status,
                due_date
            }
        }).done((data)=> {
            console.log(data);
            checkLogIn();
        }).fail(err=>{
            $('#message').text(JSON.parse(err.responseText).message);
        })
    })
});
function checkLogIn(){
    console.log('check log in')
    console.log(localStorage.getItem('accessToken'));
    if (localStorage.getItem('accessToken') == null || localStorage.getItem('accessToken')=='') {
        $('#homeDiv').show();
        $('#logInDiv').hide();
        $('#signUpDiv').hide();
        $('#todoListDiv').hide();
        $('#addToDoDiv').hide();
        $('#editToDoDiv').hide();
        $('#actionButtons').hide();

        $('#logoutButton').hide();
    } else {
        $('#homeDiv').hide();
        $('#logInDiv').hide();
        $('#signUpDiv').hide();
        $('#actionButtons').show();
        $('#todoListDiv').show();
        getTodos();
        $('#addToDoDiv').hide();
        $('#editToDoDiv').hide();
        $('#logoutButton').show();
    }
}

function getTodos(){
    if (localStorage.getItem('accessToken') != null && localStorage.getItem('accessToken') !=''){
        return $.ajax({
            url: "http://localhost:5000/todos",
            type: "GET",
            headers: {
              accessToken: localStorage.getItem("accessToken")
            }
        }).done((data)=> {
            if(data.todos.length > 0){
                console.log(data)
                $('#tableBody').empty();
                for(let i=0; i<data.todos.length; i++){
                    $('#tableBody').append(`
                    <tr>
                        <td> ${data.todos[i].title}  </td>
                        <td> ${data.todos[i].description} </td>
                        <td> ${data.todos[i].status} </td>
                        <td> ${data.todos[i].due_date} </td>
                        <td> 
                            <button id="editButton" type="button" value = "${data.todos[i].id}" class="btn btn-primary btn-sm">Edit</button>
                            <button id="deleteButton" value = "${data.todos[i].id}" class="btn btn-secondary btn-sm">Delete</button>
                        <td>
                    </tr>
                    `)    
                }
                $('#todoListDiv').show();
                $('#message2').text('')
            }else{
                console.log('hfsdjnfwjfwfn')
                $('#todoTable').hide();
                $('#message2').text('You have nothing to do')
            }
        }).fail(err => {
            $('#message').text(JSON.parse(err.responseText).message);
        });
    } 
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method : 'POST',
        url: 'http://localhost:5000/loginGoogle',
        data : {
            token: id_token
        },
        statusCode: {
            200: function (response) {
                localStorage.setItem('accessToken', response.accessToken);
                checkLogIn();
            }
        }
    })
}
function logOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}
