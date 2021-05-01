import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, OneToMany, CreateDateColumn} from "typeorm";
import User from "./User";
import Click from "./Click";

@Entity()
export default class URL {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User)
    user: User;

    @OneToMany(() => Click, click => click.url, {eager: true})
    clicks: Click[]

    @Column({unique: true})
    shortUrlId: string;

    @Column()
    longURL: string;

    @Column({nullable: true, default: null})
    expiration: Date;
}