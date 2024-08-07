// import { createContext, useReducer, useContext } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

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
//         token: localStorage.getItem("authToken"),
//         isAuthenticated: !!localStorage.getItem("authToken"),
//     });
//     const navigate = useNavigate();
//     const location = useLocation();

//     const actions = {
//         login: (token) => {
//             dispatch({ type: ACTIONS.LOGIN, payload: token });
//             localStorage.setItem("authToken", token);
//             const origin = location.state?.from?.pathname || "/";
//             navigate(origin);
//         },
//         logout: () => {
//             dispatch({ type: ACTIONS.LOGOUT });
//             localStorage.removeItem("authToken");
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
                token: action.payload,
                isAuthenticated: true,
            };
        case ACTIONS.LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }
}

function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, {
        token: decryptToken(localStorage.getItem("authToken")),
        isAuthenticated: !!localStorage.getItem("authToken"),
    });
    const navigate = useNavigate();
    const location = useLocation();

    const actions = {
        login: (token) => {
            const encryptedToken = encryptToken(token);
            dispatch({ type: ACTIONS.LOGIN, payload: encryptedToken });
            localStorage.setItem("authToken", encryptedToken);
            const origin = location.state?.from?.pathname || "/";
            navigate(origin);
        },
        logout: () => {
            dispatch({ type: ACTIONS.LOGOUT });
            localStorage.removeItem("authToken");
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

function encryptToken(token) {
    const secretKey = import.meta.env.SECRET_KEY || "default_secret_key";
    return CryptoJS.AES.encrypt(token, secretKey).toString();
}

function decryptToken(encryptedToken) {
    if (!encryptedToken) return null;
    const secretKey = import.meta.env.SECRET_KEY || "default_secret_key";
    const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}

export { AuthContext, AuthProvider, useAuth };