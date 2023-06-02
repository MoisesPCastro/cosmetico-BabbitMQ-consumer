import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity()
  export class Produtos {
    @PrimaryGeneratedColumn()
    id?: string;
  
    @Column()
    name_produto: string;
  
    @Column()
    provider: string;
  
    @Column()
    categoria: string;
  
    @Column({ type: 'varchar', nullable: true })
    descricao: string;
  
    @Column()
    value: string;
  
    @Column({ type: 'varchar', nullable: true })
    promotion?: string;
  
    @Column({ type: 'timestamp', nullable: true })
    date_update?: Date;
  
    @CreateDateColumn({ name: 'data_create' })
    date_create: Date;
  }
  