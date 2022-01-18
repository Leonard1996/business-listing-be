import { Column, Entity, OneToMany } from "typeorm";
import { Business } from "../../business/entities/business.entity";
import { Like } from "../../business/entities/like.entity";
import { Common } from "../../common/entities/common";

@Entity("users")
export class User extends Common {
  @Column("varchar", {
    nullable: false,
    length: 256,
    name: "username",
  })
  public username: string;

  @Column("varchar", {
    nullable: true,
    length: 256,
    name: "password",
  })
  public password: string | null;

  @Column("varchar", {
    nullable: false,
    length: 256,
    name: "name",
  })
  public name: string;

  @Column("varchar", {
    nullable: false,
    length: 256,
    name: "surname",
  })
  public surname: string;

  @Column("varchar", {
    nullable: false,
    length: 256,
    name: "email",
  })
  public email: string;

  @Column("varchar", {
    nullable: false,
    length: 256,
    name: "profile_picture",
  })
  public profilePicture?: string;

  @Column("varchar", {
    nullable: false,
    length: 256,
    name: "role",
  })
  public role?: string;

  @Column("tinyint", {
    nullable: false,
    width: 1,
    default: () => "'0'",
    name: "verified",
  })
  public isVerified?: boolean;

  @Column("tinyint", {
    nullable: false,
    default: () => "'0'",
    name: "is_tutorial_checked",
  })
  public is_tutorial_checked: number;

  @Column("varchar", {
    nullable: true,
    length: 256,
    name: "verify_token",
  })
  public verifyToken?: string | null;

  @Column("timestamp", {
    nullable: true,
    name: "ts_verify_token_expiration",
  })
  public tsVerifyTokenExpiration?: Date | null;

  @Column("varchar", {
    nullable: true,
    length: 256,
    name: "modify_password_token",
  })
  public modifyPasswordToken?: string | null;

  @Column("timestamp", {
    nullable: true,
    name: "ts_modify_password_token_expiration",
  })
  public tsModifyPasswordTokenExpiration?: Date | null;

  @Column("varchar", {
    nullable: true,
    name: "phone_number",
  })
  public phoneNumber: string;

  @OneToMany(() => Business, (business) => business.user)
  public businesses: Business[];

  @OneToMany(() => Like, (like) => like.business)
  public likes: Like[];

  public toResponseObject = () => {
    return {
      id: this.id,
      name: this.name,
      surname: this.surname,
      email: this.email,
      role: this.role,
      profilePicture: this.profilePicture,
      isTutorialChecked: this.is_tutorial_checked,
      tsCreated: this.tsCreated,
      tsLastModified: this.tsLastModified,
      phoneNumber: this.phoneNumber,
    };
  };
}
