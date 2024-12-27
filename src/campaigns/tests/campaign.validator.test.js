const CampaignValidator = require("../campaign.validator");

describe("campaign validator", () => {
  let validator;
  const mockData = {
    clientId: 1,
    programingDate: "123",
    messages: [
      { message: "msg 1", sendDatetime: "2024-12-26 10:00:00" },
      { message: "msg 2", sendDatetime: "2024-12-26 11:00:00" },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    validator = new CampaignValidator();
  });

  it("name is not present", () => {
    validator.validate(mockData);

    expect(validator.errors).toContain("name es requerido.");
    expect(validator.isValid()).toBe(false);
  });
});
