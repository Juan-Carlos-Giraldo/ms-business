import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import _municipios from './3_municipios'

export default class extends BaseSchema {
  protected tableName = 'restriccions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('descripcion')
      table.date('fecha_inicio')
      table.date('fecha_fin')
      table.integer('municipio_id').unsigned().references('municipios.id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
