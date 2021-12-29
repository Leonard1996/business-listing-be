import { Column, Entity, JoinColumn, ManyToMany, OneToMany } from "typeorm";
import { Attachment } from "../../attachment/entities/attachment.entity";
import { Common } from "../../common/entities/common";
import { User } from "../../user/entities/user.entity";
import { Message } from "./message.entity";

@Entity("businesses")
export class Business extends Common {
    @Column("varchar", {
        nullable: true,
        length: 155,
        name: "owner_name",
    })
    public ownerName: string;

    @Column("int", {
        nullable: true,
        name: "age",
    })
    public age: number;

    @Column("varchar", {
        nullable: true,
        length: 155,
        name: "email",
    })
    public email: string;

    @Column("varchar", {
        nullable: true,
        name: "number",
        length: 155,
    })
    public number: string;

    @Column("int", {
        nullable: true,
        name: "no_of_staff",
    })
    public noOfStaff: number;

    @Column("int", {
        nullable: true,
        name: "no_of_shareholders",
    })
    public noOfShareholders: number;

    @Column("varchar", {
        nullable: true,
        length: 155,
        name: "reference",
    })
    public reference: string;

    @Column("varchar", {
        nullable: true,
        length: 155,
        name: "name_of_business",
    })
    public nameOfBusiness: string;

    @Column("varchar", {
        nullable: true,
        length: 155,
        name: "title",
    })
    public title: string;

    @Column("varchar", {
        nullable: true,
        length: 155,
        name: "relocatable",
    })
    public relocatable: string;

    @Column("varchar", {
        nullable: true,
        length: 155,
        name: "owner_managed",
    })
    public ownerManaged: string;

    @Column("varchar", {
        nullable: true,
        length: 155,
        name: "reason_for_selling",
    })
    public reasonForSelling: string;

    @Column("varchar", {
        nullable: true,
        length: 155,
        name: "industry",
    })
    public industry: string;

    @Column("timestamp", {
        nullable: true,
        name: "date_added",
    })
    public dateAdded: Date | null;

    @Column("timestamp", {
        nullable: true,
        name: "year_established",
    })
    public yearEstablished: Date | null;

    @Column("double", {
        nullable: true,
        name: "current_debts",
    })
    public currentDebts: number;

    @Column("double", {
        nullable: true,
        name: "projected_annual_profit",
    })
    public projectedAnnualProfit: number;

    @Column("double", {
        nullable: true,
        name: "last_annual_profit",
    })
    public lastAnnualProfit: number;

    @Column("double", {
        nullable: true,
        name: "projected_annual_turnover",
    })
    public projectedAnnualTurnover: number;

    @Column("double", {
        nullable: true,
        name: "last_annual_turnover",
    })
    public lastAnnualTurnover: number;

    @Column("double", {
        nullable: true,
        name: "asking_price",
    })
    public askingPrice: number;

    @Column("text", {
        nullable: true,
        name: "services",
    })
    public services: string;

    @Column("text", {
        nullable: true,
        name: "description",
    })
    public description: string;

    @Column("varchar", {
        nullable: true,
        length: 155,
        name: "address",
    })
    public address: string;

    @Column("varchar", {
        nullable: true,
        length: 155,
        name: "area",
    })
    public area: string;

    @Column("varchar", {
        nullable: true,
        length: 155,
        name: "city",
    })
    public city: string;

    @Column("double", {
        nullable: true,
        name: "map_position_lat",
    })
    public mapPositionLat: string;

    @Column("double", {
        nullable: true,
        name: "map_position_lng",
    })
    public mapPositionLng: string;

    @Column("double", {
        nullable: true,
        name: "marker_position_lat",
    })
    public markerPositionLat: string;

    @Column("double", {
        nullable: true,
        name: "marker_position_lng",
    })
    public markerPositionLng: string;

    @Column("varchar", {
        nullable: true,
        length: 155,
        name: "state",
    })
    public state: string;

    @OneToMany(() => Attachment, (attachment) => attachment.business)
    public attachments: Attachment[];

    @OneToMany(() => Message, (attachment) => attachment.message)
    public messages: Message[];

    @ManyToMany(() => User, (user) => user.businesses)
    @JoinColumn({ name: "user_id" })
    public user: User;

    @Column("int", {
        nullable: true,
        name: "user_id"
    })
    public userId: number;

}
