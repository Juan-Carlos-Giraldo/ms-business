import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  hasMany,
  HasMany,
} from "@ioc:Adonis/Lucid/Orm";
import CategoriaProducto from "./CategoriaProducto";
import Cliente from "./Cliente";
import Lote from "./Lote";

export default class Producto extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public description: string;

  @column()
  public price: number;

  @column()
  public stock: number;

  @column()
  public cliente_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  //RELACIONES

  //Relacion de tiene muchos... CategoriaProducto
  @hasMany(() => CategoriaProducto, {
    foreignKey: "producto_id",
  })
  public categoriaproductos: HasMany<typeof CategoriaProducto>;

  @belongsTo(() => Cliente, {
    foreignKey: "cliente_id",
  })
  public cliente: BelongsTo<typeof Cliente>;

  
  @belongsTo(() => Lote, {
    foreignKey: "lote_id",
  })
  public lote: BelongsTo<typeof Lote>;
}
