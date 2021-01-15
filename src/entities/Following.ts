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
class Following extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @ManyToOne((type) => User, (user) => user.following)
  user: User;

  @Column()
  followingId: number;

  @Column({ type: "boolean", default: false })
  isLiked: boolean;

  @CreateDateColumn()
  createdAt: Date;
}

export default Following;
