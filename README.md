# fancy-to-do
fancy-to-do is an app to manage your todo list. This app has :
* RESTful endpoint for asset's CRUD operation
* JSON formatted response
* Authentication with JSONWebToken
* Google Login
* Integreates Aladhan API to add prayer times to your daily routine

&nbsp;

## RESTful endpoints

---

### GET /todos
> Get all todo items from database

_Request Header_
```
{
  "Content-Type": "application/json; charset=utf-8",
  "accessToken": "<access_token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "todos": [
        {
            "id": 1,
            "title": "title1",
            "description": "description1",
            "status": "pending",
            "due_date": "2020-10-10T00:00:00.000Z",
            "createdAt": "2020-03-30T09:40:40.159Z",
            "updatedAt": "2020-03-30T09:40:40.159Z"
        },
        {
            "id": 2,
            "title": "title2",
            "description": "description2",
            "status": "pending",
            "due_date": "2020-10-10T00:00:00.000Z",
            "createdAt": "2020-03-30T09:40:53.659Z",
            "updatedAt": "2020-03-30T09:40:53.659Z"
        },
        {
            "id": 3,
            "title": "title3",
            "description": "description3",
            "status": "pending",
            "due_date": "2020-10-10T00:00:00.000Z",
            "createdAt": "2020-03-30T09:41:02.986Z",
            "updatedAt": "2020-03-30T09:41:02.986Z"
        }
    ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```
---
### GET /todos/:id
> Get todo item by id

_Request Header_
```
{
  "Content-Type": "application/json; charset=utf-8",
  "accessToken": "<access_token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "todo": {
        "id": 1,
        "title": "title1",
        "description": "description1",
        "status": "pending",
        "due_date": "2020-10-10T00:00:00.000Z",
        "createdAt": "2020-03-30T09:40:40.159Z",
        "updatedAt": "2020-03-30T09:40:40.159Z"
    }
}
```

_Response (404 - Not Found)_
```
{
    "message": "Todo not found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```
---
### POST /todos
> Add todo item to database

_Request Header_
```
{
  "Content-Type": "application/json; charset=utf-8",
  "accessToken": "<access_token>"
}
```
_Request Body_
```
{
    "title": "title4",
    "description": "description4",
    "status": "pending",
    "due_date": "2020-10-10",
}
```
_Response (201 - Created)_
```
{
    "todo": {
        "id": 4,
        "title": "title4",
        "description": "description4",
        "status": "pending",
        "due_date": "2020-10-10T00:00:00.000Z",
        "updatedAt": "2020-03-30T10:16:22.966Z",
        "createdAt": "2020-03-30T10:16:22.966Z"
    }
}
```

_Response (400 - Bad Request)_
```
{
    "message": "Validation error: Validation notEmpty on description failed"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```
---

### PUT /todos/:id
> Edit todo item in database by id

_Request Header_
```
{
  "Content-Type": "application/json; charset=utf-8",
  "accessToken": "<access_token>"
}
```
_Request Body_
```
{
    "title": "edited title1",
    "description": "edited description1",
    "status": "completed",
    "due_date": "2020-10-10",
}
```
_Response (201 - OK)_
```
{
    "todo": {
        "id": 1,
        "title": "edited title1",
        "description": "edited description1",
        "status": "completed",
        "due_date": "2020-10-10T00:00:00.000Z",
        "createdAt": "2020-03-30T09:40:40.159Z",
        "updatedAt": "2020-03-30T10:34:44.625Z"
    }
}
```

_Response (400 - Bad Request)_
```
{
    "message": "Validation error: Validation notEmpty on description failed"
}
```

_Response (404 - Not Found)_
```
{
    "message": "Todo not found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```
---

### DELETE /todos/:id
> Delete todo item from database by id
_Request Header_
```
{
  "Content-Type": "application/json; charset=utf-8",
  "accessToken": "<access_token>"
}
```
_Request Body_
```
not needed
```
_Response (201 - OK)_
```
{
    "todo": {
        "id": 5,
        "title": "title5",
        "description": "description5",
        "status": "pending",
        "due_date": "2020-10-10T00:00:00.000Z",
        "createdAt": "2020-03-30T10:27:32.223Z",
        "updatedAt": "2020-03-30T10:27:32.223Z"
    }
}
```

_Response (404 - Not Found)_
```
{
    "message": "Todo not found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```
---

### DELETE /pray
> Add 5 daily prayers to list

_Request Header_
```
{
  "Content-Type": "application/json; charset=utf-8",
  "accessToken": "<access_token>"
}
```

_Request Body_
```
not needed
```

_Response (201 - OK)_
```
{
  "message": "Added 5 Prayers for today"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```
---

### Post /register
> Register Account to Databse

_Request Header_
```
{
  "Content-Type": "application/json; charset=utf-8",
}
```

_Request Body_
```
not needed
```

_Response (201 - OK)_
```
{
    "user": {
        "email": <email>,
        "password": <password>,
    }
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

---

### Post /login
> Login User to Website

_Request Header_
```
{
  "Content-Type": "application/json; charset=utf-8",
}
```


_Request Body_
```
{
   "email": <email>,
   "password": <password>,
}
```

_Response (201 - OK)_
```
{
    "user": {
        "email": <email>,
        "password": <password>,
    }
}
```

_Response (400 - Bad Request)_
```
{
    "message": "Invalid Email/Password"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

---
### Post /loginGoogle
> Login User to Website with Google Account


_Request Header_
```
{
  "Content-Type": "application/json; charset=utf-8",
}
```

_Request Body_
```
{
   "token": <id_token>,
}
```

_Response (200)_
```
{
  "accessToken": "<access_token>"
}
```


_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```



---

