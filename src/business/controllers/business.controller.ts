import { Request, response, Response } from "express";
import { getCustomRepository, getRepository, Not } from "typeorm";
import { Attachment } from "../../attachment/entities/attachment.entity";
import { ErrorResponse } from "../../common/utilities/ErrorResponse";
import { File } from "../../common/utilities/File";
import { Mailer } from "../../common/utilities/Mailer";
import { QueryStringProcessor } from "../../common/utilities/QueryStringProcessor";
import { SuccessResponse } from "../../common/utilities/SuccessResponse";
import { User } from "../../user/entities/user.entity";
import { permissions } from "../../user/utilities/UserRole";
import { Banner } from "../entities/banner.entity";
import { Business } from "../entities/business.entity";
import { Email } from "../entities/email.entity";
import { Like } from "../entities/like.entity";
import { Message } from "../entities/message.entity";
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
        const filter = (!response.locals.jwt || response.locals.jwt.userRole.toLowerCase() === "admin" || request.query.isFilter) ? null : response.locals.jwt.userId;
        try {
            const businesses = await businessRepository.list(new QueryStringProcessor(request.query), filter);
            response.status(200).send(new SuccessResponse(businesses));
        } catch (error) {
            response.status(400).send(new ErrorResponse(error))
        }
    }

    public static async getById(request: Request, response: Response) {
        const businessRepository = getRepository(Business);
        try {
            const business = await businessRepository.findOneOrFail({
                where: {
                    id: request.params.businessId
                },
                relations: ['attachments']
            })

            for (const key in business) {
                if (response.locals.jwt && (response.locals.jwt.userRole === "admin"
                    || response.locals.jwt.userRole === "hc"
                    || response.locals.jwt.userRole === "company")) break;

                if (!response.locals.jwt) {
                    if (!permissions.view.noAuth.includes(key)) delete business[key]
                } else {
                    if (!permissions.view[response.locals.jwt.userRole].includes(key)) delete business[key]
                }
            }
            response.status(200).send(new SuccessResponse(business));
        } catch (error) {
            console.log(error)
            response.status(400).send(new ErrorResponse(error))
        }
    }

    public static async insertMessage(request: Request, response: Response) {
        const messageRepository = getRepository(Message);
        try {
            let message = new Message();
            message.email = request.body.email;
            message.postedBy = request.body.name;
            message.subject = request.body.subject;
            message.message = request.body.message;
            message.businessId = +request.params.businessId;
            message.link = request.body.link;
            message = await messageRepository.save(message);

            const mailerService = new Mailer();
            mailerService.sendMail("leonard9619@gmail.com", "Received a new message",
                `
            <div>
                New message on business that can be reached by clicking <b><a href='${message.link}'>here<a/></b>
                <p>Posted by: ${message.postedBy}</p>
                <p>Subject: ${message.subject}</p>
                <p>Poster email: ${message.email}</p>
                <p>Message content: </p>
                <p>${message.message}</p>
            </div>
            `
            )



            response.status(200).send(new SuccessResponse(message));
        } catch (error) {
            response.status(400).send(new ErrorResponse(error))
        }
    }

    public static async delete(request: Request, response: Response) {
        const businessRepository = getRepository(Business);
        const bannerRepository = getRepository(Banner);
        const likeRepository = getRepository(Like);
        const messageRepository = getRepository(Message);
        try {
            let business: unknown = await businessRepository.findOneOrFail({
                userId: +response.locals.jwt.userId,
                id: +request.params.businessId,
            })

            await likeRepository.delete({ businessId: +request.params.businessId })

            await bannerRepository.delete({ businessId: +request.params.businessId })

            await messageRepository.delete({ businessId: +request.params.businessId })

            business = await businessRepository.delete({
                userId: +response.locals.jwt.userId,
                id: +request.params.businessId,
            });
            response.status(200).send(new SuccessResponse(business));

        } catch (error) {
            response.status(400).send(new ErrorResponse(error))
        }
    }

    public static async filter(request: Request, response: Response) {
        const businessRepository = getCustomRepository(BusinessRepository);
        const filter = (!response.locals.jwt || response.locals.jwt.userRole.toLowerCase() === "admin" || request.query.isFilter) ? null : response.locals.jwt.userId;
        try {
            const businesses = await businessRepository.filter(new QueryStringProcessor(request.query), filter, request.body, response.locals);
            response.status(200).send(new SuccessResponse(businesses));
        } catch (error) {
            console.log(error)
            response.status(400).send(new ErrorResponse(error))
        }
    }

    public static async listSimilar(request: Request, response: Response) {
        const businessRepository = getRepository(Business);
        try {
            const businesses = await businessRepository.find({
                where: {
                    industry: request.query.industry,
                    id: Not(request.query.self)
                },
                take: 3,
            })
            response.status(200).send(new SuccessResponse(businesses));
        } catch (error) {
            console.log(error)
            response.status(400).send(new ErrorResponse(error))
        }
    }

    public static async like(request: Request, response: Response) {
        const likeRepository = getRepository(Like);
        try {
            let existing = await likeRepository.findOne({
                where: {
                    userId: response.locals.jwt.userId,
                    businessId: request.body.id,
                }
            })

            if (existing) {
                existing.deleted = !existing.deleted;
                await likeRepository.save(existing);
                return response.status(200).send(new SuccessResponse(existing));
            }

            let like = new Like();
            like.userId = response.locals.jwt.userId;
            like.businessId = request.body.id
            like = await likeRepository.save(like);
            response.status(200).send(new SuccessResponse(like));
        } catch (error) {
            console.log(error)
            response.status(400).send(new ErrorResponse(error))
        }
    }

    public static async check(request: Request, response: Response) {
        const likeRepository = getRepository(Like);
        try {
            const like = await likeRepository.findOne({
                where: {
                    userId: response.locals.jwt.userId,
                    businessId: request.params.businessId,
                }
            })
            response.status(200).send(new SuccessResponse(like));
        } catch (error) {
            response.status(400).send(new ErrorResponse(error))
        }
    }

    public static async listSaved(request: Request, response: Response) {
        const businessRepository = getCustomRepository(BusinessRepository);
        const filter = response.locals.jwt.userId;
        try {
            const businesses = await businessRepository.listSaved(new QueryStringProcessor(request.query), filter, request.body, response.locals);
            response.status(200).send(new SuccessResponse(businesses));
        } catch (error) {
            response.status(400).send(new ErrorResponse(error))
        }
    }

    public static async getMyBusiness(request: Request, response: Response) {
        const businessRepository = getCustomRepository(BusinessRepository);
        const { locals: { jwt: { userRole, userId } } } = response;
        try {
            const business = await businessRepository.findOneOrFail({
                where: {
                    id: +request.params.businessId,
                    ...(userRole.toLowerCase() !== 'admin' && { userId })
                }, relations: ['attachments']
            })
            response.status(200).send(new SuccessResponse(business));
        } catch (error) {
            console.log(error)
            response.status(400).send(new ErrorResponse(error))
        }
    }

    static async update(request: Request, response: Response) {
        const businessRepository = getRepository(Business);
        const bannersRepository = getRepository(Banner);
        const { essentials, notes, currencies, dates, selects, mapState, isWithBanner, businessId } = JSON.parse(request.body.business);

        try {
            const existing = await businessRepository.findOneOrFail(businessId, { relations: ['attachments'] })
            let business;
            business = { ...business, ...essentials, ...notes, ...currencies, ...dates, ...selects, ...mapState }
            business.mapPositionLat = mapState.mapPosition.lat;
            business.mapPositionLng = mapState.mapPosition.lng;
            business.markerPositionLat = mapState.markerPosition.lat;
            business.markerPositionLng = mapState.markerPosition.lng;
            business.userId = response.locals.jwt.userId;

            let banner: any = {}

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
            business = businessRepository.merge(existing, business);
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

    public static async email(request: Request, response: Response) {
        const emailRepository = getRepository(Email);
        try {
            let email = new Email();
            email.email = request.body.email
            email = await emailRepository.save(email)
            response.status(201).send(new SuccessResponse(email))
        } catch (error) {
            console.log(error)
            return response.status(400).send(new ErrorResponse(error))
        }
    }

    public static async count(request: Request, response: Response) {
        const businessRepository = getRepository(Business);
        const userRepository = getRepository(User);
        try {
            const options = response.locals.jwt.userRole !== 'admin' ?
                {} : { where: { userId: response.locals.jwt.userId } }

            const businessesCount = await businessRepository.count(options);
            const usersCount = await userRepository.count();
            response.status(201).send(new SuccessResponse({ businessesCount, usersCount }))
        } catch (error) {
            console.log(error)
            return response.status(400).send(new ErrorResponse(error))
        }
    }

    public static async statistics(request: Request, response: Response) {
        const businessRepository = getCustomRepository(BusinessRepository);

        const { byArea, byIndustry } = await businessRepository.statistics()
        response.status(201).send(new SuccessResponse({ byArea, byIndustry }))
    } catch(error) {
        console.log(error)
        return response.status(400).send(new ErrorResponse(error))
    }
}
