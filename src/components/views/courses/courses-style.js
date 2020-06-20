import {
    makeStyles
} from '@material-ui/core/styles';

const useStylesCourseCard = makeStyles({
    card: {
        maxWidth: 370,
        minHeight: 300,
        minWidth: 370
    },
    media: {
        marginTop: '8px',
        height: 140
    }
})

const useStylesCoursesCards = makeStyles({
    container: {
        marginTop: 10,
        padding: 20
    },
    fab: {
        position: 'fixed',
        bottom: '40px',
        right: '40px'
    }
})

const useStylesNoCourses = makeStyles({
    noCoursesContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        '& div': {
            height: 'auto',
            margin: '0 auto',
            position: 'relative'
        }
    },
})


export {
    useStylesCourseCard,
    useStylesCoursesCards,
    useStylesNoCourses
}
