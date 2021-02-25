import { BaseEntity, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Chat extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  
}

export default Chat;
