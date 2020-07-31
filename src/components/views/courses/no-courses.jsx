//#region 'NPM DEP'
import React from 'react';
import Typography from '@material-ui/core/Typography';
//#endregion

//#region 'LOCAL DEP'
import book from '../../../assets/images/noCourses.png';
import { useStylesNoCourses } from './courses-style';
//#endregion

const NoCourses = () => {
  const classes = useStylesNoCourses();

  return (
    <div className={classes.noCoursesContainer}>
      <div>
        <img src={book} width="200" height="130"></img>
        <Typography variant="h2">Nu aveti cursuri asociate</Typography>
      </div>
    </div>
  );
};

export default NoCourses;
