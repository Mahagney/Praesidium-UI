//#region 'NPM DEP'
import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
//#endregion

// our project
import CourseCard from './course-card';
import useStylesCoursesCards from './courses-cards-style';

const CoursesCards = ({ courses, handleCardClick }) => {
  const classes = useStylesCoursesCards();
  return (
    <div className={classes.container}>
      <Grid container spacing={4} justify='center'>
        {courses.map((course) => (
          <Grid item key={course.ID}>
            <CourseCard name={course.NAME} onCardClick={handleCardClick} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

CoursesCards.propTypes = {
  courses: PropTypes.array.isRequired,
  handleCardClick: PropTypes.func.isRequired
};

export default CoursesCards;
