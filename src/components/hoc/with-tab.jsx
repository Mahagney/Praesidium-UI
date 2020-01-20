import React, { useState } from 'react';

function withTab(WrappedComponent) {
  return class HOC extends React.Component {
    state = {
      tabValue: 0
    };

    handleTabChange = (event, newValue) => {
      this.setState({ tabValue: newValue });
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          tabValue={this.state.tabValue}
          handleTabChange={this.handleTabChange}
        />
      );
    }
  };
}

export default withTab;
