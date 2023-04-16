import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class workhour {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    begin_at: number

    @Column()
    end_at: number

    @Column()
    created_at: number

    @Column()
    updated_at: number
}