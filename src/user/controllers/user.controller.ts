import { Response, Request } from "express";
import { SuccessResponse } from "../../common/utilities/SuccessResponse";
import { ErrorResponse } from "../../common/utilities/ErrorResponse";
import { ERROR_MESSAGES } from "../../common/utilities/ErrorMessages";
import { UserService } from "../services/user.service";
import { QueryStringProcessor } from "../../common/utilities/QueryStringProcessor";
import { IUserFilter } from "../utilities/user-filter.interface";
import { Helper } from "../../common/utilities/Helper";
import { HttpStatusCode } from "../../common/utilities/HttpStatusCodes";

export class UserController {

    static list = async (request: Request, response: Response) => {

        const queryStringProcessor = new QueryStringProcessor(request.query);
        const filter: IUserFilter = {};

        const results = await UserService.list(queryStringProcessor, filter);

        response.status(HttpStatusCode.OK).send(new SuccessResponse({ results }));
    }

    static insert = async (request: Request, response: Response) => {
        const user = await UserService.insert(request.body);

        response.status(HttpStatusCode.OK).send(new SuccessResponse({ user }));
    }

    static getById = async (request: Request, response: Response) => {

        const user = await UserService.getById(+request.params.userId);

        if (Helper.isDefined(user)) {
            response.status(HttpStatusCode.OK).send(new SuccessResponse(user.toResponseObject()));
        } else {
            response.status(HttpStatusCode.NOT_FOUND).send(new ErrorResponse(ERROR_MESSAGES.RECORD_NOT_FOUND));
        }
    }

    static patchById = async (request: Request, response: Response) => {

        const user = await UserService.getById(+request.params.userId);

        if (Helper.isDefined(user)) {

            const finalUser = await UserService.update(request.body, user);
            response.status(HttpStatusCode.OK).send(new SuccessResponse(finalUser.toResponseObject()));

        } else {
            return response.status(HttpStatusCode.NOT_FOUND).send(new ErrorResponse(ERROR_MESSAGES.RECORD_NOT_FOUND));
        }

        response.status(HttpStatusCode.OK).send();
    }

    static deleteById = async (request: Request, response: Response) => {

        await UserService.deleteById(+request.params.userId);

        response.status(HttpStatusCode.OK).send();
    }

    static patchPassword = async (request: Request, response: Response) => {

        const user = await UserService.getById(+response.locals.jwt.userId);

        if (Helper.isDefined(user)) {

            const finalUser = await UserService.updatePassword(request.body.newPassword, user);
            response.status(HttpStatusCode.OK).send(new SuccessResponse(finalUser.toResponseObject()));

        } else {
            return response.status(HttpStatusCode.NOT_FOUND).send(new ErrorResponse(ERROR_MESSAGES.RECORD_NOT_FOUND));
        }

        response.status(HttpStatusCode.OK).send();
    }


    static patchTutorialStatus = async (request: Request, response: Response) => {

        const user = await UserService.getById(+response.locals.jwt.userId);

        if (Helper.isDefined(user)) {

            await UserService.updateTutorialStatus(user);
            response.status(HttpStatusCode.OK).send();

        } else {
            return response.status(HttpStatusCode.NOT_FOUND).send(new ErrorResponse(ERROR_MESSAGES.RECORD_NOT_FOUND));
        }

        response.status(HttpStatusCode.OK).send();
    }

    public static patchMe = async (request: Request, response: Response) => {
        const [result, error] = await UserService.patchMe(request, response)
        if (error) {
            return response.status(402).send(new ErrorResponse(ERROR_MESSAGES.RECORD_NOT_FOUND))
        }
        return response.status(200).send(new SuccessResponse(result));
    }
}