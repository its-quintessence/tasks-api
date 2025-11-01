import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Task } from "./Task.ts";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar", { length: 150, unique: true })
  email!: string;

  @Column("varchar", { length: 100 })
  password!: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks!: Task[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
