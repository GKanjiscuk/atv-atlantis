import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from "sequelize-typescript";
import { Telefone } from "./telefone.js";
import { Documento } from "./documento.js";
import { Endereco } from "./endereco.js";
import { ClienteHospedagem, Hospedagem } from "./hospedagem.js";

@Table({
  tableName: "Cliente",
  timestamps: false,
})
export class Cliente extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
  })
  nome!: string;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
  })
  nomeSocial!: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  dataNascimento!: Date;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  dataCadastro!: Date;

  @HasMany(() => Telefone)
  telefones!: Telefone[];

  @HasMany(() => Documento)
  documentos!: Documento[];

  @HasOne(() => Endereco)
  enderecos!: Endereco;

  @ForeignKey(() => Cliente)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    onDelete: "SET NULL",
  })
  titularId!: number;

  @HasMany(() => Cliente, "titularId")
  dependentes!: Cliente[];

  @BelongsTo(() => Cliente, "titularId")
  titular!: Cliente;

  @BelongsToMany(() => Hospedagem, () => ClienteHospedagem)
  hospedagens!: Hospedagem[];
}