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
class Image extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @ManyToOne((type) => User, (user) => user.images)
  user: User;

  @Column({ nullable: true })
  userId: number;

  @Column({ type: "text" })
  url: string;

  @CreateDateColumn()
  createdAt: Date;
}

export default Image;
