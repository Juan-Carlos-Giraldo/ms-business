import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'conductors'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('usuario_id').notNullable()
      table.string('telefono').notNullable()
      table.string('numero_licencia').notNullable()
      table.date('fecha_vencimiento_licencia').notNullable()
      table.date('fecha_nacimiento').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
