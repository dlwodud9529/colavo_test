import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class eventOp {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    open_interval: number

    @Column()
    close_interval: number

    @Column()
    is_day_off: boolean

    @Column()
    key: string

    @Column()
    weekday: number
}