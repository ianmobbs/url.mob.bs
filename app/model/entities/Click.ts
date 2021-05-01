import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn} from "typeorm";
import URL from "./URL";

@Entity()
export default class Click {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => URL)
    url: URL;

    @Column()
    @CreateDateColumn({ name: "create_time" })
    timestamp: Date;
}