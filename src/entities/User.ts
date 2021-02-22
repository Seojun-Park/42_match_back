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
import Following from "./Following";
import Follower from "./Follower";
import Tag from "./Tag";
import Report from "./Report";
import Image from "./Image";
import BlockedUser from "./Block";

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

  @OneToMany((type) => Following, (following) => following.user, {
    nullable: true
  })
  following: Following[];

  @OneToMany((type) => Follower, (follower) => follower.user, {
    nullable: true
  })
  follower: Follower[];

  @OneToMany((type) => BlockedUser, (blockeduser) => blockeduser.user, {
    nullable: true
  })
  block: BlockedUser[];

  @Column({ type: "integer", default: 0 })
  followercount: number;

  @Column({ type: "integer", default: 0 })
  followingcount: number;

  @Column({ type: "integer", nullable: true, default: 0 })
  fameRating: number;

  @ManyToMany((type) => Tag, (tag) => tag.user, { nullable: true })
  tags: Tag[];

  @OneToMany((type) => Report, (report) => report.user, { nullable: true })
  isReported: Report[];

  @Column({ type: "boolean", default: false })
  isBlocked: boolean;

  @Column({ type: "boolean", default: false })
  isVerified: boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  public comparePassword(password: string): Promise<boolean> {
    let result: boolean;
    // bcrypt.hash(password, 10, (err, res) => {
    // bcrypt.compare(password, this.password).then((res) => {
    // console.log(res);
    // });
    // });
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        throw err;
      }
      bcrypt.compare(password, hash, (err, res) => {
        if (err) {
          throw err;
        }
        console.log(res);
        result = res;
        return result;
        // return res;
      });
    });
    return bcrypt.compare(password, this.password);
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
  async followerCount(): Promise<void> {
    if (this.follower && this.follower.length !== 0) {
      this.followercount = this.follower.length;
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  async followingCount(): Promise<void> {
    if (this.following && this.following.length !== 0) {
      this.followingcount = this.following.length;
    }
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}

export default User;
