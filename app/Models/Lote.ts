import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Producto from './Producto'
//import Ruta from './Ruta'
import DirListaOrden from "./DirListaOrden";

export default class Lote extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public peso: number

  @column()
  public dir_lista_orden_id: number;

  // @column()
  // public ruta_id: number

  //RELACIONES

  //Relacion uno a muchos con la tabla de Producto
  @hasMany(() => Producto, {
    foreignKey: "lote_id",
  })
  public productos: HasMany<typeof Producto>;

    @belongsTo(() => DirListaOrden, {
      foreignKey: "dir_lista_orden_id",
    })
    public dirListaOrden: BelongsTo<typeof DirListaOrden>;

    // Relacion de pertenece a... Ruta
    // @belongsTo(() => Ruta, {
    //   foreignKey: 'ruta_id'
    // })
    // public ruta: BelongsTo<typeof Ruta>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
