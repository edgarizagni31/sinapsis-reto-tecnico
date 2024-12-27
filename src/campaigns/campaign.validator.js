class CampaignValidator {
  constructor() {
    this.errors = [];
  }

  validate(campaign) {
    this.errors = []
    this.campaign = campaign;

    this.exists("clientId");
    this.exists("name");
    this.exists("programingDate");
    this.isArray("messages");
    this.isEmpty("messages");
    this.schemaMessages();
  }

  isValid() {
    return this.errors.length == 0;
  }

  exists(fieldname) {
    if (!this.campaign[fieldname]) {
      this.errors.push(`${fieldname} es requerido.`);
    }
  }


  isArray(fieldname) {
    if (!Array.isArray(this.campaign[fieldname])) {
      this.errors.push(`${fieldname} debe ser un arreglo.`);
    }
  }

  isEmpty(fieldname) {
    if (!this.campaign[fieldname]?.length) {
      this.errors.push(`${fieldname} no puedo estar vacio.`);
    }
  }

  schemaMessages() {
    if (!Array.isArray(this.campaign["messages"])) return; 

    this.campaign.messages.forEach((message, index) => {
      if (!message.message) {
       this.errors.push(`message en la posición ${index} es requerida`);
      }
      
      if (!message.sendDatetime) {
        errors.push(`sendDatetime en la posición ${index} es requerida`);
      } else if (isNaN(Date.parse(message.sendDatetime))) {
        errors.push(`sendDatetime en la posición ${index} no es una fecha valida.`);
      }
    });
  }
}

module.exports = CampaignValidator;
