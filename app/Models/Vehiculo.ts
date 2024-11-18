import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Operacion from './Operacion'
import Ruta from './Ruta'
import Seguro from './Seguro'
import DueOVehiculo from './DueOVehiculo'
import VehiculoConductor from './VehiculoConductor'



export default class Vehiculo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public plate: string

  @column()
  public model: string

  @column()
  public capacity: number

  @column()
  public cargo_type: string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //RELACIONES

  //Relacion tiene muchos
  @hasMany(() => Operacion, {
    //Nombre de la clave foranea que permita la relacion
    foreignKey: 'vehiculo_id'
  })
  public operacions: HasMany<typeof Operacion>

  // Relacion de tiene muchos... Ruta
  @hasMany(() => Ruta, {
    foreignKey: 'vehiculo_id'
  })
  public rutas: HasMany<typeof Ruta>

  @hasMany(() => Seguro,{
    foreignKey:'vehiculo_id'
  })
  public seguros:HasMany<typeof Seguro>

  @hasMany(() => DueOVehiculo, {
    foreignKey: 'vehiculo_id'
  })
  public duenosVehiculos: HasMany<typeof DueOVehiculo>

  @hasMany(() => VehiculoConductor, {
    foreignKey: 'vehiculo_id'
  })
  public VehiculosConductores: HasMany<typeof VehiculoConductor>

}
