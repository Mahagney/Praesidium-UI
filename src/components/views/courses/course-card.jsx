import React from 'react';

//#region 'NPM DEP'
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
//#endregion

//#region 'LOCAL DEP'
import useStylesCourseCard from './course-card-style';
//#endregion

const CourseCard = ({ name, description, onCardClick }) => {
  const classes = useStylesCourseCard();

  return (
    <Card classes={{ root: classes.card }}>
      <CardActionArea onClick={onCardClick}>
        <CardMedia
          component='img'
          className={classes.media}
          image='/static/images/cards/contemplative-reptile.jpg'
          title='Contemplative Reptile'
          height='400'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {name}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

CourseCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onCardClick: PropTypes.func.isRequired
};

CourseCard.defaultProps = {
  description: 'dummy description'
};

export default CourseCard;
