import Button from "@material-ui/core/Button";
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
import {
  setCommodities,
  setCounterparties,
  setLocations,
  setProducts
} from "./../redux/Actions";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    paddingTop: "50px",
  },
  formControl: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    minWidth: 200
  },
  button: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

const initialState = {
  startDate: new Date(),
  endDate: new Date(),
  commodities: [],
  counterparties: [],
  locations: []
};

class FilterTrades extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      criteria: initialState
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  render() {
    const { classes } = this.props;
    return (
      <form className={classes.root}>
        <TextField
          className={classes.formControl}
          id="startDate"
          label="Start Date"
          type="date"
          value={moment(this.state.criteria.startDate).format("YYYY-MM-DD")}
          onChange={this.handleChange("startDate")}
        />
        <TextField
          className={classes.formControl}
          id="endDate"
          label="End Date"
          type="date"
          value={moment(this.state.criteria.endDate).format("YYYY-MM-DD")}
          onChange={this.handleChange("endDate")}
        />
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="commodities">Commodity</InputLabel>
          <Select
            multiple
            value={this.state.criteria.commodities}
            onChange={this.handleChange("commodities")}
            input={<Input id="commodities" />}
          >
            {this.props.commodities.map(element => (
              <MenuItem key={element.identifier} value={element.identifier}>
                {element.identifier}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel component="legend">Side</FormLabel>
          <RadioGroup
            aria-label="side"
            name="Side"
            value={this.state.criteria.side}
            onChange={this.handleChange("side")}
          >
            <FormControlLabel value="Buy" control={<Radio />} label="Buy" />
            <FormControlLabel value="Sell" control={<Radio />} label="Sell" />
          </RadioGroup>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="counterparties">Counterparties</InputLabel>
          <Select
            multiple
            value={this.state.criteria.counterparties}
            onChange={this.handleChange("counterparties")}
            input={<Input id="counterparties" />}
          >
            {this.props.counterparties.map(element => (
              <MenuItem key={element.identifier} value={element.identifier}>
                {element.identifier}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="locations">Location</InputLabel>
          <Select
            multiple
            value={this.state.criteria.locations}
            onChange={this.handleChange("locations")}
            input={<Input id="locations" />}
          >
            {this.props.locations.map(element => (
              <MenuItem key={element.identifier} value={element.identifier}>
                {element.identifier}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div>
          <Button
            className={classes.button}
            variant="contained"
            size="small"
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            size="small"
            onClick={this.handleCancel}
          >
            Clear
          </Button>
        </div>
      </form>
    );
  }

  componentDidMount() {
    fetch("http://localhost:8000/commodities")
      .then(res => res.json())
      .then(
        res => {
          return this.props.publishCommodities(res);
        },
        error => {}
      );

    fetch("http://localhost:8000/counterparties")
      .then(res => res.json())
      .then(
        result => {
          return this.props.publishCounterparties(result);
        },
        error => {}
      );

    fetch("http://localhost:8000/locations")
      .then(res => res.json())
      .then(
        result => {
          return this.props.publishLocations(result);
        },
        error => {}
      );
  }

  handleChange = fieldName => event => {
    let searchCriteria = Object.assign({}, this.state.criteria, {
      [fieldName]: event.target.value
    });
    this.setState({ criteria: searchCriteria });
  };

  handleSubmit() {
    var url = "http://localhost:8000/trades/filter";
    console.log(JSON.stringify(this.state.criteria));
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(this.state.criteria),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        return this.props.publishProducts(res);
      })
      .catch(err => err);
  }

  handleCancel() {
    this.setState({ criteria: initialState });
  }
}

const mapStateToProps = state => {
  return {
    commodities: state.commodities,
    counterparties: state.counterparties,
    locations: state.locations
  };
};

const mapDisptachToProps = dispatch => {
  return {
    publishProducts: products => {
      dispatch(setProducts(products));
    },
    publishCommodities: refData => {
      dispatch(setCommodities(refData));
    },
    publishCounterparties: refData => {
      dispatch(setCounterparties(refData));
    },
    publishLocations: refData => {
      dispatch(setLocations(refData));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDisptachToProps
)(withStyles(styles)(FilterTrades));
