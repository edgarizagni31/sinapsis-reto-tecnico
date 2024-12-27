const MessageHelper = require('./message.helper');
const MessageRepository = require('./message.repository');

class MessageService {
  constructor() {
    this.repository = new MessageRepository();
  }

  async countMessages(month, clientId = null) {
    const daterange = MessageHelper.getMontStartAndEnd(2024, month);
    let result = []

    if(clientId) {
      result = await this.repository.countMessagesFilterByMonthAndClientId(daterange, clientId);
    } else {
      result = await this.repository.countMessagesFilterByMonth(daterange);
    }

    return result;
  }
}

module.exports = MessageService
