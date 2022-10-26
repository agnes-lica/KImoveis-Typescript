import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";

import { Categories } from "./categories.entity";
import { Addresses } from "./addresses.entity";
import { Schedules_users_properties } from "./schedules_users_properties.entity";

@Entity("properties")
class Properties {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "boolean", default: false })
  sold: boolean;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  value: number;

  @Column({ type: "integer" })
  size: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Addresses, { eager: true })
  @JoinColumn()
  address: Addresses;

  @ManyToOne(() => Categories)
  category: Categories;

  @ManyToOne(
    () => Schedules_users_properties,
    (schedules_users_properties) => schedules_users_properties.property
  )
  schedules_users_properties: Schedules_users_properties[];
}

export { Properties };
