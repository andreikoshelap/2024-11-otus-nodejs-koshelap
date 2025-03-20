/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Create a new user
 *     description: This endpoint creates a new user in the system.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the user
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: Email of the user
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: Password for the user
 *                 example: password123
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID of the created user
 *                   example: 123456
 *                 name:
 *                   type: string
 *                   description: Name of the created user
 *                   example: John Doe
 *       400:
 *         description: Bad request
 *
 * /users/login:
 *   post:
 *     summary: Login with email
 *     description: This endpoint logs in an existing user into the system.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the user
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: Password for the user
 *                 example: password123
 *     responses:
 *       201:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID of the logged in user
 *                   example: 123456
 *                 name:
 *                   type: string
 *                   description: Name of the logged in user
 *                   example: John Doe
 *       400:
 *         description: Bad request
 *
 * /users/info:
 *   get:
 *     summary: Information about an existing user by email
 *     description: This endpoint checks an existing user in the system.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token for authentication
 *     responses:
 *       200:
 *         description: User information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID of the user
 *                   example: 123456
 *                 email:
 *                   type: string
 *                   description: Email of the user
 *                   example: john.doe@example.com
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *
 * /courses/new:
 *   post:
 *     summary: Create a new course
 *     description: This endpoint creates a new course in the system.
 *     tags:
 *       - Courses
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the course
 *                 example: Node.js
 *               teacher:
 *                 type: string
 *                 description: Name of the user who organizes this course
 *                 example: John Doe
 *     responses:
 *       201:
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID of the created course
 *                   example: 123456
 *                 name:
 *                   type: string
 *                   description: Name of the created course
 *                   example: Node.js
 *       400:
 *         description: Bad request
 *
 * /courses/update:
 *   post:
 *     summary: Update a course
 *     description: This endpoint updates an existing course in the system.
 *     tags:
 *       - Courses
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the course
 *                 example: Node.js Advanced
 *               teacher:
 *                 type: string
 *                 description: Updated name of the user who organizes this course
 *                 example: John Doe
 *     responses:
 *       200:
 *         description: Course updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID of the updated course
 *                   example: 123456
 *                 name:
 *                   type: string
 *                   description: Updated name of the course
 *                   example: Node.js Advanced
 *       400:
 *         description: Bad request
 */
