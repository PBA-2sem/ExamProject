# Databases Exam Project 

Assignment: [DB Exam Project](https://datsoftlyngby.github.io/soft2020spring/resources/94eb6465-DBExamTaskDescription2020.pdf)

## Installation Instructions / Requirements

### Neo4j
[Neo4j Desktop](https://neo4j.com/download/) needs to be installated locally, and a database (v. 4.0.3) with the following credentials need to be created & started:

```
username: neo4j
Password: test
```

### Configure .env file

in the ``/backend/src/`` directory, make a copy of the ``.env.example`` file and rename it ``.env`` . Fill in the missing credentials (the credentials are located in the .zip file, handed in on Wiseflow).

### Backend & Frontend 

The frontend and the backend are run locally through [Nodejs](https://nodejs.org/en/download/) (needs to be installed).

#### Backend

Navigate to the ``/backend/`` directory and enter the following to setup & start the backend:

```
npm install
port=3001 npm start
```

#### Frontend

Navigate to the ``/frontend/`` directory and enter the following to setup & start the backend:

```
npm install
npm start
```

The frontend should now be accessible at ``http://localhost:3000/``

### MySQL, MongoDB, Redis
All these databases are hosted in the cloud.


## Author Details

**Group: Team Wing It**
- *Alexander Winther Hørsted-Andersen* (cph-ah353@cphbusiness.dk)
- *Andreas Due Jørgensen* (cph-aj285@cphbusiness.dk)
- *Mathias Bigler* (cph-mb493@cphbusiness.dk)
- *Stanislav Novitski* (cph-sn183@cphbusiness.dk)
