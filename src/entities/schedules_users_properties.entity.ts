import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

import { Properties } from "./properties.entity";
import { User } from "./user.entity";

@Entity("schedules_users_properties")
class Schedules_users_properties {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "time" })
  hour: Date;

  @Column({ type: "date" })
  date: Date;

  @ManyToOne(() => Properties)
  property: Properties;

  @ManyToOne(() => User)
  user: User;
}

export { Schedules_users_properties };
