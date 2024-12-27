const CampaignRepository = require("./campaign.repository");
const CampaignValidator = require("./campaign.validator");

class CampaignService {
  constructor() {
    this.repository = new CampaignRepository();
    this.validator = new CampaignValidator();
  }

  async createCampaign(campaign) {
    this.validator.validate(campaign);

    if (!this.validator.isValid()) {
      return { code: 400, data: this.validator.errors };
    }

    try {
      const created = await this.repository.create(campaign);

      return { code: 201, data: created };
    } catch (error) {
      return { code: 500, data: error.message };
    }
  }
}

module.exports = CampaignService;
