import config from "../configs/config";
import { LOGIN_REQUEST } from "../constants/authenticationConstants";
import { LOGIN_FAILURE } from "../constants/authenticationConstants";
import { LOGIN_SUCCESS } from "../constants/authenticationConstants";


export const login = (email, password) => {
    return async (dispatch) => {
        dispatch({ type: LOGIN_REQUEST });

        try {
            const response = await fetch(`${config.apiBaseUrl}/login`, {
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
                throw new Error('Login failed');
            }

            const data = await response.json();
            dispatch({ type: LOGIN_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: LOGIN_FAILURE, payload: error.message });
        }
    };
};
