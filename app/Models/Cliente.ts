import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Producto from "./Producto";
import Contrato from "./Contrato";

export default class Cliente extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public nit: string;

  @column()
  public dpi: string;

  @column()
  public contacto: string;

  // Relaciones

  // Relacion tiene muchos... Producto
  @hasMany(() => Producto, {
    foreignKey: "cliente_id",
  })
  public productos: HasMany<typeof Producto>;

  // Relacion tiene muchos... Contrato
  @hasMany(() => Contrato, {
    foreignKey: "cliente_id",
  })
  public contratos: HasMany<typeof Contrato>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
