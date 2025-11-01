import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User.ts";

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar", { length: 200 })
  label!: string;

  @Column("boolean", { default: false })
  status!: boolean;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: "CASCADE" })
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
