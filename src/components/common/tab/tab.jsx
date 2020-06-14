//#region 'NPM DEP'
import React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
//#endregion

//#region 'LOCAL DEP'
import useTabStyles from './tab-style'
//#endregion

function CenteredTabs({ onTabChange, tabValue, showQuiz, showVideo }) {
  const classes = useTabStyles()
  function handleTabChange(event, newValue) {
    onTabChange(newValue)
  }

  return (
    <Tabs
      className={classes.root}
      classes={{
        scroller: classes.scroller,
        flexContainer: classes.flexContainer,
      }}
      value={tabValue}
      onChange={handleTabChange}
      indicatorColor='primary'
      centered
    >
      <Tab label='Video' className={classes.root} disabled={!showVideo} />
      <Tab label='Pdf' />
      <Tab label='Quiz' disabled={!showQuiz} />
    </Tabs>
  )
}

CenteredTabs.propTypes = {
  onTabChange: PropTypes.func.isRequired,
  tabValue: PropTypes.number.isRequired,
  showQuiz: PropTypes.bool.isRequired,
  showVideo: PropTypes.bool.isRequired,
}

const tabIndex = Object.freeze({
  VIDEO: 0,
  PDF: 1,
  QUIZ: 2,
})

export { CenteredTabs, tabIndex }
