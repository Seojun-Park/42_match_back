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

  @Column((type) => User)
  target: User;

  @Column({ type: "boolean", default: false })
  isLiked: boolean;

  @CreateDateColumn()
  createdAt: string;
}

export default Following;
