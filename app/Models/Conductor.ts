import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import DueO from './DueO'
import VehiculoConductor from './VehiculoConductor'
import Turno from './Turno'
export default class Conductor extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public usuario_id: string

  @column()
  public telefono: string

  @column()
  public numero_licencia: string

  @column()
  public fecha_vencimiento_licencia: Date

  @column()
  public fecha_nacimiento: Date

  @hasOne(() => DueO, {
    foreignKey: 'conductor_id'
  })
  public dueno: HasOne<typeof DueO>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => VehiculoConductor, {
    foreignKey: 'conductor_id'
  })
  public VehiculosConductores: HasMany<typeof VehiculoConductor>

  @hasMany(() => Turno,{
    foreignKey:'conductor_id'
  })
  public conductores:HasMany<typeof Turno>
}
