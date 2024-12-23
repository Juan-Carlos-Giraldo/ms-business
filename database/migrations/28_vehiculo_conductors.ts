import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'vehiculo_conductors'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.date('fecha_inicio').notNullable()
      table.date('fecha_fin').notNullable()
      table.integer('vehiculo_id').unsigned().references('vehiculos.id').notNullable()
      table.integer('conductor_id').unsigned().references('conductors.id').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
