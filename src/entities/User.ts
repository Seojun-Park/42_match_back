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

  @Column({ type: "integer" })
  age: number;

  @OneToMany((type) => Image, (image) => image.user)
  images: Image[];

  @Column({ type: "text", nullable: true })
  profilePhoto: string;

  @Column({ type: "text", nullable: true })
  preference: string[];

  @Column({ type: "text", nullable: true })
  location: string;

  @Column({ type: "text", nullable: true })
  intro: string;

  @Column({ type: "double precision", nullable: true })
  lastLat: number;

  @Column({ type: "double precision", nullable: true })
  lastLng: number;

  @OneToMany((type) => Following, (following) => following.user)
  following: Following[];

  @OneToMany((type) => Follower, (follower) => follower.user)
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

  @OneToMany((type) => Report, (report) => report.user)
  isReported: Report[];

  @Column({ type: "boolean", default: false })
  isBlocked: boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  public comparePassword(password: string): any {
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
    if (this.follower.length !== 0) {
      this.followercount = this.follower.length;
    }
  }

  @BeforeInsert()
  @BeforeUpdate()
  async followingCount(): Promise<void> {
    if (this.following.length !== 0) {
      this.followingcount = this.following.length;
    }
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}

export default User;
