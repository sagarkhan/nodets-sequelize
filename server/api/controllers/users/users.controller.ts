import SafeJSONStringify from 'safe-json-stringify';
import Joi from 'joi';
import { HttpStatus, ResponseSchema } from '../../../common/constants';
import logger from '../../../common/logger';
import { formatResponse, cleanObject, filterParams } from '../../../common/utils';
import HttpErrors from '../../../common/errorconfig';
import { CreateUsers } from '../../interfaces/users.interface';
import UsersService from '../../services/users.service';
import { ExpressRequest } from '../../interfaces/express.interface';

export class UserController {
  async all(): Promise<ResponseSchema> {
    try {
      logger.debug('[Users-Controller] User get all started');
      const users = await UsersService.all();
      logger.debug('[Users-Controller] User get all success');
      return formatResponse(users, HttpStatus.OK);
    } catch (err) {
      logger.error('[Users-Controller] User get all error');
      throw err;
    }
  }

  async get(req: ExpressRequest): Promise<ResponseSchema> {
    try {
      logger.debug('[Users-Controller] User get by id started');
      const { userId } = req.params;
      if (!userId) {
        throw HttpErrors.BadRequest('User id required');
      }

      const user = await UsersService.get(userId);
      logger.debug('[Users-Controller] User get by id success');
      return formatResponse(user, HttpStatus.OK);
    } catch (err) {
      logger.error('[Users-Controller] User get by id error');
      throw err;
    }
  }

  async create(req: ExpressRequest): Promise<ResponseSchema> {
    try {
      logger.debug('[Users-Controller] User creation started');
      const { name, email } = req.body;
      const schema = {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
      };

      const request: Record<string, any> = filterParams(Object.keys(schema), cleanObject({ ...req?.body }));
      const { error } = Joi.object(schema).validate(request);
      if (error) {
        const err = HttpErrors.PreconditionedFailed();
        err.message = error?.message;
        throw err;
      }

      const payload: CreateUsers = {
        name,
        email,
      };

      const user = await UsersService.create(cleanObject(payload));
      logger.info('[User-Controller] User successfully created');
      return formatResponse(user, HttpStatus.CREATED);
    } catch (err) {
      logger.error(`Error in creating user ${SafeJSONStringify(err)}`);
      throw err;
    }
  }
}

export default new UserController();
