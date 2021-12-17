import { UserRepository } from "../repositories/user.repository";
import { QueryStringProcessor } from "../../common/utilities/QueryStringProcessor";
import { getCustomRepository, getRepository } from "typeorm";
import { UserRole } from "../utilities/UserRole";
import { Functions } from "../../common/utilities/Functions";
import { Md5 } from "md5-typescript";
import { File } from "../../common/utilities/File";
import { User } from "../entities/user.entity";
import { Helper } from "../../common/utilities/Helper";
import { Request, Response } from "express";
const UUID = require("uuid/v1");

export class UserService {
  static list = async (
    queryStringProcessor: QueryStringProcessor,
    filter: any
  ) => {
    const userRepository = getCustomRepository(UserRepository);

    return await userRepository.list(queryStringProcessor, filter);
  };

  static insert = async (userPayload: User) => {
    const userRepository = getCustomRepository(UserRepository);

    const {
      name,
      surname,
      email,
      password,
      role,
      profilePicture,
    } = userPayload;

    const user = await userRepository.create({
      name,
      surname,
      email,
      username: email,
      password: Md5.init(password),
      role: role ? role : UserRole.USER,
      verifyToken: UUID(),
      tsVerifyTokenExpiration: Functions.getDateAfter(
        process.env.DURATION_ACTIVATION_TOKEN_HOURS,
        "h"
      ),
      profilePicture: "default-user.png",
    });

    if (Helper.isDefined(profilePicture)) {
      try {
        const { filePath } = await File.insertBase64Media(profilePicture, name);
        user.profilePicture = filePath;
      } catch (error) {
        console.log(error);
      }
    }

    await userRepository.save(user);

    return user;
  };

  static getById = async (userId: number) => {
    const userRepository = getCustomRepository(UserRepository);

    return await userRepository.findById(userId);
  };

  static update = async (userPayload: User, currentUser: User) => {
    const userRepository = getCustomRepository(UserRepository);

    if (Helper.isDefined(userPayload.password)) {
      userPayload.password = Md5.init(userPayload.password);
    }

    const finalUser = userRepository.merge(currentUser, userPayload);
    await userRepository.save(finalUser);

    return finalUser;
  };

  static deleteById = async (userId: number) => {
    const userRepository = getCustomRepository(UserRepository);

    await userRepository.deleteById(userId);
  };

  static updatePassword = async (
    passwordPayload: string,
    currentUser: User
  ) => {
    const userRepository = getCustomRepository(UserRepository);

    if (Helper.isDefined(passwordPayload)) {
      passwordPayload = Md5.init(passwordPayload);
    }

    const finalUser = userRepository.save({
      ...currentUser,
      password: passwordPayload,
    });
    return finalUser;
  };


  static updateTutorialStatus = async (
    currentUser: User
  ) => {
    const userRepository = getCustomRepository(UserRepository);


    const updatedStatus = userRepository.save({
      ...currentUser,
      is_tutorial_checked: 1
    });
    return updatedStatus;
  };

  public static patchMe = async (request: Request, response: Response) => {
    const userRepository = getRepository(User);
    try {
      const isMatchingUser = await userRepository.findOneOrFail({
        where: {
          email: request.body.email,
          id: response.locals.jwt.userId,
        }
      });

      if (isMatchingUser) {
        const { body: { newPassword, confirmPassword } } = request;
        if (newPassword && confirmPassword && (newPassword === confirmPassword)) {
          request.body.password = Md5.init(newPassword);
        }

        const user = userRepository.merge(isMatchingUser, { ...request.body })
        await userRepository.save(user)
        return [request.body, null];
      }
      throw new Error("missmatching user");
    } catch (error) {
      return [null, error]
    }
  }
}
