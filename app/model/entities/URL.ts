import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique} from "typeorm";
import User from "./User";

@Entity()
export default class URL {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User)
    user: User;

    @Column({unique: true})
    shortUrlId: string;

    @Column()
    longURL: string;

}