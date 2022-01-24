import { EntityRepository } from "typeorm";
import { CommonRepository } from "../../common/repositories/common.repository";
import { Helper } from "../../common/utilities/Helper";
import { Condition } from "../../common/utilities/QueryBuilder/Condition";
import { ConditionGroup } from "../../common/utilities/QueryBuilder/ConditionGroup";
import { FilterInfo } from "../../common/utilities/QueryBuilder/FilterInfo";
import { Join } from "../../common/utilities/QueryBuilder/Join";
import { QueryStringProcessor } from "../../common/utilities/QueryStringProcessor";
import { permissions, permissionsMapped } from "../../user/utilities/UserRole";
import { Business } from "../entities/business.entity";


@EntityRepository(Business)
export class BusinessRepository extends CommonRepository<Business> {
    public list = async (
        queryStringProcessor: QueryStringProcessor,
        filter: string,
    ) => {
        const select = ["businesses.*, banners.path"];

        const joins = [
            new Join('LEFT', 'banners', 'businesses.id=banners.business_id', 'banners'),
        ];

        const filterCondition = filter
            ? new Condition(`user_id = ${filter}`)
            : new Condition(`true`);

        const queryConditions = [
            filterCondition,
        ];

        const filterInfo = new FilterInfo(new ConditionGroup(queryConditions));

        const countSelect = ["COUNT (DISTINCT(businesses.id)) AS total"];
        const { total } = await this.getEntitySelect(
            countSelect,
            joins,
            filterInfo
        ).getRawOne();

        const paginationResult = queryStringProcessor.getPaginationResponse(
            parseInt(total)
        );

        const sort = this.getSortObject(select, queryStringProcessor);

        if (Helper.isDefined(sort)) {
            filterInfo.sort = sort;
        }

        let results = await this.entitySelect(
            select,
            joins,
            filterInfo,
            queryStringProcessor.getOffset(),
            queryStringProcessor.getLimit()
        );
        return {
            pagination: paginationResult,
            page: results,
        };
    };

    public filter = async (
        queryStringProcessor: QueryStringProcessor,
        filter: string,
        body: object,
        locals: any,
    ) => {

        const select = ["businesses.id, banners.path"];

        const role = locals.jwt ? locals.jwt.userRole : 'noAuth';
        for (const element of permissions.view[role]) {
            if (permissionsMapped[element] && permissionsMapped[element][0]) {
                select.push("businesses." + permissionsMapped[element][0])
            }
        }

        const joins = [
            new Join('LEFT', 'banners', 'businesses.id=banners.business_id', 'banners')
        ];

        const filterCondition = filter
            ? new Condition(`user_id = ${filter}`)
            : new Condition(`true`);

        const queryConditions = [
            filterCondition,
        ];

        for (const [key, value] of Object.entries(body)) {
            if (!permissionsMapped[key][1](value)) continue;
            queryConditions.push(new Condition(`${permissionsMapped[key][0]} ${permissionsMapped[key][1](value)}`))
        }

        const filterInfo = new FilterInfo(new ConditionGroup(queryConditions));

        const countSelect = ["COUNT (DISTINCT(businesses.id)) AS total"];
        const { total } = await this.getEntitySelect(
            countSelect,
            joins,
            filterInfo
        ).getRawOne();

        const paginationResult = queryStringProcessor.getPaginationResponse(
            parseInt(total)
        );

        const sort = this.getSortObject(select, queryStringProcessor);

        if (Helper.isDefined(sort)) {
            filterInfo.sort = sort;
        }

        let results = await this.entitySelect(
            select,
            joins,
            filterInfo,
            queryStringProcessor.getOffset(),
            queryStringProcessor.getLimit()
        );
        return {
            pagination: paginationResult,
            page: results,
        };
    };


    public listSaved = async (
        queryStringProcessor: QueryStringProcessor,
        filter: string,
        body: object,
        locals: any,
    ) => {

        const select = [`businesses.id,  banners.deleted as 
        bannerDeleted, banners.path,
        likes.id as fsdfdfs, likes.user_id as likesUserId, 
        likes.business_id as likesBusinessId`];

        const role = locals.jwt ? locals.jwt.userRole : 'noAuth';
        for (const element of permissions.view[role]) {
            if (permissionsMapped[element] && permissionsMapped[element][0]) {
                select.push("businesses." + permissionsMapped[element][0])
            }
        }

        const joins = [
            new Join('LEFT', 'banners', 'businesses.id=banners.business_id', 'banners'),
            new Join('LEFT', 'likes', 'businesses.id=likes.business_id', 'likes')
        ];

        const filterCondition = filter
            ? new Condition(`likes.user_id = ${filter}`)
            : new Condition(`true`);

        const queryConditions = [
            filterCondition,
            new Condition('likes.deleted = 0'),
        ];


        for (const [key, value] of Object.entries(body)) {
            if (!permissionsMapped[key][1](value)) continue;
            queryConditions.push(new Condition(`${permissionsMapped[key][0]} ${permissionsMapped[key][1](value)}`))
        }

        const filterInfo = new FilterInfo(new ConditionGroup(queryConditions));

        const countSelect = ["COUNT (DISTINCT(businesses.id)) AS total"];
        const { total } = await this.getEntitySelect(
            countSelect,
            joins,
            filterInfo
        ).getRawOne();

        const paginationResult = queryStringProcessor.getPaginationResponse(
            parseInt(total)
        );

        const sort = this.getSortObject(select, queryStringProcessor);

        if (Helper.isDefined(sort)) {
            filterInfo.sort = sort;
        }

        let results = await this.entitySelect(
            select,
            joins,
            filterInfo,
            queryStringProcessor.getOffset(),
            queryStringProcessor.getLimit()
        );
        return {
            pagination: paginationResult,
            page: results,
        };
    };

}
