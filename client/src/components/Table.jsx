import React from "react";
/** material-ui dependencies */
import Alert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles, makeStyles } from "@material-ui/core/styles";
/** material-ui dependencies */

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const renderTableHead = (data) => {
  return <StyledTableCell>{data}</StyledTableCell>;
};

const rederTableBody = (book) => {
  const row = Object.keys(book)
    .filter((obj) => obj !== "photo")
    .map((key) => <StyledTableCell>{book[key]}</StyledTableCell>);
  return row;
};

const CustomizedTables = (props) => {
  const classes = useStyles();
  const { books } = props;
  const tableHeadRows = [
    "Author",
    "Edition",
    "Publication",
    "Category",
    "User name",
    "Issued Status",
  ];
  const filteredBooks = books.filter(
    (book) => book.issuedStatus === props.issuedStatus
  );
  let content;
  if (!books.length) {
    content = (
      <Alert variant="outlined" severity="error">
        No books!
      </Alert>
    );
  } else if (!filteredBooks.length) {
    content = (
      <Alert variant="outlined" severity="error">
        No data found!
      </Alert>
    );
  } else {
    content = (
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          aria-label="books table for issued status"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Book Name</StyledTableCell>
              {tableHeadRows.map((data) => renderTableHead(data))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBooks.map((book) => (
              <StyledTableRow key={book.bookName}>
                {rederTableBody(book)}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  return content;
};

export default CustomizedTables;
