//#region 'NPM DEP'
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
//#endregion

//#region 'LOCAL DEP'
import useTabStyles from './tab-style';
//#endregion

function CenteredTabs({ onTabChange }) {
  const classes = useTabStyles();
  const [tabValue, setTabValue] = useState(0);

  function handleTabChange(event, newValue) {
    setTabValue(newValue);
    onTabChange(newValue);
  }

  return (
    <Tabs
      className={classes.root}
      classes={{
        scroller: classes.scroller,
        flexContainer: classes.flexContainer
      }}
      value={tabValue}
      onChange={handleTabChange}
      indicatorColor='primary'
      textColor='primary'
      centered
    >
      <Tab label='Video' className={classes.root} />
      <Tab label='Pdf' />
      <Tab label='Quiz' />
    </Tabs>
  );
}

CenteredTabs.propTypes = {
  onTabChange: PropTypes.func.isRequired
};

export default CenteredTabs;
