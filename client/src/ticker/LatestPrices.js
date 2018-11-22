import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { subscribeLatestPrices } from "./Api";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    background: "black"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    minWidth: 200,
    color: "yellow"
  }
});
class LatestPrices extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lastPrices: [] };
    subscribeLatestPrices(lastPrices => {
      this.setState({ lastPrices });
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.state.lastPrices.map(element => {
          return (
            <span className={classes.textField} key={element.name}>
              <div>{element.name}</div>
              <div>${element.price}</div>
            </span>
          );
        })}
      </div>
    );
  }
}

export default withStyles(styles)(LatestPrices);
