const CampaignRepository = require("../campaign.repository");

jest.mock("../../config/database", () => {
  return jest.fn().mockImplementation(() => ({
    query: jest.fn(),
    end: jest.fn(),
  }));
});

describe("campaign repository", () => {
  let repository;
  let mockDb;

  beforeEach(() => {
    jest.clearAllMocks();
    repository = new CampaignRepository();
    mockDb = repository.db;
  });

  describe("create", () => {
    const mockData = {
      clientId: 1,
      name: "Campaña de testing",
      programingDate: "2024-12-26",
      messages: [
        { message: "msg 1", sendDatetime: "2024-12-26 10:00:00" },
        { message: "msg 2", sendDatetime: "2024-12-26 11:00:00" },
      ],
    };

    it("should create a campaign successfully", async () => {
      mockDb.query
        .mockResolvedValueOnce(true)
        .mockResolvedValueOnce([{ id: 1 }])
        .mockResolvedValueOnce({ insertId: 123 })
        .mockResolvedValueOnce(true)
        .mockResolvedValueOnce(true);

      const result = await repository.create(mockData);
      const placeholders = mockData.messages.map(() => "(?, ?, ?)").join(", ");
      const values = mockData.messages.flatMap((msg) => [
        msg.message,
        123,
        msg.sendDatetime,
      ]);
      expect(mockDb.query).toHaveBeenCalledWith("START TRANSACTION");
      expect(mockDb.query).toHaveBeenCalledWith(
        "SELECT id FROM users WHERE clientId = ?",
        [mockData.clientId]
      );
      expect(mockDb.query).toHaveBeenCalledWith(
        "INSERT INTO campaings (name, programingDate, userId) VALUES (?, ?, ?);",
        [mockData.name, mockData.programingDate, 1]
      );
      expect(mockDb.query).toHaveBeenCalledWith(
        `INSERT INTO messages (message, campaingId, sendDatetime) VALUES ${placeholders}`,
        values
      );

      expect(result).toEqual({
        id: 123,
        status: 1,
        ...mockData,
      });
    });

    it('should rollback transaction on error', async () => {
      const error = new Error('db error');

      mockDb.query
        .mockResolvedValueOnce([{ id: 1 }]) 
        .mockRejectedValueOnce(error); 

      await expect(repository.create(mockData)).rejects.toThrow(error);
      expect(mockDb.query).toHaveBeenCalledWith('ROLLBACK');
    });
  });
});
