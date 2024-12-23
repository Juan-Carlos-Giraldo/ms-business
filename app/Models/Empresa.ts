import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Cliente from './Cliente'
import PersonaNatural from './PersonaNatural'

export default class Empresa extends BaseModel {
  public static table = 'empresas'

  @column({ isPrimary: true })
  public id: number

  @column()
  public nit: string

  @column()
  public tipo_empresa: string

  @column()
  public direccion_fiscal: string

  @column()
  public cliente_id: number

  @column()
  public persona_natural_id: number 

  @belongsTo(() => PersonaNatural, {
    foreignKey: 'persona_natural_id'
  })
  public personaNatural: BelongsTo<typeof PersonaNatural>

  @belongsTo(() => Cliente, {
     foreignKey: 'cliente_id'
  })
  public cliente: BelongsTo<typeof Cliente>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
