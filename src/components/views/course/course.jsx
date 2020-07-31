//#region 'NPM DEP'
import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
//#endregion

//#region 'LOCAL DEP'
import Fab from '@material-ui/core/Fab';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';
import { CenteredTabs } from '../../common/tab';
import useStylesCourse from './course-style';
//#endregion

function Course({
  redirectToAssignCourse,
  courseName,
  section,
  onTabChange,
  tabValue,
  showQuiz,
  showVideo,
  showAdminButtons,
  deleteCourse,
}) {
  const classes = useStylesCourse();

  return (
    <Container component="div" className={classes.bigContainer}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6}>
          <Paper className={classes.paper}>
            <Typography variant="h6">{courseName || ''}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Paper className={classes.paper}>
            <CenteredTabs onTabChange={onTabChange} showQuiz={showQuiz} showVideo={showVideo} tabValue={tabValue} />
          </Paper>
        </Grid>
      </Grid>
      {section}
      {/* SHOW the configure & delete buttons for this course if user is ADMIN */}
      {showAdminButtons && (
        <>
          <Fab color="primary" aria-label="Assign" onClick={redirectToAssignCourse} className={classes.fab}>
            <SettingsIcon />
          </Fab>
          <Fab
            //color='secondary'
            aria-label="Delete"
            onClick={deleteCourse}
            className={classes.fabDelete}
          >
            <DeleteIcon />
          </Fab>
        </>
      )}
    </Container>
  );
}

Course.propTypes = {
  courseName: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  tabValue: PropTypes.number.isRequired,
  showQuiz: PropTypes.bool.isRequired,
  showVideo: PropTypes.bool.isRequired,
  section: PropTypes.object.isRequired,
  redirectToAssignCourse: PropTypes.func.isRequired,
  showAdminButtons: PropTypes.bool.isRequired,
  deleteCourse: PropTypes.func.isRequired,
};

export default Course;
