import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import User from "./User";

@Entity()
class Follower extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @ManyToOne((type) => User, (user) => user.follower)
  user: User;

  @Column()
  followerId: number;

  @Column({ type: "boolean", default: false })
  isLiked: boolean;

  @CreateDateColumn()
  createdAt: Date;
}

export default Follower;
