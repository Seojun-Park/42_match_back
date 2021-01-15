import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import User from "./User";

@Entity()
class Tag extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text" })
  title: string;

  @ManyToOne((type) => User, (user) => user.tags)
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}

export default Tag;
