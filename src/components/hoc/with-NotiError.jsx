//#region 'NPM DEP'
import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//#region

//#region 'LOCAL DEP'
import { apiClearError } from '../../redux/actions/api-action';
//#endregion

const mapStateToProps = (state) => {
  return {
    apiError: state.api.apiError,
  };
};
const mapDispatchToProps = {
  apiClearError,
};
export default (WrappedComponent) => {
  const withNotiError = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    //the error notifiaction is considered a side effect so
    //that's why I use the useEffect to display the snackbar each time the apiError's value is changing
    useEffect(() => {
      if (props.apiError !== '') {
        enqueueSnackbar(props.apiError, {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        });
        props.apiClearError();
      }
    }, [props.apiError]);
    return <WrappedComponent {...props} />;
  };

  withNotiError.propTypes = {
    apiError: PropTypes.string.isRequired,
    apiClearError: PropTypes.func.isRequired,
  };

  return connect(mapStateToProps, mapDispatchToProps)(withNotiError);
};
