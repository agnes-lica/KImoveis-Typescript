import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("addresses")
class Addresses {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 128 })
  district: string;

  @Column({ length: 128 })
  zipCode: string;

  @Column({ length: 128 })
  number: string;

  @Column({ length: 128 })
  city: string;

  @Column({ length: 128 })
  state: string;
}

export { Addresses };
