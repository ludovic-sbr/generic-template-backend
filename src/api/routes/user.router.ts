import { Router } from 'express';
import { AuthenticationMiddleware } from '../middlewares/authentication.middleware';
import { RoleNameEnum } from '../models';
import { UserController } from '../controllers/user.controller';

const userRouter: Router = Router();

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
 *                              email:
 *                                  type: string
 *                              password:
 *                                  type: string
 *          responses:
 *              201:
 *                  description: Created
 */
userRouter.post('/', UserController.register);

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
userRouter.patch('/:id', AuthenticationMiddleware.requiredRoles([RoleNameEnum.ADMIN]), UserController.update);

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
userRouter.delete('/:id', AuthenticationMiddleware.requiredRoles([RoleNameEnum.ADMIN]), UserController.delete);

export default userRouter;
