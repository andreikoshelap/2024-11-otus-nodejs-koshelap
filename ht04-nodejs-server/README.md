# ht04-nodejs-server

---

## Features

-   **Student testing application number 4**
-   **Purpose**: create EdTech CRM application.
-   **Result**: initiated schema of relation between database, server, frontend.

-   **Modern Backend Stack**:
    -   **Fastify** server wrapper application
    -   **MongoDB** Database framework
    -   **typeScript** javaScript typed builder

---

## Task Description

An educational platform with the ability to view and edit media content.
Users can edit and view created courses.
Users can create their own courses.
Courses contain a description and sets of lessons.
The list and description of all courses (as well as a description of lessons) are available to all users.
It is also possible to add comments to a lesson and see comments from other users.
Each lesson can contain a description, video, links, files as another type of resource.
In order for a user to have access to lessons of a non-own course, the course author can add the user to the list of allowed accounts.

## The application MUST

store a course that has a description, examples of input and output data, difficulty level, tags (for example, "algorithms", "data structures",
"dynamic programming"), additional materials (files, links)
provide the ability to login and logout
contain user roles (user, administrator, author) and check whether the user has certain permissions in the system; users must be able to
leave comments on the course, lessons and add comments; users can rate the course and classes, which helps other participants understand the complexity and interestingness; users should be able to see the profiles of authors and courses, edit their rating;
contain a REST API for managing application resources
use a database to store information about tasks, users

## Application workflow diagram
![draw.io](./images/diagram.png)

## Application entity diagram
![draw.io](./images/entity_relation.drawio.png)

## Quick Start

### Prerequisites


```
cd <project_name>
npm install
npm run tsc
```
