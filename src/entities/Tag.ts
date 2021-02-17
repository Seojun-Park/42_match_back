import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import User from "./User";

@Entity()
class Tag extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text" })
  title: string;

  @ManyToMany((type) => User, (user) => user.tags)
  @JoinColumn()
  user: User;

  @Column()
  userId: number;

  @CreateDateColumn()
  createdAt: string;
}

export default Tag;
