import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Common } from "../../common/entities/common";
import { User } from "../../user/entities/user.entity";
import { Business } from "./business.entity";

@Entity("likes")
export class Like extends Common {
    @Column("int", {
        nullable: true,
        name: "business_id",
    })
    public businessId: number;

    @Column("int", {
        nullable: true,
        name: "user_id",
    })
    public userId: number;

    @ManyToOne(() => Business, (business) => business.likes)
    @JoinColumn({ name: "business_id" })
    public business: Business

    @ManyToOne(() => User, (user) => user.likes)
    @JoinColumn({ name: "user_id" })
    public user: User

}