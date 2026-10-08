import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import BookManagement from "./pages/BookManagement";
import Transactions from "./pages/Transactions";
import UserManagement from "./pages/UserManagement";
import Login from "./pages/Login";
import {
  loadBooks,
  saveBooks,
  loadUsers,
  saveUsers,
  loadTransactions,
  saveTransactions,
} from "./utils/localStorage";
import "./App.css";

export default function App() {
  // Initial state loaded using utility functions
  const [books, setBooks] = useState(() => loadBooks());
  const [users, setUsers] = useState(() => loadUsers());
  const [transactions, setTransactions] = useState(() => loadTransactions());
  const [activeSection, setActiveSection] = useState("dashboard");

  // Sync states to LocalStorage automatically whenever changed
  useEffect(() => {
    saveBooks(books);
  }, [books]);

  useEffect(() => {
    saveUsers(users);
  }, [users]);

  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  return (
    <div>
      <header>
        <h1>Library Management System</h1>
        <p>Manage inventory, users, and transactions</p>
      </header>

      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main>
        {activeSection === "dashboard" && (
          <Dashboard books={books} users={users} />
        )}
        {activeSection === "books" && (
          <BookManagement books={books} setBooks={setBooks} />
        )}
        {activeSection === "transactions" && (
          <Transactions
            books={books}
            setBooks={setBooks}
            transactions={transactions}
            setTransactions={setTransactions}
          />
        )}
        {activeSection === "users" && (
          <UserManagement users={users} setUsers={setUsers} />
        )}
        {activeSection === "login" && <Login users={users} />}
      </main>

      <footer>
        <p>&copy; Library Management System</p>
      </footer>
    </div>
  );
}