import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import { updateProducts } from "../redux/Actions";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class EditTrade extends React.Component {
  constructor(props) {
    super(props);
    if (props.trade.id) {
      this.state = { trade: props.trade, open: false };
    } else {
      this.state = { trade: { id: 0, tradeDate: new Date() }, open: false };
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  render() {
    const { classes } = this.props;
    return (
      <Dialog
        className={classes.root}
        open={this.props.isEditing}
        onClose={this.handleCancel}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Trade ID: {this.state.trade.id}
        </DialogTitle>
        <DialogContent>
          <form>
            <div>
              <TextField
                className={classes.textField}
                id="tradeDate"
                label="Trade Date"
                type="date"
                value={moment(this.state.trade.tradeDate).format("YYYY-MM-DD")}
                onChange={this.handleChange("tradeDate")}
              />
            </div>
            <br />
            <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor="commodity">
                Commodity
              </InputLabel>
              <Select
                value={this.state.trade.commodity}
                onChange={this.handleChange("commodity")}
                input={<Input id="commodity" />}
              >
                {this.props.commodities.map(element => (
                  <MenuItem key={element.identifier} value={element.identifier}>
                    {element.identifier}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
            <br />
            <FormControl className={classes.formControl} component="fieldset">
              <FormLabel component="legend">Side</FormLabel>
              <RadioGroup
                aria-label="side"
                name="Side"
                value={this.state.trade.side}
                onChange={this.handleChange("side")}
              >
                <FormControlLabel value="Buy" control={<Radio />} label="Buy" />
                <FormControlLabel
                  value="Sell"
                  control={<Radio />}
                  label="Sell"
                />
              </RadioGroup>
            </FormControl>
            <br />
            <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor="counterparty">
                Counterparty
              </InputLabel>
              <Select
                value={this.state.trade.counterparty}
                onChange={this.handleChange("counterparty")}
                input={<Input id="counterparty" />}
              >
                {this.props.counterparties.map(element => (
                  <MenuItem key={element.identifier} value={element.identifier}>
                    {element.identifier}
                  </MenuItem>
                ))}
              </Select>
              <br />
            </FormControl>
            <div>
              <TextField
                className={classes.textField}
                id="price"
                label="Price"
                value={this.state.trade.price}
                type="number"
                onChange={this.handleChange("price")}
              />
            </div>
            <br />
            <div>
              <TextField
                className={classes.textField}
                id="quantity"
                label="Quantity"
                value={this.state.trade.quantity}
                onChange={this.handleChange("quantity")}
              />
            </div>
            <br />
            <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor="location">
                Location
              </InputLabel>
              <Select
                value={this.state.trade.location}
                onChange={this.handleChange("location")}
                input={<Input id="location" />}
              >
                {this.props.locations.map(element => (
                  <MenuItem key={element.identifier} value={element.identifier}>
                    {element.identifier}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" size="small" onClick={this.handleSubmit}>
            Save
          </Button>
          <Button variant="contained" size="small" onClick={this.handleCancel}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  handleChange = fieldName => event => {
    const editedTrade = Object.assign({}, this.state.trade, {
      [fieldName]: event.target.value
    });
    this.setState({ trade: editedTrade });
  };

  handleSubmit() {
    var localHost = "http://localhost:8000/trades/";
    var tradeId = this.state.trade.id;
    var url = tradeId === 0 ? localHost : localHost + tradeId;
    var method = tradeId === 0 ? "POST" : "PUT";
    return fetch(url, {
      method: method,
      body: JSON.stringify(this.state.trade),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        return this.props.publishEditedTrade(res);
      })
      .catch(err => err);
  }

  handleCancel() {
    return this.props.cancel();
  }
}

const mapStateToProps = state => {
  return {
    trade: state.selectedTrade,
    commodities: state.commodities,
    counterparties: state.counterparties,
    locations: state.locations,
    isEditing: state.isEditing
  };
};

const mapDisptachToProps = dispatch => {
  return {
    publishEditedTrade: editedTrade => {
      dispatch(updateProducts(editedTrade));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDisptachToProps
)(withStyles(styles)(EditTrade));
