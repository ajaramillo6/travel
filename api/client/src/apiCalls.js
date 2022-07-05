import axios from 'axios';

export const loginCall = async (userCredential,dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
        const res = await axios.post("/auth/login", userCredential);
        setTimeout(()=> {
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
        }, 1500);
    } catch(err) {
        dispatch({ type: "LOGIN_FAILURE", payload:err })
    }
}
