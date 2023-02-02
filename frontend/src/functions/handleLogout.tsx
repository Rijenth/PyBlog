import { Dispatch } from 'redux';
import { setLoginState, setUserId } from '../store/userAuthReducer';

const handleLogout = (dispatch: Dispatch) => {
    sessionStorage.clear();
    dispatch(setLoginState(false));
    dispatch(setUserId(0));
}

export default handleLogout;
