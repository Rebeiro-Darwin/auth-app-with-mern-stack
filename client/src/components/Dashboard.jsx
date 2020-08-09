import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import PropTypes from "prop-types";
/** material-ui dependencies */
import Alert from "@material-ui/lab/Alert";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CircularProgress from "@material-ui/core/CircularProgress";
import Collapse from "@material-ui/core/Collapse";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";
/** material-ui dependencies */
import "../App.css";
import Books from "./Books";
import Navbar from "./Navbar";
import { getBooks } from "../actions/actions";
import Table from "./Table";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    marginLeft: theme.spacing(2),
  },
  list: {
    marginLeft: theme.spacing(2),
  },
}));

const Dashboard = (props) => {
  // Passing second argument as an empty array will make useEffect behave exactly like the componentDidMount.
  useEffect(() => {
    props.getBooks();
  }, []);
  const classes = useStyles();
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [bookView, setBookView] = useState(true);
  const [issuedStatus, setIssuedStatus] = useState(null);
  const [category, setCategory] = useState(null);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDropdownClick = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const toggleBookView = (boolVal, category, issuedStatus) => {
    setBookView(boolVal);
    if (category) {
      setCategory(category);
    }
    if (issuedStatus) {
      setIssuedStatus(issuedStatus);
    }
  };
  const categories = [
    "Novels",
    "Marketing",
    "Wase/Wims",
    "Business Analysis",
    "Management",
    "Magazine",
  ];
  const issuedStatuses = ["ISSUED", "RETURNED", "NOT RETURNED"];
  const { isLoading, isFailed, books } = props.data;
  let content;

  if (isLoading) {
    content = (
      <div className="loader">
        <CircularProgress />
      </div>
    );
  } else if (isFailed) {
    content = (
      <Alert variant="outlined" severity="error">
        Error retrieving the data— please try again after some time!
      </Alert>
    );
  } else {
    content = (
      <div className={classes.root}>
        <CssBaseline />
        <Navbar drawerOpen={drawerOpen} handleDrawerOpen={handleDrawerOpen} />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={drawerOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button onClick={handleDropdownClick}>
              <ListItemText primary="BOOKS" />
              {dropdownOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Divider />
            <Collapse
              in={dropdownOpen}
              timeout="auto"
              unmountOnExit
              className={classes.list}
            >
              <List component="div" disablePadding>
                {categories.map((category) => (
                  <ListItem button divider>
                    <ListItemText
                      primary={category}
                      onClick={() => toggleBookView(true, category, null)}
                    />
                  </ListItem>
                ))}
                <Divider />
              </List>
            </Collapse>
            {issuedStatuses.map((issuedStatus) => (
              <ListItem button key={issuedStatus} divider>
                <ListItemText
                  primary={issuedStatus}
                  onClick={() => toggleBookView(false, null, issuedStatus)}
                />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: drawerOpen,
          })}
        >
          <div className={classes.drawerHeader} />
          <Container maxWidth="lg" className={classes.container}>
            {bookView ? (
              <Books books={books} category={category} />
            ) : (
              <Table books={books} issuedStatus={issuedStatus} />
            )}
          </Container>
        </main>
      </div>
    );
  }
  return content;
};

Dashboard.propTypes = {
  handleIssuedStatus: PropTypes.func,
};

const mapStateToProps = (state) => ({
  data: state.books,
});

const mapDispatchToProps = (dispatch) => ({
  getBooks: () => {
    dispatch(getBooks());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
