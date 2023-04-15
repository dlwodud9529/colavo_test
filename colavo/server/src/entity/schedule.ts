import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class schedule {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    day: number

    @Column()
    begin_at: number

    @Column()
    end_at: number
}
