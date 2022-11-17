# Whiteboard by @han-tara
objective of this project is to implement some core technology for making real-time document editing app. This application use nest js as main framework, mariadb for database, jwt + refresh token for security, and socket.io for real time communication.

Section:
* [Installation](#installation)
* [Requirements](#requirements)
* [UML Diagram](#uml-diagram)
* [ERD](#er-diagram)

# Installation
## Docker compose (for trying the app)
```
node
    bla bla
    bruhh
```

## Manual Setup - Backend
1. git clone han-tara/whiteboard
2. add this .env 
    ``` 
    DATABASE_PORT = {your_port}
    ```
3. run `pnpm app:start`

## Manual Setup - Frontend
1. git clone han-tara/whiteboard-fe
2. add this .env
    ```
    database
    ```
3. run `pnpm astro start`


# Requirements
## User Requirement
* The application must be able to write whiteboards in real time, and each user can create or join other's whiteboards.

## System Requirements
* Application must have an authentication and authorization system
* Using a refresh token
* Using socket.io for real-time communication
* Using MariaDB for database
* Using astro for frontend
* every participant can create a whiteboard
* participant that creates the whiteboard is called a coordinator
* coordinator can invite or kick someone out of the whiteboard
* coordinator can delete the whiteboard
* every participant can only join another's whiteboard if invited by the coordinator

# UML Diagram

## Class Diagram

![class diagram](./diagram/class_diagram.png)

## Sequence Diagram
**Authenthication & Authorization**

![sequence diagram](./diagram/sequence_diagram_security.svg)

**Participant**


## ER Diagram
<img src="./diagram/er_diagram.png">

