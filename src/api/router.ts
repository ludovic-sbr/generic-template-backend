import express, { Router } from 'express';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';

const router: Router = express.Router();

// AUTHENTICATION _______________________________________________
/**
 * @openapi
 * /login:
 *      post:
 *          summary: Login user
 *          tags:
 *              - Authentication
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              username:
 *                                  type: string
 *                              email:
 *                                  type: string
 *                              password:
 *                                  type: string
 *          responses:
 *              200:
 *                  description: Created
 */
router.post('/login', AuthController.login);

// USER _______________________________________________
/**
 * @openapi
 * /user:
 *      post:
 *          summary: Register new user
 *          tags:
 *              - User
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              username:
 *                                  type: string
 *                              email:
 *                                  type: string
 *                              password:
 *                                  type: string
 *          responses:
 *              201:
 *                  description: Created
 */
router.post('/user', UserController.register);

/**
 * @openapi
 * /user/{id}:
 *      patch:
 *          summary: Patch specific user
 *          tags:
 *              - User
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: integer
 *              required: true
 *          requestBody:
 *              required: false
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: string
 *                              password:
 *                                  type: string
 *          responses:
 *              200:
 *                  description: Ok
 */
router.patch('/user/:id', UserController.update);

/**
 * @openapi
 * /user/{id}:
 *      delete:
 *          summary: Delete specific user
 *          tags:
 *              - User
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                  type: integer
 *              required: true
 *          responses:
 *              200:
 *                  description: Ok
 */
router.delete('/user/:id', UserController.delete);

export default router;
