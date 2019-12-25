import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
  root: {
    minHeight: '22px'
  },
  scroller: {
    height: '31px'
  },
  flexContainer: {
    marginTop: '-8px'
  }
});

export default function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs
      className={classes.root}
      classes={{
        scroller: classes.scroller,
        flexContainer: classes.flexContainer
      }}
      value={value}
      onChange={handleChange}
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
