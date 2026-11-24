import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.defer(async (db) => {
      const user = await db
        .from('users')
        .select('id', 'created_at')
        .where('email', 'havidu6@gmail.com')
        .first()

      if (user && typeof user.created_at === 'number') {
        await db
          .from('users')
          .where('id', user.id)
          .update({ created_at: new Date(user.created_at).toISOString() })
      }
    })
  }

  async down() {}
}
