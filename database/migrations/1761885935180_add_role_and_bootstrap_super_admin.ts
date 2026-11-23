import { BaseSchema } from '@adonisjs/lucid/schema'
import hash from '@adonisjs/core/services/hash'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    const password = process.env.SUPERADMIN_PASSWORD
    if (!password) {
      throw new Error('SUPERADMIN_PASSWORD must be set before running migrations')
    }

    const existingSuperAdmin = await this.db
      .from(this.tableName)
      .select('id')
      .where('email', 'havidu6@gmail.com')
      .first()
    if (existingSuperAdmin) {
      throw new Error('Cannot bootstrap superadmin: havidu6@gmail.com already exists')
    }

    this.schema.alterTable(this.tableName, (table) => {
      table
        .enu('role', ['super_admin', 'admin_etablissement', 'employé'])
        .notNullable()
        .defaultTo('employé')
    })

    this.defer(async (db) => {
      await db.table(this.tableName).insert({
        full_name: 'Havi',
        email: 'havidu6@gmail.com',
        password: await hash.make(password),
        poste: null,
        etablissement: null,
        role: 'super_admin',
        validate: true,
        created_at: new Date().toISOString(),
        updated_at: null,
      })
    })
  }

  async down() {
    await this.db.from(this.tableName).where('email', 'havidu6@gmail.com').delete()
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('role')
    })
  }
}
