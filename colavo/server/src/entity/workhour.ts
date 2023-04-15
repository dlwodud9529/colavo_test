import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class workhour {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    is_day_off: Boolean

    @Column()
    open_interval: number

    @Column()
    close_interval: number

    @Column()
    weekday: number
}