import { Column, Entity } from "typeorm";
import { Common } from "../../common/entities/common";

@Entity("emails")
export class Email extends Common {

    @Column("varchar", {
        nullable: true,
        length: 256,
        name: "email",
    })
    public email: string;


}