import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Contrato from './Contrato'
import Vehiculo from './Vehiculo'
import Lote from './Lote'
import DirListaOrden from './DirListaOrden';

export default class Ruta extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public origen: string

  @column()
  public destino: string

  @column()
  public distancia: number

  @column()
  public contrato_id:number

  @column()
  public vehiculo_id:number

  // Relaciones

  // Relacion de le pertenece a... Contrato
  @belongsTo(() => Contrato, {
    foreignKey: 'contrato_id'
  })
  public contrato: BelongsTo<typeof Contrato>

  // Relacion de le pertenece a... Vehiculo
  @belongsTo(() => Vehiculo, {
    foreignKey: 'vehiculo_id'
  })
  public vehiculo: BelongsTo<typeof Vehiculo>

  // Relacion tiene muchos... Lote
  @hasMany(() => Lote, {
    foreignKey: 'ruta_id'
  })
  public lotes: HasMany<typeof Lote>

  // Relacion tiene muchos... Orden
  // @hasMany(() => Orden, {
  //   foreignKey: 'ruta_id'
  // })
  // public ordenes: HasMany<typeof Orden>

  @hasMany(() => DirListaOrden, {
    foreignKey: 'ruta_id'
  })
  public dirListaOrden: HasMany<typeof DirListaOrden>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
