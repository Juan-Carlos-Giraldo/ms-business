import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'due_o_vehiculos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.date('fecha_adquisicion').notNullable()
      table.integer('porcentaje_propiedad').notNullable()
      table.integer('vehiculo_id').unsigned().references('vehiculos.id').notNullable()
      table.integer('due_o_id').unsigned().references('due_os.id').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
