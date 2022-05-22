import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Business } from "../../business/entities/business.entity";
import { Common } from "../../common/entities/common";

@Entity("messages")
export class Message extends Common {

    @Column("varchar", {
        nullable: true,
        length: 256,
        name: "posted_by",
    })
    public postedBy: string;

    @Column("varchar", {
        nullable: true,
        length: 256,
        name: "email",
    })
    public email: string;

    @Column("varchar", {
        nullable: true,
        length: 256,
        name: "subject",
    })
    public subject: string;

    @Column("text", {
        nullable: true,
        name: "message",
    })
    public message: string;

    @Column("int", {
        nullable: true,
        name: "business_id"
    })
    public businessId: number;

    @ManyToOne(() => Business, (business) => business.messages, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "business_id" })
    public business: Business

    @Column("varchar", {
        nullable: true,
        name: "link"
    })
    public link: string;
}