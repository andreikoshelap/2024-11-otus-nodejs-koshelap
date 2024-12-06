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

## Quick Start

### Prerequisites

1. **npm i -g typescript** installing/checking typescript
2. **tsc --init** initialization typescript configuration.
3. **npm i -D @types/express** installing/checking express for typescript.
3. **npm i tslog** installing logger library

4. Clone the repository:

    ```bash
    git clone https://github.com/andreikoshelap/store-rules.git
    cd store-rules

    ```

### Running the Application

```bash
  mvn clean install
  mvn spring-boot:run

```

### Open the following URLs:

-   Swagger API Documentation: http://localhost:8080/swagger-ui.html
-   H2 Database Console: http://localhost:8080/h2-console
-

### API Endpoints

-   POST /api/record:
    Validates purchase requests and adds them to the ORDER table if approved.
    Located in OrderApiController.
-   GET /api/customer/{id}:
    Fetches customer information (example endpoint, depending on implementation).
    All API endpoints are documented and testable via the Swagger UI.

### Database

-   The application uses an H2 in-memory database for development and testing.
-   Access the database through the H2 Console:
-   URL: http://localhost:8080/h2-console
-   Default credentials:
-   JDBC URL: jdbc:h2:mem:testdb
-   Username: sa
-   Password: (empty)
    -Tables:

RULE: Maps customer IDs to their purchase capacity.
ORDER: Logs approved purchases.
CUSTOMER: Logs customer.
PRODUCT: Logs store.

### Testing

-   Unit Tests:
    The functionality of the purchase approval algorithm is tested in OrderApiControllerTest.
-   Manual Testing:
    The API was verified using Postman for additional validation and debugging.

### How it Works

-   When a POST request is sent to /api/record, the application:
    Validates the customer's capacity and the requested purchase amount using rules in the RULE table.
    If approved, logs the purchase in the ORDER table.
-   The purchase approval algorithm is located in OrderApiController.
-

### Additional Tools

-   Swagger/OpenAPI:
    Provides interactive API documentation.
    Version: Springdoc OpenAPI 2.1.0.
-   H2 Console:
    Enables developers to inspect the in-memory database.
