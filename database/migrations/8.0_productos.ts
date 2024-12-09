import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'productos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable()
      table.string('description', 255).notNullable()
      table.integer('price').notNullable()
      table.integer('stock').notNullable()
      
      // Relaciones
      //table.integer('lote_id').unsigned().references('id').inTable('lotes').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer('cliente_id').unsigned().references('id').inTable('clientes').onDelete('CASCADE').onUpdate('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
