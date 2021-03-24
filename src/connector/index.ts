import BackendConnector from '../connector/implementation';

const process = { env: { ENV: '' } };

const BASE_URL =
  process.env.ENV === 'development'
    ? 'http://localhost:8000/api/v1'
    : '/api/v1';

export const connector = new BackendConnector(BASE_URL);
