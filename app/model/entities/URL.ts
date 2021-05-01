import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export default class URL {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user: string;

    @Column()
    shortUrlId: string;

    @Column()
    longURL: string;

}