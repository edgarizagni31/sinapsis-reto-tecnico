const getInstance = require("../config/database");

class CampaignRepository {
  constructor() {
    this.db = getInstance();
  }

  async create(data) {
    try {
      await this.db.query("START TRANSACTION");

      const users = await this.db.query(
        "SELECT id FROM users WHERE clientId = ?",
        [data.clientId]
      );
      const sqlParams = [];

      sqlParams.push(data.name);
      sqlParams.push(data.programingDate);
      sqlParams.push(users[0].id);

      const { insertId: campaingId } = await this.db.query(`INSERT INTO campaings (name, programingDate, userId) VALUES (?, ?, ?);`,
        sqlParams
      );

      const placeholders = data.messages.map(() => "(?, ?, ?)").join(", ");
      const query = `INSERT INTO messages (message, campaingId, sendDatetime) VALUES ${placeholders}`;

      const values = data.messages.flatMap((msg) => [
        msg.message,
        campaingId,
        msg.sendDatetime,
      ]);

      await this.db.query(query, values);

      await this.db.query("COMMIT");

      return {
        id: campaingId,
        status: 1,
        ...data,
      };
    } catch (err) {
      await this.db.query("ROLLBACK");

      throw err;
    } finally {
      this.db.end();
    }
  }
}

module.exports = CampaignRepository;
