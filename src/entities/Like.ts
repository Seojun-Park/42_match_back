import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import User from "./User";

@Entity()
class Like extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "boolean", default: false })
  isMatch: boolean;

  @Column({ type: "text", enum: ["WAITING", "ACCEPTED"], default: "WAITING" })
  status: string;

  @ManyToOne((type) => User, (user) => user.likeTo)
  to: User;

  @ManyToOne((type) => User, (user) => user.likeFrom)
  from: User;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Like;
