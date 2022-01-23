import { Request, Response } from "express";
import { Attachment } from "../entities/attachment.entity";
import { File } from "../../common/utilities/File";
import { getRepository } from "typeorm";
import { SuccessResponse } from "../../common/utilities/SuccessResponse";
import { ErrorResponse } from "../../common/utilities/ErrorResponse";
import { ERROR_MESSAGES } from "../../common/utilities/ErrorMessages";
import { Helper } from "../../common/utilities/Helper";
import { Banner } from "../../business/entities/banner.entity";
import { Business } from "../../business/entities/business.entity";

export class AttachmentController {

    static upload = async (request: Request, response: Response) => {

        const file = request.file;

        if (Helper.isDefined(file)) {

            const attachment = new Attachment();
            attachment.name = file.filename;
            attachment.originalName = file.originalname;
            attachment.mimeType = file.mimetype;
            attachment.sizeInBytes = file.size;
            attachment.extension = File.getFileExtension(file.originalname);
            attachment.path = file.path;

            const attachmentRepo = getRepository(Attachment);

            await attachmentRepo.save(attachment);

            response.status(201).send(new SuccessResponse(attachment));
        } else {
            response.status(400).send(new ErrorResponse(ERROR_MESSAGES.FILE_MISSING));
        }
    }

    public static async delete(request: Request, response: Response) {
        const attachmentRepository = getRepository(Attachment);
        const bannersRepository = getRepository(Banner);
        const businessRepository = getRepository(Business);
        try {

            await businessRepository.findOneOrFail({
                where: {
                    id: request.params.businessId,
                    userId: response.locals.jwt.userId,
                }
            });

            let attachment = await attachmentRepository.findOneOrFail({
                where: {
                    businessId: request.params.businessId,
                    id: request.params.attachmentId,
                }
            })
            if (attachment.isBanner) {
                await bannersRepository.query(`Delete from banners where business_id= '${attachment.businessId}'`);
            }

            await attachmentRepository.delete(attachment.id);

            response.status(201).send(new SuccessResponse(attachment));
        } catch (error) {
            response.status(400).send(new ErrorResponse(ERROR_MESSAGES.FILE_MISSING));
        }
    }
}


