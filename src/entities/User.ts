import bcrypt from "bcrypt";
import { IsEmail } from "class-validator";
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import Tag from "./Tag";
import Image from "./Image";
import BlockedUser from "./Block";
import Like from "./Like";
import Message from "./Message";

const BCRYPT_ROUNDS = 10;

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text" })
  @IsEmail()
  email: string;

  @Column({ type: "text" })
  username: string;

  @Column({ type: "text", nullable: true })
  password: string;

  @Column({ type: "text", nullable: true })
  secretCode: string;

  @Column({ type: "text" })
  firstName: string;

  @Column({ type: "text" })
  lastName: string;

  @Column({ type: "text", nullable: true, enum: ["MALE", "FEMAIL"] })
  gender: string;

  @Column({ type: "integer", nullable: true })
  age: number;

  @OneToMany((type) => Image, (image) => image.user)
  images: Image[];

  @Column({
    type: "text",
    nullable: true
  })
  profilePhoto: string;

  @Column({ type: "text", nullable: true, default: [] })
  preference: string[];

  @Column({ type: "text", nullable: true })
  location: string;

  @Column({ type: "text", nullable: true })
  intro: string;

  @Column({ type: "double precision", nullable: true })
  lastLat: number;

  @Column({ type: "double precision", nullable: true })
  lastLng: number;

  @OneToMany((type) => BlockedUser, (blockeduser) => blockeduser.owner, {
    nullable: true,
    onDelete: "CASCADE"
  })
  block: BlockedUser[];

  @Column({ type: "integer", nullable: true, default: 0 })
  fameRating: number;

  @ManyToMany((type) => Tag, (tag) => tag.user, { nullable: true })
  tags: Tag[];

  @OneToMany((type) => Like, (like) => like.to, { nullable: true })
  likeTo: Like[];

  @OneToMany((type) => Like, (like) => like.from, { nullable: true })
  likeFrom: Like[];

  @OneToMany((type) => Message, (message) => message.sender)
  sent: Message[];

  @OneToMany((type) => Message, (message) => message.receiver)
  received: Message[];

  @Column({ type: "boolean", default: false })
  isBlocked: boolean;

  @Column({ type: "boolean", default: false })
  isVerified: boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  public comparePassword(password: string): any {
    return true;
    // return bcrypt.compare(password, this.password);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    if (this.password) {
      const hashed = await this.hashPassword(this.password);
      this.password = hashed;
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  async fameRatingCounter(): Promise<void> {
    if (this.likeFrom && this.likeFrom.length !== 0) {
      this.fameRating = this.likeFrom.length;
    }
  }

  private hashPassword(password: string): string {
    return bcrypt.hashSync(password, BCRYPT_ROUNDS);
  }
}

export default User;
