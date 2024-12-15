import config from "../configs/config";
import { SIGNUP_REQUEST } from "../constants/authenticationConstants";
import { SIGNUP_FAILURE } from "../constants/authenticationConstants";
import { SIGNUP_SUCCESS } from "../constants/authenticationConstants";


export const signup = (email, password) => {
    return async (dispatch) => {
        dispatch({ type: SIGNUP_REQUEST });

        try {
            const response = await fetch(`${config.apiBaseUrl}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                throw new Error('SignUp failed');
            }

            const data = await response.json();
            dispatch({ type: SIGNUP_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: SIGNUP_FAILURE, payload: error.message });
        }
    };
};
