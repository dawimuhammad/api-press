# Hacktiv Press API (Server side application)

## A simple press/ blog website to post an article and share your thought with everybody else.

## REST API

#### Demo app with basic REST API.

#### List of routes:

#### List of users routes:

Endpoint  |  Method  | Description
-------|--------|------------
/register | POST | Create new user
/login | POST | Login user
/findUser/<userId> | GET | Find by it's Id
/findall | GET | Find all registered user

#### List of articles routes:

Endpoint  |  Method  | Description
----------|----------|------------
/ | GET | Get all articles
/<id> | GET | Get an article by it's Id
/author/<author> | GET | Get all articles posted by a user/author
/ | POST | Post an article
/ | DELETE | Delete an article
/ | PUT | Update an article

### Usage

#### With only npm:

```
git clone <repository's link>

npm install

npm start

```

#### Access the website via http://localhost:3000
