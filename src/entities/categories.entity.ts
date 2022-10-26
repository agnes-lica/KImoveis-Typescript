import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import { Properties } from "./properties.entity";

@Entity("categories")
class Categories {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 128, unique: true })
  name: string;

  @OneToMany(() => Properties, (properties) => properties.category)
  properties: Properties[];
}

export { Categories };
