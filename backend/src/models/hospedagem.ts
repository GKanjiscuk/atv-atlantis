import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Acomodacao } from "./acomodacoes.js";
import { Cliente } from "./cliente.js";

@Table({
  tableName: "Hospedagem",
  timestamps: false,
})
export class Hospedagem extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ForeignKey(() => Acomodacao)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  acomodacaoId!: number;

  @BelongsTo(() => Acomodacao)
  acomodacao!: Acomodacao;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  dataEntrada!: Date;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  dataSaida!: Date;

  @BelongsToMany(() => Cliente, () => ClienteHospedagem)
  clientes!: Cliente[];
}

@Table({
  tableName: "ClienteHospedagem",
  timestamps: false,
})
export class ClienteHospedagem extends Model {
  @ForeignKey(() => Cliente)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: "CASCADE",
  })
  clienteId!: number;

  @ForeignKey(() => Hospedagem)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: "CASCADE",
  })
  hospedagemId!: number;
}
