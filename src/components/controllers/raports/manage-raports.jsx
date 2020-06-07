//#region 'NPM DEP'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
//#endregion

//#region 'LOCAL DEP'
import Raports from '../../views/raports'
import * as userActions from '../../../redux/actions/user-action'
//#endregion

function ManageRaports() {

    return (
        <Raports/>
    );
}

export default ManageRaports