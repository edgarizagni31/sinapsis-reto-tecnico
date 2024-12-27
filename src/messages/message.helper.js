class MessageHelper {
  static getMontStartAndEnd(year, month) {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0);

    return { start, end };
  }
}

module.exports = MessageHelper;
