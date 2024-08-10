// import { createContext, useReducer, useContext } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import CryptoJS from "crypto-js";

// const AuthContext = createContext();

// const ACTIONS = {
//     LOGIN: "LOGIN",
//     LOGOUT: "LOGOUT",
// };

// function reducer(state, action) {
//     switch (action.type) {
//         case ACTIONS.LOGIN:
//             return {
//                 ...state,
//                 token: action.payload,
//                 user__id: action.payload,
//                 isAuthenticated: true,
//             };
//         case ACTIONS.LOGOUT:
//             return {
//                 ...state,
//                 token: null,
//                 isAuthenticated: false,
//             };
//         default:
//             return state;
//     }
// }

// function AuthProvider({ children }) {
//     const [state, dispatch] = useReducer(reducer, {
//         token: decrypt(localStorage.getItem("authToken")),
//         user__id: decrypt(localStorage.getItem("user__id")),
//         isAuthenticated: !!localStorage.getItem("authToken") ? true : false,
//     });
//     const navigate = useNavigate();
//     const location = useLocation();

//     const actions = {
//         login: (token, user__id) => {
//             dispatch({
//                 type: ACTIONS.LOGIN,
//                 payload: { token, user__id }
//             });
//             const encryptedToken = encrypt(token)
//             localStorage.setItem("Token", encryptedToken);

//             const encryptedUser__id = encrypt(user__id);;
//             localStorage.setItem("user__id", encryptedUser__id);

//             const origin = location.state?.from?.pathname || "/songs"; // despues podes borrar esto
//             navigate(origin);
//         },
//         logout: () => {
//             dispatch({ type: ACTIONS.LOGOUT });
//             localStorage.removeItem("Token");
//             localStorage.removeItem("user__id");
//         },
//     };

//     return (
//         <AuthContext.Provider value={{ state, actions }}>
//             {children}
//         </AuthContext.Provider>
//     );
// }

// function useAuth(type) {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error("useAuth must be used within an AuthProvider");
//     }
//     return context[type];
// }

// function encrypt(param) {
//     const secretKey = import.meta.env.SECRET_KEY || "default_secret_key";
//     return CryptoJS.AES.encrypt(param, secretKey).toString();
// }

// function decrypt(param) {
//     if (!param) return null;
//     const secretKey = import.meta.env.SECRET_KEY || "default_secret_key";
//     const bytes = CryptoJS.AES.decrypt(param, secretKey);
//     return bytes.toString(CryptoJS.enc.Utf8);
// }

// export { AuthContext, AuthProvider, useAuth };

import { createContext, useReducer, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

const AuthContext = createContext();

const ACTIONS = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
};

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.LOGIN:
            return {
                ...state,
                token: action.payload.token,
                user__id: action.payload.user__id,
                isAuthenticated: true,
            };
        case ACTIONS.LOGOUT:
            return {
                ...state,
                token: null,
                user__id: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }
}

function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, {
        token: decrypt(localStorage.getItem("Token")),
        user__id: decrypt(localStorage.getItem("user__id")),
        isAuthenticated: !!localStorage.getItem("Token"),
    });
    const navigate = useNavigate();
    const location = useLocation();

    const actions = {
        login: (token, user__id) => {
            const encryptedToken = encrypt(token);
            const encryptedUser__id = encrypt(user__id);

            localStorage.setItem("Token", encryptedToken);
            localStorage.setItem("user__id", encryptedUser__id);

            dispatch({
                type: ACTIONS.LOGIN,
                payload: { token, user__id },
            });

            const origin = location.state?.from?.pathname || "/songs";
            navigate(origin);
        },
        logout: () => {
            localStorage.removeItem("Token");
            localStorage.removeItem("user__id");
            dispatch({ type: ACTIONS.LOGOUT });
        },
    };

    return (
        <AuthContext.Provider value={{ state, actions }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(type) {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context[type];
}

function encrypt(param) {
    const secretKey = import.meta.env.SECRET_KEY || "default_secret_key";
    return CryptoJS.AES.encrypt(param, secretKey).toString();
}

function decrypt(param) {
    if (!param) return null;
    const secretKey = import.meta.env.SECRET_KEY || "default_secret_key";
    const bytes = CryptoJS.AES.decrypt(param, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}

export { AuthContext, AuthProvider, useAuth };
