
export const NUMBER_ELEMENTS_PER_PAGE = Number.parseInt(process.env.REACT_APP_TABLE_NUMBER_ELEMENTS_PER_PAGE || '') || 15;
export const SESSION_STORAGE_KEY = process.env.REACT_APP_SESSION_STORAGE_KEY || 'token';
export const API_URL = process.env.REACT_APP_API_URL || '';
export const COMMIT_ID = process.env.REACT_APP_COMMIT_ID || 'n/a';
export const RUN_ID = process.env.REACT_APP_RUN_ID || 'n/a';
export const BRANCH = process.env.REACT_APP_HEAD_REF || '';
