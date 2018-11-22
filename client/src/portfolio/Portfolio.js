import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import {
  deleteTrade,
  setEditingState,
  setProducts,
  setSelectedTrade,
  updateProducts
} from "../redux/Actions";

const styles = theme => ({
  root: {},
  button: {
    margin: theme.spacing.unit
  }
});

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.sendNewTrade = this.sendNewTrade.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Trade ID</TableCell>
              <TableCell>Trade Date</TableCell>
              <TableCell>Commodity</TableCell>
              <TableCell>Side</TableCell>
              <TableCell numeric>Qty (MT)</TableCell>
              <TableCell numeric>Price (/MT)</TableCell>
              <TableCell>Counterparty</TableCell>
              <TableCell>Location</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.products.map((row, index) => {
              return (
                <TableRow
                  key={row.id}
                  onClick={() =>
                    this.props.setSelectedTrade(this.props.products[index])
                  }
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell>
                    {moment(row.tradeDate).format("DD-MMM-YYYY")}
                  </TableCell>
                  <TableCell> {row.commodity} </TableCell>
                  <TableCell> {row.side} </TableCell>
                  <TableCell numeric>{row.quantity}</TableCell>
                  <TableCell numeric>{row.price}</TableCell>
                  <TableCell>{row.counterparty}</TableCell>
                  <TableCell>{row.location}</TableCell>
                  <TableCell>
                    <Button
                      variant="fab"
                      mini
                      color="secondary"
                      aria-label="Edit"
                      onClick={this.handleEdit}
                      className={classes.button}
                    >
                      <EditIcon />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="fab"
                      mini
                      color="primary"
                      onClick={this.handleDelete}
                      aria-label="Delete"
                      className={classes.button}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Tooltip title="Add">
          <Button
            variant="fab"
            color="primary"
            aria-label="Add"
            onClick={this.sendNewTrade}
          >
            <AddIcon />
          </Button>
        </Tooltip>
      </div>
    );
  }

  handleEdit() {
    this.props.setEditing(true);
  }

  handleDelete() {
    var localHost = "http://localhost:8000/trades/";
    var tradeId = this.props.trade.id;
    var url = localHost + tradeId;
    var method = "DELETE";
    return fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(this.props.publishDeletedTrade(this.props.trade))
      .catch(err => err);
  }

  sendNewTrade() {
    this.props.setSelectedTrade({});
    this.props.setEditing(true);
  }

  componentDidMount() {
    fetch("http://localhost:8000/trades")
      .then(res => res.json())
      .then(
        result => {
          this.props.setFetchedProducts(result);
          this.props.setSelectedTrade(result[0]);
        },
        error => {}
      );
  }
}

const mapStateToProps = state => {
  return { products: state.products, trade: state.selectedTrade };
};

const mapDisptachToProps = dispatch => {
  return {
    setSelectedTrade: value => {
      dispatch(setSelectedTrade(value));
    },
    setFetchedProducts: products => {
      dispatch(setProducts(products));
    },
    setEditing: isEditing => {
      dispatch(setEditingState(isEditing));
    },
    publishEditedTrade: editedTrade => {
      dispatch(updateProducts(editedTrade));
    },
    publishDeletedTrade: deletedTrade => {
      dispatch(deleteTrade(deletedTrade));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDisptachToProps
)(withStyles(styles)(Portfolio));
