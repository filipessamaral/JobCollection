# Job Posting Node.js Web Server

## Description

This Node.js web server built with Express.js handles a data collection of job
posting sentences. It provides a simple API for performing CRUD operations on
the job postings and includes a translation service integration. The server uses
in-memory storage for the job postings.

## Setup

To set up the project, follow these steps:

1. Replace the `.env.sample` file with a new file named `.env`.
2. Configure the following environment variables in the `.env` file:

- **PORT**: Set the port number you want the server to listen on.
- **GOOGLE_APPLICATION_CREDENTIALS**: Provide the path to the Firebase
  credentials file. You need to create a Firebase account and obtain the
  credentials file to use Firebase services.
- **DEEPL_KEY**: Add your DeepL API key obtained by creating an account on
  [DeepL](https://www.deepl.com/).
- **JWT_SECRET**: Set a secret string for JWT (JSON Web Token) authentication in
  the application.

Start the project:
  - `npm install`
  - `npm run start`
  
## Usage

The project consists of two main components: the API and scripts.

### API

The API provides a basic CRUD (Create, Read, Update, Delete) functionality for
managing job postings. To access the full CRUD operations, you need to generate
a JWT token by calling the login endpoint:

e.g

```shell
curl --location 'localhost:3000/api/authentication/login' \
--header 'Content-Type: application/json' \
--data '{
    "user": "Random Name",
    "password": "Random Password"
}'
```

Include the generated JWT token in the headers for subsequent POST, PUT, and
DELETE operations using the "Authorization" header.

Translation service is also integrated into the API. To translate a sentence,
you can use the following endpoint:

e.g

```shell
curl --location 'localhost:3000/api/sentences/translate/5?lang=NL'
```

I the root of this project there is a
[Postman Collection](JobCollections.postman_collection.json) with all the
routes.

### Scripts

There are two main scripts included in this project:

1. **Firebase Sync**: This script synchronizes the data in this repository with
   a different data structure in Firebase. To run the script, use the following
   command: `npm run firebase`

2. **Word Count**: This script retrieves the 100 most frequently used words. To
   run the script, use the following command: `npm run wordCount`

Run test's with `npm run test`

Node.js Version used: 18.16.0
