import React, { useState } from "react";

export default function Transactions({
  books,
  setBooks,
  transactions,
  setTransactions,
}) {
  const [selectedBookIndex, setSelectedBookIndex] = useState("");
  const [txQuantity, setTxQuantity] = useState("");

  const handleAddStock = () => {
    if (selectedBookIndex === "" || txQuantity === "") {
      alert("Please select a book and enter quantity.");
      return;
    }
    const qty = Number(txQuantity);
    if (qty <= 0) {
      alert("Quantity must be greater than zero.");
      return;
    }

    const idx = Number(selectedBookIndex);
    const updatedBooks = [...books];
    updatedBooks[idx].quantity += qty;
    setBooks(updatedBooks);

    const newTx = {
      book: updatedBooks[idx].title,
      type: "Stock Added",
      quantity: qty,
      date: new Date().toLocaleString(),
    };
    setTransactions((prev) => [...prev, newTx]);
    setTxQuantity("");
    alert("Stock added successfully.");
  };

  const handleDeductStock = () => {
    if (selectedBookIndex === "" || txQuantity === "") {
      alert("Please select a book and enter quantity.");
      return;
    }
    const qty = Number(txQuantity);
    if (qty <= 0) {
      alert("Quantity must be greater than zero.");
      return;
    }

    const idx = Number(selectedBookIndex);
    if (books[idx].quantity < qty) {
      alert("Not enough books in stock.");
      return;
    }

    const updatedBooks = [...books];
    updatedBooks[idx].quantity -= qty;
    setBooks(updatedBooks);

    const newTx = {
      book: updatedBooks[idx].title,
      type: "Book Borrowed",
      quantity: qty,
      date: new Date().toLocaleString(),
    };
    setTransactions((prev) => [...prev, newTx]);
    setTxQuantity("");
    alert("Book borrowed successfully.");
  };

  return (
    <div className="page">
      <h2>Transactions</h2>
      <div className="form-group">
        <select
          value={selectedBookIndex}
          onChange={(e) => setSelectedBookIndex(e.target.value)}
        >
          <option value="">Select Book</option>
          {books.map((book, index) => (
            <option key={index} value={index}>
              {book.title} - Qty: {book.quantity}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Quantity"
          value={txQuantity}
          onChange={(e) => setTxQuantity(e.target.value)}
        />
        <button onClick={handleAddStock}>Add Stock</button>
        <button onClick={handleDeductStock}>Borrow Book</button>
      </div>

      <h3>Transaction History</h3>
      <table>
        <thead>
          <tr>
            <th>Book Title</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, index) => (
            <tr key={index}>
              <td>{tx.book}</td>
              <td>{tx.type}</td>
              <td>{tx.quantity}</td>
              <td>{tx.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}