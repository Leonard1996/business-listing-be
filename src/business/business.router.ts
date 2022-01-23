import * as express from "express";
import { ConnectionIsNotSetError } from "typeorm";
import { UploadMiddleware } from "../attachment/middlewares/upload.middleware";
import { AuthenticationMiddleware } from "../authentication/middlewares/authentication.middleware";
import { BusinessController } from "./controllers/business.controller";


export class BusinessRouter {
    static configRoutes = (app: express.Application) => {
        app.post("/businesses", [
            AuthenticationMiddleware.checkJwtToken,
            UploadMiddleware.validateFileUpload('file', ["jpg", "jpeg", "png"], 11),
            BusinessController.insert,
        ]);

        app.get("/businesses", [
            AuthenticationMiddleware.checkJwtTokenOptional,
            BusinessController.list,
        ]);

        app.get("/businesses/:businessId", [
            AuthenticationMiddleware.checkJwtTokenOptional,
            AuthenticationMiddleware.checkIfFieldsAllowed,
            BusinessController.getById,
        ]);

        app.post("/businesses/:businessId/messages", [
            BusinessController.insertMessage,
        ]);

        app.delete("/businesses/:businessId", [
            AuthenticationMiddleware.checkJwtToken,
            BusinessController.delete,
        ]);

        app.post("/businesses/filter", [
            AuthenticationMiddleware.checkJwtTokenOptional,
            AuthenticationMiddleware.checkIfFieldsAllowed,
            BusinessController.filter,
        ]);

        app.get("/similar-businesses", [
            BusinessController.listSimilar,
        ]);

        app.post("/like-business", [
            AuthenticationMiddleware.checkJwtToken,
            BusinessController.like,
        ]);

        app.get("/like-business/:businessId", [
            AuthenticationMiddleware.checkJwtToken,
            BusinessController.check,
        ]);

        app.get("/like-business", [
            AuthenticationMiddleware.checkJwtToken,
            BusinessController.listSaved,
        ]);

        app.get("/my-businesses/:businessId", [
            AuthenticationMiddleware.checkJwtToken,
            BusinessController.getMyBusiness,
        ]);

        app.patch("/businesses", [
            AuthenticationMiddleware.checkJwtToken,
            UploadMiddleware.validateFileUpload('file', ["jpg", "jpeg", "png"], 11),
            BusinessController.update,
        ]);
    };
}
