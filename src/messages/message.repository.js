const getInstance = require("../config/database");

class MessageRepository {
  constructor() {
    this.db = getInstance();
  }

  async countMessagesFilterByMonth(daterange) {
    const query = `
      SELECT sendStatus, count(sendStatus) AS quantity 
      FROM messages
      WHERE status = 1
      AND sendDatetime >= ?
      AND sendDatetime < ?
      GROUP BY sendStatus;
    `;
    const sqlParams = [];

    sqlParams.push(daterange.start);
    sqlParams.push(daterange.end);

    const result = await this.db.query(query, sqlParams);

    await this.db.end();

    return result;
  }

  async countMessagesFilterByMonthAndClientId(daterange, clientId) {
    const query = `
      SELECT 
      m.sendStatus, 
      COUNT(m.sendStatus) AS quantity
      FROM messages m
      INNER JOIN campaings c ON m.campaingId = c.id
      INNER JOIN users u ON c.userId = u.id
      WHERE m.status = 1
      AND m.sendDatetime >= ?
      AND m.sendDatetime < ?
      AND u.clientId = ?
      GROUP BY m.sendStatus;
    `;
    const sqlParams = [];

    sqlParams.push(daterange.start);
    sqlParams.push(daterange.end);
    sqlParams.push(clientId);

    const result = await this.db.query(query, sqlParams);

    await this.db.end();

    return result;
  }
}

module.exports = MessageRepository;
