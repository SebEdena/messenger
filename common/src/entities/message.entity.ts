import { AuditEntity } from "@entities/abstract.entity";
import { Room } from "@entities/room.entity";
import { User } from "@entities/user.entity";
import { Column, Entity, ManyToOne, Relation } from "typeorm";

@Entity()
export class Message extends AuditEntity {
    @Column({ default: "" })
    content: string;

    @ManyToOne(() => User)
    author: Relation<User>;

    @ManyToOne(() => Room, (room) => room.messages, {
        cascade: true,
    })
    room: Relation<Room>;
}

