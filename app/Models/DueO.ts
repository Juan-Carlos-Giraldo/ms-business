import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Conductor from './Conductor'
import DueOVehiculo from './DueOVehiculo'
export default class DueO extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public usuario_id: string
  
  @column()
  public telefono: string

  @column()
  public fecha_nacimiento: Date

  @column()
  public conductor_id: number

  @belongsTo(() => Conductor, {
    foreignKey: 'conductor_id'
  })
  public conductor: BelongsTo<typeof Conductor>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => DueOVehiculo, {
    foreignKey: 'dueno_id'
  })
  public duenosVehiculos: HasMany<typeof DueOVehiculo>
}
