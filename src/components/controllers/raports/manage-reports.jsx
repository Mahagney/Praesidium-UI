//#region 'NPM DEP'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
//#endregion

//#region 'LOCAL DEP'
import Reports from '../../views/reports'
import * as userActions from '../../../redux/actions/user-action'
//#endregion

function ManageReports() {

    return (
        <Reports/>
    );
}

export default ManageReports