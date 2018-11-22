import { css, StyleSheet } from "aphrodite";
import React from "react";
import moment from "moment";

const s = StyleSheet.create({
  detailsHeader: {
    fontWeight: "bold"
  }
});

export default class ViewTrade extends React.Component {
  render() {
    return (
      <div>
        {this.props.trade && 
          <div>
            <span className={css(s.detailsHeader)}>Commodity: </span>
            <span>{this.props.trade.commodity} </span>
          </div>
        }
        {this.props.trade && 
        <div>
          <span className={css(s.detailsHeader)}>Trade Date: </span>
          <span>
            {moment(this.props.trade.tradeDate).format("DD-MMM-YYYY")}{" "}
          </span>
        </div>
        }
        {this.props.trade && 
        <div>
          <span className={css(s.detailsHeader)}>Side: </span>
          <span>{this.props.trade.side} </span>
        </div>
        }
        {this.props.trade && 
        <div>
          <span className={css(s.detailsHeader)}>Counterparty: </span>
          <span>{this.props.trade.counterparty} </span>
        </div>
        }
        {this.props.trade && 
        <div>
          <span className={css(s.detailsHeader)}>Price: </span>
          <span>${this.props.trade.price} USD </span>
        </div>
        }
        {this.props.trade && 
        <div>
          <span className={css(s.detailsHeader)}>Quantity: </span>
          <span>{this.props.trade.quantiy} MT </span>
        </div>
        }
        {this.props.trade && 
        <div>
          <span className={css(s.detailsHeader)}>Location: </span>
          <span>{this.props.trade.location}</span>
        </div>
        }
      </div>
    );
  }
}
