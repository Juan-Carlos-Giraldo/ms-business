import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, hasMany, HasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Municipio from './Municipio'
import DirListaOrden from './DirListaOrden';
import CentroDistribucion from './CentroDistribucion'

export default class Direccion extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public neighborhood: string

  @column()
  public address: string

  @column()
  public comentaries: string
  
  @column()
  public municipio_id: number

  @hasOne(() => CentroDistribucion, {
    foreignKey: 'direccion_id'
  })
  public centrosDistribucion: HasOne <typeof CentroDistribucion>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

   //RELACIONES 
  
  //Relacion pertenece a 
  @belongsTo(() => Municipio, {
    //Clave foranea
    foreignKey: 'municipio_id'
  })
  public municipio: BelongsTo<typeof Municipio>
  
  @hasMany(() => DirListaOrden, {
    foreignKey: 'direccion_id'
  })
  public dirListaOrden: HasMany<typeof DirListaOrden>
}
