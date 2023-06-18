jest.mock('../../routes/middleware/authentication', () =>
  jest.fn((req, res, next) => next()),
);

const request = require('supertest');
const app = require('../../app');
const SentenceDAO = require('../../dao/SentenceDao');
const middleware = require('../../routes/middleware/authentication');

describe('CRUD Operations', () => {
  let sentenceId;

  beforeEach(() => {
    jest.clearAllMocks();

    SentenceDAO.prototype.createSentence = jest
      .fn()
      .mockImplementation((text, categories) => {
        const sentenceId = '123456';
        sentenceId;
      });

    SentenceDAO.prototype.updateSentence = jest
      .fn()
      .mockImplementation((id, text, categories) => {
        if (id === sentenceId) {
          return true;
        }
        return false;
      });

    SentenceDAO.prototype.deleteSentence = jest.fn().mockImplementation(id => {
      if (id === sentenceId) {
        return true;
      }
      return false;
    });

    SentenceDAO.prototype.getSentenceById = jest.fn().mockImplementation(id => {
      if (id === sentenceId) {
        return {
          id,
          text: 'Updated sentence',
          categories: {},
        };
      }
      return null;
    });

    SentenceDAO.prototype.getAllSentences = jest.fn().mockImplementation(() => {
      return [
        { id: '1', text: 'Sentence 1', categories: {} },
        { id: '2', text: 'Sentence 2', categories: {} },
      ];
    });
  });

  describe('GET /sentences', () => {
    it('should retrieve all sentences', async () => {
      const response = await request(app).get('/api/sentences');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(middleware).toHaveBeenCalledTimes(0);
    });
  });

  describe('POST /sentences', () => {
    it('should create a new sentence', async () => {
      const sentence = { text: 'New sentence', categories: { none: 1 } };
      const response = await request(app).post('/api/sentences').send(sentence);
      expect(response.status).toBe(201);
      expect(SentenceDAO.prototype.createSentence).toHaveBeenCalledWith(
        'New sentence',
        { none: 1 },
      );
      expect(middleware).toHaveBeenCalledTimes(1);
    });
  });

  describe('PUT /sentences/:id', () => {
    it('should update an existing sentence', async () => {
      sentenceId = '1';
      const updatedSentence = {
        text: 'Updated sentence',
        categories: { soft: 1 },
      };
      const response = await request(app)
        .put(`/api/sentences/${sentenceId}`)
        .send(updatedSentence);
      expect(response.status).toBe(200);
      expect(SentenceDAO.prototype.updateSentence).toHaveBeenCalledWith({
        categories: { soft: 1 },
        id: sentenceId,
        text: 'Updated sentence',
      });
      expect(middleware).toHaveBeenCalledTimes(1);
    });

    it('should return 404 if sentence id does not exist', async () => {
      sentenceId = 1;
      const updatedSentence = { text: 'Updated sentence', categories: {} };
      const response = await request(app)
        .put(`/api/sentences/9a87sd9`)
        .send(updatedSentence);
      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /sentences/:id', () => {
    it('should delete an existing sentence', async () => {
      sentenceId = '123456';
      const response = await request(app).delete(
        `/api/sentences/${sentenceId}`,
      );
      expect(response.status).toBe(200);
      expect(SentenceDAO.prototype.deleteSentence).toHaveBeenCalledWith(
        sentenceId,
      );
      expect(middleware).toHaveBeenCalledTimes(1);
    });

    it('should return 404 if sentence id does not exist', async () => {
      sentenceId = 1;
      const response = await request(app).delete(
        `/api/sentences/non-123`,
      );
      expect(response.status).toBe(404);
    });
  });

  describe('GET /sentences/:id', () => {
    it('should retrieve an existing sentence', async () => {
      sentenceId = '123456';
      const response = await request(app).get(`/api/sentences/${sentenceId}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: sentenceId,
        text: 'Updated sentence',
        categories: {},
      });
      expect(SentenceDAO.prototype.getSentenceById).toHaveBeenCalledWith(
        sentenceId,
      );
    });

    it('should return 404 if sentence id does not exist', async () => {
      sentenceId = 1;
      const response = await request(app).get(`/api/sentences/5425eee`);
      expect(response.status).toBe(404);
    });
  });
});
