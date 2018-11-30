import React from "react";
import { connect } from "react-redux";
import EditTrade from "./..//trade/EditTrade";
import { setEditingState } from "./../redux/Actions";

class Trade extends React.Component {
  constructor(props) {
    super(props);
    this.enableEdit = this.enableEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }
  render() {
    return (
      <div>
        {this.props.isEditing && <EditTrade cancel={this.cancelEdit} />}
      </div>
    );
  }

  enableEdit() {
    this.props.setEditing(true);
  }

  cancelEdit() {
    this.props.setEditing(false);
  }
}

const mapStateToProps = state => {
  return {
    trade: state.selectedTrade,
    isEditing: state.isEditing
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setEditing: isEditing => {
      dispatch(setEditingState(isEditing));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trade);
