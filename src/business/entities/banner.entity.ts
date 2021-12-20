import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { Attachment } from "../../attachment/entities/attachment.entity";
import { Common } from "../../common/entities/common";
import { Business } from "./business.entity";


@Entity("banners")
export class Banner extends Common {
    @Column("mediumtext", {
        nullable: true,
        name: "path",
    })
    public path: string;

    @Column("int", {
        nullable: true,
        name: "business_id",
    })
    public businessId: number;

    @OneToOne(() => Business)
    @JoinColumn({ name: "business_id" })
    public business: Business;

}