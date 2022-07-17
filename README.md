Structure:
This project conatains two application:
- server app (inside of './server' folder)
- client app (inside of './client' folder)

Task related to client app. So, everything what you have to do you will do it inside of './client' folder

Steps:
1. Download and install node here - https://nodejs.org/en/ (if needed)
2. Open project using VSC or some other code editor
3. Run command in terminal (inside of this folder): npm run setup (it should install all dependencies)
4. Run commant in terminal (inside of this folder): npm run start_server (it should start server app)
5. Open additional terminal and run command: npm run start_client (it should start client app)

API
Client app should use api provided by server app.
Here is endpoints description:

MAIN_URL = http://localhost:8080/

GET LIST OF USERS
url: MAIN_URL + 'users' 
method: GET 
response: {
    "success": true,
    "result": array of strings // usernames
}

CREATE MESSAGE
url: MAIN_URL + 'message' 
method: POST 
body: { 
	title: string, // message text
	username: string, // message creater/sender username !!! should be one of users from GET LIST OF USERS request
	to: string, // message reciever username !!! should be one of users from GET LIST OF USERS request
} 
response: {
    "success": true,
    "result": {
        "id": number,
        "title": string,
        "username": string,
        "to": string,
        "likes": array of usernames,
        "dislikes": array of usernames,
        "date": timestamp,
    }
}

EDIT MESSAGE
url: MAIN_URL + 'message/:id'
method: PUT
body: { 
	title: string, // message text OPTIONAL
	dislikes: array of usernames OPTIONAL
	likes: array of usernames OPTIONAL
}
response: {
    "success": true,
    "result": {
        "id": number,
        "title": string,
        "username": string,
        "to": string,
        "likes": array of usernames,
        "dislikes": array of usernames,
        "date": timestamp,
    }
}
}

GET USER'S MESSAGES (messages beatween two users / chat messages)
url: MAIN_URL + 'message/page/:pageNumber/:userName1/:userName2'
method GET
response: {
    "success": boolean,
    "result": [
        {
            "id": number,
            "title": string,
            "username": string,
            "to": string,
            "likes": array,
            "dislikes": array,
            "date": timestamp,
            "comments": array,
        },
        ...
    ],
    "totalPages": number,
    "total": number,
    "page": number,
}

DELETE MESSAGE
url: MAIN_URL + 'message/:id'
method DELETE
response : {
    "success": true,
    "result": {
        "id": number,
        "title": string,
        "username": string,
        "to": string,
        "likes": array of usernames,
        "dislikes": array of usernames,
        "date": timestamp,
    }
}

GET MESSAGE
url: MAIN_URL + 'message/:id'
method GET

CREATE COMMENT
url: MAIN_URL + 'comment'
method: POST
body: {
    "text": string, // commen's text
    "username": string, // !!! should be one of users from GET LIST OF USERS request
    "postId": number // message id
}
response: {
    "success": boolean,
    "result": {
        "id": number,
        "text": string,
        "username": string,
        "postId": number,
        "likes": array,
        "dislikes": array,
        "date": timestamp,
    }
}

EDIT COMMENT
url: MAIN_URL + 'comment'
method: PUT
body: {
	text: string OPTIONAL
	dislikes: array of usernames OPTIONAL
	likes: array of usernames OPTIONAL
}
response: {
    "success": boolean,
    "result": {
        "id": number,
        "text": string,
        "username": string,
        "postId": number,
        "likes": array,
        "dislikes": array,
        "date": timestamp,
    }
}

DELETE COMMENT
url: MAIN_URL + 'comment'
method: DELETE
response: {
    "success": boolean,
    "result": {
        "id": number,
        "text": string,
        "username": string,
        "postId": number,
        "likes": array,
        "dislikes": array,
        "date": timestamp,
    }
}

GET COMMENT
url: MAIN_URL + 'comment/:id'
method: GET

SOCKET
url: "http://localhost:8081"
event: "message"
transports: ["websocket", "polling"]