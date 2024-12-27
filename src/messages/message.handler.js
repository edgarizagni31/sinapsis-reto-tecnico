const MessageService = require('./message.service');

const sendStatuses = ["PENDIENTE", "ENVIADO", "ERROR"];
const service = new MessageService();

exports.countMessages = async (event) => {
  const { month, client_id: clientId } = event.queryStringParameters || {};

  if (!month) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "mes es requerido."
      })
    }
  }

  const result = await service.countMessages(month, clientId);

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: result.map(r => ({cantidad: r.quantity, estado: sendStatuses[r.sendStatus - 1]})),
    }),
  };
}
