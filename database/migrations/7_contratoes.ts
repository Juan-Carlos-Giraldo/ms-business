import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'contratoes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      // Campos de la tabla
      table.integer('dias').notNullable()
      table.integer('cantidad').notNullable()
      table.double('precio_total').notNullable()
      table.string('estado').notNullable()
      // Relaciones con: Cliente
      table.integer('cliente_id').unsigned().references('id').inTable('clientes')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
