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
 */
