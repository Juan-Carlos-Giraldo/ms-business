import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cuotas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      // Campos
      table.integer('numero').notNullable()
      table.date('fecha_vencimiento').notNullable()
      table.double('monto').notNullable()
      table.string('estado').notNullable()
      // Relaciones Contrato
      table.integer('contrato_id').unsigned().references('id').inTable('contratoes').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
