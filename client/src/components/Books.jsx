import React from "react";
/** material-ui dependencies */
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
/** material-ui dependencies */
import "../App.css";

class Books extends React.Component {
  render() {
    const { books, category } = this.props;
    const filteredBooks = books.filter((book) => book.category === category);
    const filteredBooksData = category ? filteredBooks : books;
    let content;
    if (!books.length) {
      content = (
        <Alert variant="outlined" severity="error">
          No books!
        </Alert>
      );
    } else if (!filteredBooksData.length) {
      content = (
        <Alert variant="outlined" severity="error">
          No filtered books for the selected category: {category}!
        </Alert>
      );
    } else {
      content = (
        <Grid container spacing={3}>
          {filteredBooksData.map((book) => (
            <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
              <Paper className="flex-container">
                <div>
                  <img
                    src={book.photo}
                    width="175px"
                    height="200px"
                    alt="book"
                  />
                </div>
                <div>{book.bookName}</div>
                <div>{book.author}</div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      );
    }
    return content;
  }
}

export default Books;
