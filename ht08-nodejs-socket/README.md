# ht08-nodejs-socket

---

## Features

-   **Student testing application number 8**
-   **Purpose**: Web sockets.
-   **Result**: Create a small WebSocket Server in Node.js

-   **Modern Backend Stack**:
    -   **Express** server wrapper application
    -   **MongoDB** Database framework
    -   **socket.io** Efficient way provider for transferring data between a client and a server

---

## Task Description
- Create a small WebSocket Server on Node.js (Either on https://www.npmjs.com/package/ws or using https://www.npmjs.com/package/socket.io). 
 Note: Socket.io has fallbacks in case Web Sockets do not work on this device
- On FE, create index.html with the main script and connect to Web Socket Server.
- Using the Leaflet map, https://leafletjs.com/, display the user's location
- Change the location a couple of times. Send the changes to the Web Socket Server and save them in the DB (you can use a geojson file instead of the DB) with an interval of 1 minute or a little more.
- After that, make sure that the web sockets server correctly wrote the data to the file. Create a route path on the map.



## Quick Start

### Prerequisites


```
cd <project_name>
npm install
npm install -g http-server
```

open 2 terminal screen

in first run 
```
 npm run start
```

in second run
```
 http-server .
```
As result on URL  http://192.168.0.24:8080 will appears map.
On search field could find any city on globe with autocomplete.
On click on map coordinates appears on sending field and 
after click on "Send" button those coordinates sends to socket server


