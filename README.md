# Files Manager Project README

## Introduction

Welcome to the Files Manager project! This project is part of the back-end trimester at Holberton School, focusing on authentication, NodeJS, MongoDB, Redis, pagination, and background processing. The objective is to build a simple platform for uploading and viewing files. This README provides comprehensive information about the project, its structure, and how to set it up.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Resources](#resources)
3. [Learning Objectives](#learning-objectives)
4. [Requirements](#requirements)
5. [Getting Started](#getting-started)
6. [Tasks](#tasks)
    - [Task 0: Redis Utils](#task-0-redis-utils)
    - [Task 1: MongoDB Utils](#task-1-mongodb-utils)
    - [Task 2: First API](#task-2-first-api)
    - [Task 3: Create a New User](#task-3-create-a-new-user)
    - [Task 4: Authenticate a User](#task-4-authenticate-a-user)
    - [Task 5: First File](#task-5-first-file)
    - [Task 6: Get and List Files](#task-6-get-and-list-files)
    - [Task 7: File Publish/Unpublish](#task-7-file-publish-unpublish)
    - [Task 8: File Data](#task-8-file-data)
7. [Contact Information](#contact-information)
8. [License](#license)

## Project Overview

This project involves building a platform for uploading and viewing files, focusing on back-end technologies such as authentication, NodeJS, MongoDB, Redis, pagination, and background processing. The platform includes features like user authentication, file listing, uploading, permission changes, viewing, and thumbnail generation for images.

## Resources

Before starting the project, make sure to review the following resources:

- [Node JS Getting Started](https://nodejs.org/en/docs/)
- [Process API Documentation](https://nodejs.org/api/process.html)
- [Express Getting Started](https://expressjs.com/en/starter/installing.html)
- [Mocha Documentation](https://mochajs.org/)
- [Nodemon Documentation](https://nodemon.io/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Bull Documentation](https://optimalbits.github.io/bull/)
- [Image Thumbnail](https://www.npmjs.com/package/image-thumbnail)
- [Mime-Types](https://www.npmjs.com/package/mime-types)
- [Redis](https://redis.io/)

## Learning Objectives

By the end of this project, you are expected to:

- Create an API with Express.
- Implement user authentication.
- Store data in MongoDB.
- Store temporary data in Redis.
- Setup and use a background worker.

## Requirements

- Allowed editors: vi, vim, emacs, Visual Studio Code.
- All files should be interpreted/compiled on Ubuntu 18.04 LTS using Node (version 12.x.x).
- Code should use the `.js` extension.
- Code will be verified against lint using ESLint.

## Getting Started

1. Clone the repository from [GitHub](https://github.com/your_username/alx-files_manager).
2. Navigate to the project folder.
3. Run `npm install` to install the necessary dependencies.

## Tasks

### Task 0: Redis Utils

Inside the `utils` folder, create a file `redis.js` that contains the `RedisClient` class. This class should have:

- Constructor to create a Redis client.
- `isAlive` function to check the connection to Redis.
- `get` function to retrieve a value based on a key.
- `set` function to store a value in Redis with an expiration.
- `del` function to remove a value in Redis for a given key.

After the class definition, create and export an instance of `RedisClient` called `redisClient`.

Example usage:

```javascript
import redisClient from './utils/redis';

(async () => {
    console.log(redisClient.isAlive());
    console.log(await redisClient.get('myKey'));
    await redisClient.set('myKey', 12, 5);
    console.log(await redisClient.get('myKey'));

    setTimeout(async () => {
        console.log(await redisClient.get('myKey'));
    }, 1000 * 10);
})();
```

### Task 1: MongoDB Utils

Inside the `utils` folder, create a file `db.js` that contains the `DBClient` class. This class should have:

- Constructor to create a client to MongoDB.
- `isAlive` function to check the connection to MongoDB.
- `nbUsers` function to return the number of documents in the `users` collection.
- `nbFiles` function to return the number of documents in the `files` collection.

After the class definition, create and export an instance of `DBClient` called `dbClient`.

Example usage:

```javascript


import dbClient from './utils/db';

(async () => {
    console.log(dbClient.isAlive());
    console.log(await dbClient.nbUsers());
    console.log(await dbClient.nbFiles());
})();
```

### Task 2: First API

Create a new folder called `routes` at the root of your project. Inside this folder, create a file `index.js` with the following routes:

#### Route 1: Status

- URL: `/status`
- Method: `GET`
- Response:
  - JSON body: `{ "status": "OK" }`

#### Route 2: Stats

- URL: `/stats`
- Method: `GET`
- Response:
  - JSON body: `{ "users": <number_of_users>, "files": <number_of_files> }`

### Task 3: Create a New User

Inside the `routes` folder, create a file `users.js` with the following routes:

#### Route 3: Create a new user

- URL: `/users`
- Method: `POST`
- Parameters:
  - `email` (string): the email of the user (unique).
  - `password` (string): the password of the user.
- Response:
  - JSON body: `{ "email": "<email>", "id": "<id>" }`

### Task 4: Authenticate a User

Inside the `routes` folder, update the `users.js` file with the following route:

#### Route 4: Authenticate a user

- URL: `/connect`
- Method: `POST`
- Parameters:
  - `email` (string): the email of the user.
  - `password` (string): the password of the user.
- Response:
  - JSON body: `{ "email": "<email>", "token": "<token>" }`

### Task 5: First File

Inside the `routes` folder, create a file `files.js` with the following route:

#### Route 5: Upload a file

- URL: `/files`
- Method: `POST`
- Parameters:
  - `type` (string): the type of the file (image, video, etc.).
  - `user_id` (string): the user ID.
  - `token` (string): the user token.
- Response:
  - JSON body: `{ "user_id": "<user_id>", "type": "<type>", "isPublic": <true or false>, "file": "<file>" }`

### Task 6: Get and List Files

Inside the `routes` folder, update the `files.js` file with the following routes:

#### Route 6: List all files

- URL: `/files`
- Method: `GET`
- Parameters:
  - `user_id` (string): the user ID.
  - `token` (string): the user token.
- Response:
  - JSON body: an array of files (details below).

#### Route 7: Get file by ID

- URL: `/files/:id`
- Method: `GET`
- Parameters:
  - `user_id` (string): the user ID.
  - `token` (string): the user token.
- Response:
  - JSON body: `{ "id": "<file_id>", "user_id": "<user_id>", "type": "<type>", "isPublic": <true or false>, "name": "<file_name>", "date": "<date>" }`

### Task 7: File Publish/Unpublish

Inside the `routes` folder, update the `files.js` file with the following routes:

#### Route 8: Publish file

- URL: `/files/:id/publish`
- Method: `PUT`
- Parameters:
  - `user_id` (string): the user ID.
  - `token` (string): the user token.
- Response:
  - JSON body: `{ "id": "<file_id>", "user_id": "<user_id>", "type": "<type>", "isPublic": true, "name": "<file_name>", "date": "<date>" }`

#### Route 9: Unpublish file

- URL: `/files/:id/unpublish`
- Method: `PUT`
- Parameters:
  - `user_id` (string): the user ID.
  - `token` (string): the user token.
- Response:
  - JSON body: `{ "id": "<file_id>", "user_id": "<user_id>", "type": "<type>", "isPublic": false, "name": "<file_name>", "date": "<date>" }`

### Task 8: File Data

Inside the `routes` folder, update the `files.js` file with the following routes:

#### Route 10: Get file data

- URL: `/files/:id/data`
- Method: `GET`
- Parameters:
  - `user_id` (string): the user ID.
  - `token` (string): the user token.
- Response:
  - File data (details below).

### Contact Information

For any questions or concerns regarding this project, feel free to contact the project authors:

- John Doe - john.doe@example.com
- Jane Smith - jane.smith@example.com

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.# alx-files_manager
