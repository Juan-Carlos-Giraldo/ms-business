import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Departamento from './Departamento'
import Direccion from './Direccion'
import CentroDistribucion from './CentroDistribucion'
import Operacion from './Operacion'
import Restriccion from './Restriccion'

export default class Municipio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public departamento_id: number

  @column()
  public zip_code: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //RELACIONES 
  
  //Relacion pertenece a 
  @belongsTo(() => Departamento, {
    //Clave foranea
    foreignKey: 'departamento_id'
  })
  public departamento: BelongsTo<typeof Departamento>
  
  //Relacion tiene muchos
  @hasMany(() => Direccion, {
  //Nombre de la clave foranea que permita la relacion
  foreignKey: 'municipio_id'
  })
  public direccions: HasMany<typeof Direccion>

  //Relacion tiene muchos
  @hasMany(() => CentroDistribucion, {
  //Nombre de la clave foranea que permita la relacion
  foreignKey: 'municipio_id'
  })
  public centrodistribucions: HasMany<typeof CentroDistribucion>

  //Relacion tiene muchos
  @hasMany(() => Operacion, {
  //Nombre de la clave foranea que permita la relacion
  foreignKey: 'municipio_id'
  })
  public operacions: HasMany<typeof Operacion>;

  @hasMany(() => Restriccion, {
    //Nombre de la clave foranea que permita la relacion
    foreignKey: 'municipio_id'
    })
  public restriccions: HasMany<typeof Restriccion>

}
