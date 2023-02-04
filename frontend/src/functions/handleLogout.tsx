import { Dispatch } from 'redux';
import { setAdmin, setLoginState, setUserId } from '../store/userAuthReducer';

const handleLogout = (dispatch: Dispatch) => {
    localStorage.clear();
    dispatch(setLoginState(false));
    dispatch(setUserId(0));
    dispatch(setAdmin(false));
}

export default handleLogout;
