const CampaignService = require("./campaign.service");

const campaignService = new CampaignService();

exports.campaingCreate = async (event) => {
  const campaign = JSON.parse(event.body);
  const result = await campaignService.createCampaign(campaign);

  return {
    statusCode: result.code,
    body: JSON.stringify({
      data: result.data,
    }),
  };
};
