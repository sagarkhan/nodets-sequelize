import SafeJSONStringify from 'safe-json-stringify';
import * as Models from '../models';
import logger from '../../common/logger';
import { CreateUsers } from '../interfaces/users.interface';
import HttpErrors from '../../common/errorconfig';

class Users {
  async all(): Promise<any> {
    try {
      logger.info('[Users-Service] GET User Entries');
      const users = await Models.UsersModel.findAndCountAll();
      return users;
    } catch (err) {
      logger.error(`[Users-Service] Error in getting Users ${SafeJSONStringify(err)}`);
      throw err;
    }
  }

  async create(payload: CreateUsers): Promise<any> {
    logger.debug('Users-Service Creating User');
    try {
      const user = await Models.UsersModel.create(payload);
      return this.get(user.userId);
    } catch (err) {
      logger.error(`Users-Service Error in creating user ${SafeJSONStringify(err)}`);
      throw err;
    }
  }

  async get(userId: string): Promise<any> {
    try {
      logger.debug(`[Users-Service] getting user ${userId}`);
      const query = { userId };
      const user = await Models.UsersModel.findOne({ where: query });
      if (!user) {
        throw HttpErrors.NotFound('Record not found');
      }
      return user;
    } catch (err) {
      logger.error(`Users-Service Error while getting user ${userId} ${SafeJSONStringify(err)}`);
      throw err;
    }
  }
}

const UsersService = new Users();

export default UsersService;
