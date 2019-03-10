import React, { Component } from "react";

class BookRow extends Component {
  render() {
    const book = this.props.book;
    let authors = book.authors.map(author => {
      return <div key={author.id}>{author.name}</div>;
    });
    return (
      <tr>
        <td>{book.title}</td>
        <td>{authors}</td>
        <td>
          <button className="btn" style={{ backgroundColor: book.color }} />
        </td>
      </tr>
    );
  }
}

export default BookRow;
