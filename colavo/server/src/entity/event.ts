import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class event {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    created_at: number

    @Column()
    updated_at: number

    @Column()
    begin_at: number

    @Column()
    end_at: number
}