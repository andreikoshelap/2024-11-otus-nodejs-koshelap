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
 *     description: This endpoint login existing user into the system.
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
 *         description: User logged successfully
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
 *
 * /users/info:
 *   get:
 *     summary: information about existing user by email
 *     description: This endpoint checking existing user in the system.
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
 *                   description: ID of the created user
 *                   example: 123456
 *                 email:
 *                   type: string
 *                   description: Email of existing user
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
 *                 description: Name of user who organize this course
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
 *    post:
 *     summary: Update of course
 *     description: This endpoint login existing course in the system.
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
 *                 description: Name of user who organize this course
 *                 example: John Doe
 *    responses:
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
 */
