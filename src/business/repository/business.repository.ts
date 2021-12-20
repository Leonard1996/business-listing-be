import { EntityRepository } from "typeorm";
import { CommonRepository } from "../../common/repositories/common.repository";
import { Helper } from "../../common/utilities/Helper";
import { Condition } from "../../common/utilities/QueryBuilder/Condition";
import { ConditionGroup } from "../../common/utilities/QueryBuilder/ConditionGroup";
import { FilterInfo } from "../../common/utilities/QueryBuilder/FilterInfo";
import { Join } from "../../common/utilities/QueryBuilder/Join";
import { QueryStringProcessor } from "../../common/utilities/QueryStringProcessor";
import { Business } from "../entities/business.entity";


@EntityRepository(Business)
export class BusinessRepository extends CommonRepository<Business> {
    public list = async (
        queryStringProcessor: QueryStringProcessor,
        filter: string,
    ) => {
        const select = [" businesses.*, banners.path"];

        const joins = [
            new Join('LEFT', 'banners', 'businesses.id=banners.business_id', 'banners')
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
}
