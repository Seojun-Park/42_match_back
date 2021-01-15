import bcrypt from "bcrypt";
import { IsEmail } from "class-validator";
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import Following from "./Following";
import Follower from "./Follower";
import Tag from "./Tag";
import Report from "./Report";
import Image from "./Image";

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text" })
  @IsEmail()
  email: string;

  @Column({ type: "text" })
  username: string;

  @Column({ type: "text" })
  firstName: string;

  @Column({ type: "text" })
  lastName: string;

  @Column({ type: "text", nullable: true })
  password: string;

  @Column({ type: "text", nullable: true })
  gender: string;

  @Column({ type: "number" })
  age: number;

  @OneToMany((type) => Image, (image) => image.user)
  images: Image[];

  @Column({ type: "text", nullable: true })
  profilePhoto: string;

  @Column({ type: "text", nullable: true })
  preference: string[];

  @Column({ type: "text", nullable: true })
  location: string;

  @Column({ type: "double precision", nullable: true })
  lastLat: number;

  @Column({ type: "double precision", nullable: true })
  lastLng: number;

  @OneToMany((type) => Following, (following) => following.user)
  following: Following[];

  @OneToMany((type) => Follower, (follower) => follower.user)
  follower: Follower[];

  @Column({ type: "number", default: 0 })
  followercount: number;

  @Column({ type: "number", default: 0 })
  followingcount: number;

  //   do i need to save it in the db?
  @Column({ type: "boolean", default: false })
  isMatch: boolean;

  @Column({ type: "number", nullable: true })
  fameRating: number;

  @OneToMany((type) => Tag, (tag) => tag.user, { nullable: true })
  tags: Tag[];

  @OneToMany((type) => Report, (report) => report.user)
  isReported: Report[];

  //   and this one as well
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
