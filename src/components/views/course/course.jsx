//#region 'NPM DEP'
import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
//#endregion

//#region 'LOCAL DEP'
import useStylesCourse from './course-style';
import CenteredTabs from '../../common/tab/tab';
//#endregion

function Course({ course }) {
  const classes = useStylesCourse();
  return (
    <Container component='div' maxWidth='lg' className={classes.bigContainer}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography variant='h6'>
              {course.NAME ? course.NAME : ''}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <CenteredTabs />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

Course.propTypes = {
  course: PropTypes.object.isRequired
};

/*
<Typography variant='h4' className={classes.title}>
        {course.NAME ? course.NAME : ''}
      </Typography>
      <CenteredTabs /> 
*/

export default Course;
