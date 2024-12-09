import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'dir_lista_ordenes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('orden').notNullable()
      table.string('descripcion')
      // Ruta y Direccion
      table.integer('ruta_id').unsigned().references('id').inTable('rutas').onDelete('CASCADE')
      table.integer('direccion_id').unsigned().references('id').inTable('direccions').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
