import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column("decimal")
  preco!: string;

  @Column()
  descricao!: string;

  @Column({ nullable: true })
  fileName!: string;

}
