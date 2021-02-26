import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import Chat from "./Chat";
import User from "./User";

@Entity()
class Message extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @ManyToOne((type) => Chat, (chat) => chat.messages)
  chat: Chat;

  @Column()
  chatId: number;

  @ManyToOne((type) => User, (user) => user.sent)
  sender: User;

  @Column({ nullable: true })
  senderId: number;

  @ManyToOne((type) => User, (user) => user.received)
  receiver: User;

  @Column({ nullable: true })
  receiverId: number;

  @Column({ type: "text" })
  text: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Message;
