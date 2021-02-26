import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import Message from "./Message";
import User from "./User";

@Entity()
class Chat extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @OneToMany((type) => Message, (message) => message.chat, {
    nullable: true,
    onDelete: "CASCADE"
  })
  messages: Message[];

  @Column((type) => User)
  from: User;

  @Column((type) => User)
  to: User;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Chat;
