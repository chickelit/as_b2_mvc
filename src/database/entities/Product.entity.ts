import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column("decimal")
  preco!: number;

  @Column()
  descricao!: string;

  @Column("text", { nullable: true })
  image?: string;
}
