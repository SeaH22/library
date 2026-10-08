// Keys for LocalStorage
const KEYS = {
  BOOKS: "books",
  USERS: "users",
  TRANSACTIONS: "transactions",
};

// Generic getter helper
export const getStoredData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error loading ${key} from localStorage`, error);
    return [];
  }
};

// Generic setter helper
export const saveStoredData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage`, error);
  }
};

// Specific helper functions
export const loadBooks = () => getStoredData(KEYS.BOOKS);
export const saveBooks = (books) => saveStoredData(KEYS.BOOKS, books);

export const loadUsers = () => getStoredData(KEYS.USERS);
export const saveUsers = (users) => saveStoredData(KEYS.USERS, users);

export const loadTransactions = () => getStoredData(KEYS.TRANSACTIONS);
export const saveTransactions = (transactions) =>
  saveStoredData(KEYS.TRANSACTIONS, transactions);