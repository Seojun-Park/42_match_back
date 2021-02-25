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
class BlockedUser extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @ManyToOne((type) => User, (user) => user.block)
  owner: User;

  @Column()
  ownerId: number;

  @Column((type) => User)
  target: User;

  @CreateDateColumn()
  createdAt: string;
}

export default BlockedUser;
