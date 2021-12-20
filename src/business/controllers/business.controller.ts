import { Request, response, Response } from "express";
import { getCustomRepository, getRepository } from "typeorm";
import { Attachment } from "../../attachment/entities/attachment.entity";
import { ErrorResponse } from "../../common/utilities/ErrorResponse";
import { File } from "../../common/utilities/File";
import { QueryStringProcessor } from "../../common/utilities/QueryStringProcessor";
import { SuccessResponse } from "../../common/utilities/SuccessResponse";
import { Banner } from "../entities/banner.entity";
import { Business } from "../entities/business.entity";
import { BusinessRepository } from "../repository/business.repository";

export class BusinessController {
    static async insert(request: Request, response: Response) {
        const businessRepository = getRepository(Business);
        const bannersRepository = getRepository(Banner);
        const { essentials, notes, currencies, dates, selects, mapState, isWithBanner } = JSON.parse(request.body.business);

        try {
            let business = new Business();
            business = { ...business, ...essentials, ...notes, ...currencies, ...dates, ...selects, ...mapState }
            business.mapPositionLat = mapState.mapPosition.lat;
            business.mapPositionLng = mapState.mapPosition.lng;
            business.markerPositionLat = mapState.markerPosition.lat;
            business.markerPositionLng = mapState.markerPosition.lng;
            business.userId = response.locals.jwt.userId;

            const banner = new Banner();

            if (request.files) {
                if (isWithBanner) {
                    request.files[0].isBanner = true;
                    banner.path = request.files[0].path;

                }
                const queries = [];

                for (const file of request.files as Array<Express.Multer.File>) {
                    queries.push(BusinessController.saveAttachment(file))
                }

                const attachments = await Promise.all(queries);
                business.attachments = attachments;

            }

            business = await businessRepository.save(business);
            if (isWithBanner) {
                banner.businessId = business.id;
                await bannersRepository.save(banner);
            }


            response.status(201).send(new SuccessResponse(business))

        } catch (error) {
            console.log(error);
            return response.status(400).send(new ErrorResponse(error))
        }


    }

    private static async saveAttachment(file) {
        const attachment = new Attachment();
        attachment.name = file.filename;
        attachment.originalName = file.originalname;
        attachment.mimeType = file.mimetype;
        attachment.sizeInBytes = file.size;
        attachment.extension = File.getFileExtension(file.originalname);
        attachment.path = file.path;
        attachment.isBanner = file.isBanner;

        const attachmentRepo = getRepository(Attachment);

        return await attachmentRepo.save(attachment);
    }

    public static async list(request: Request, response: Response) {
        const businessRepository = getCustomRepository(BusinessRepository);
        const filter = response.locals.jwt.userRole.toLowerCase() === "admin" ? null : response.locals.jwt.userId;
        try {
            const business = await businessRepository.list(new QueryStringProcessor(request.query), filter);
            response.status(200).send(new SuccessResponse(business));
        } catch (error) {
            response.status(400).send(new ErrorResponse(error))
        }
    }
}