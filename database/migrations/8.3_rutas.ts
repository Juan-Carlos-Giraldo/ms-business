import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'rutas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      // Campos
      table.string('nombre').notNullable()
      table.string('origen').notNullable()
      table.string('destino').notNullable()
      table.double('distancia').notNullable()

      // Relaciones Contrato, Vehiculo
      table.integer('contrato_id').unsigned().references('id').inTable('contratoes').onDelete('CASCADE')
      table.integer('vehiculo_id').unsigned().references('id').inTable('vehiculos').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
