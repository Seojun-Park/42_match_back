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
class Report extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @ManyToOne((type) => User, (user) => user.isReported)
  user: User;

  @Column()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;
}

export default Report;
