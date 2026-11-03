import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'orders', schema: 'orders' })
export class OrderEntity {

    @PrimaryGeneratedColumn('uuid')
    orderId: string;

    @Column({ type: 'uuid' })
    customerId: string;

    //@Column({type: 'enum', enum: OrderStatus})+

}