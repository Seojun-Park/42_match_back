import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";
import User from "./User";

@Entity()
class Report extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column((type) => User)
  reporter: User;

  @Column({ type: "text" })
  reason: string;

  @Column((type) => User)
  target: User;

  @CreateDateColumn()
  createdAt: string;
}

export default Report;
