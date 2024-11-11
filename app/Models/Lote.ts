import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Producto from './Producto'
import Ruta from './Ruta'

export default class Lote extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public peso: number

  //RELACIONES

  //Relacion uno a muchos con la tabla de Producto
  @hasMany(() => Producto, {
    //Nombre de la clave foranea que permita la relacion
    foreignKey: 'departamento_id'
    })
    public productos: HasMany<typeof Producto>
  
    // Relacion de pertenece a... Ruta
    @belongsTo(() => Ruta, {
      foreignKey: 'ruta_id'
    })
    public ruta: BelongsTo<typeof Ruta>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
