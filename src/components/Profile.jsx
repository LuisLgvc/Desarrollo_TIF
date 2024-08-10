// import { useState, useEffect, useRef } from "react";
// import { useAuth } from "../contexts/AuthContext";
// import useFetch from "../hooks/useFetch";
// import ProfileImageModal from "./ProfileImageModal";

// function Profile() {
//     const { token } = useAuth("state");

//     const [editMode, setEditMode] = useState(false);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isEditingState, setIsEditingState] = useState(false);

//     const firstNameRef = useRef(null);
//     const lastNameRef = useRef(null);
//     const emailRef = useRef(null);
//     const dobRef = useRef(null);
//     const bioRef = useRef(null);
//     const userStateRef = useRef(null);

//     const {
//         data: userData,
//         isLoading: isLoadingProfile,
//         isError: isErrorProfile,
//         doFetch: fetchProfile,
//     } = useFetch(
//         `${import.meta.env.VITE_API_BASE_URL}users/profiles/profile_data/`,
//         {
//             method: "GET",
//             headers: {
//                 Authorization: `Token ${token}`,
//             },
//         }
//     );

//     const {
//         data: updatedUserData,
//         isLoading: loadingUpdate,
//         isError: errorUpdating,
//         doFetch: updateProfile,
//     } = useFetch();

//     const {
//         data: profileImageData,
//         isLoading: isLoadingUpdate,
//         isError: errorProfileImage,
//         doFetch: updateProfileImage,
//     } = useFetch();

//     const {
//         data: userStates,
//         isLoading: isLoadingUserStates,
//         isError: isErrorUserStates,
//         doFetch: fetchUserStates,
//     } = useFetch(`${import.meta.env.VITE_API_BASE_URL}users/user-states/`, {
//         method: "GET",
//         headers: {
//             Authorization: `Token ${token}`,
//         },
//     });

//     useEffect(() => {
//         if (updatedUserData && isEditingState) {
//             setIsEditingState(false);
//             userData.state = updatedUserData.state;
//         }
//     }, [updatedUserData]);

//     useEffect(() => {
//         fetchProfile();
//     }, [token]);

//     useEffect(() => {
//         if (profileImageData) {
//             userData.image = profileImageData.image;
//         }
//     }, [profileImageData]);

//     useEffect(() => {
//         fetchUserStates();
//     }, [isEditingState]);

//     function handleEditMode() {
//         setEditMode(!editMode);
//     }

//     function handleSubmit(event) {
//         event.preventDefault();
//         updateProfile(
//             `${import.meta.env.VITE_API_BASE_URL}users/profiles/${userData.user__id}/`,
//             {
//                 method: "PATCH",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Token ${token}`,
//                 },
//                 body: JSON.stringify({
//                     first_name: firstNameRef.current.value,
//                     last_name: lastNameRef.current.value,
//                     email: emailRef.current.value,
//                     dob: dobRef.current.value,
//                     bio: bioRef.current.value,
//                 }),
//             }
//         );
//     }

//     function handleStateChange(event) {
//         const newUserStateID = event.target.value;

//         updateProfile(
//             `${import.meta.env.VITE_API_BASE_URL}users/profiles/${userData.user__id}/`,
//             {
//                 method: "PATCH",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Token ${token}`,
//                 },
//                 body: JSON.stringify({
//                     state: newUserStateID,
//                 }),
//             }
//         );
//     }

//     if (isLoadingProfile) return <p>Cargando perfil...</p>;
//     if (isErrorProfile) return <p>Error: {isErrorProfile}</p>;

//     return (
//         <div className="card">
//             {userData ? (
//                 <>
//                     <form className="card-content" onSubmit={handleSubmit}>
//                         <div className="media">
//                             <div className="media-left">
//                                 <figure className="image is-48x48">
//                                     <img
//                                         src={
//                                             `${import.meta.env.VITE_API_BASE_URL}${userData.image}` ||
//                                             "https://bulma.io/assets/images/placeholders/96x96.png"
//                                         }
//                                         alt="Profile image"
//                                         style={{ borderRadius: "50%" }}
//                                         onClick={() => setIsModalOpen(true)}
//                                     />
//                                 </figure>
//                             </div>
//                             <div className="media-content">
//                                 {editMode ? (
//                                     <div
//                                         style={{
//                                             display: "flex",
//                                             gap: "0.5rem",
//                                             alignItems: "center",
//                                             marginBottom: "0.5rem",
//                                         }}
//                                     >
//                                         <input
//                                             type="text"
//                                             className="input is-small"
//                                             ref={firstNameRef}
//                                             defaultValue={userData.first_name}
//                                             style={{ width: "40%" }}
//                                         />
//                                         <input
//                                             type="text"
//                                             className="input is-small"
//                                             ref={lastNameRef}
//                                             defaultValue={userData.last_name}
//                                             style={{ width: "40%" }}
//                                         />
//                                     </div>
//                                 ) : (
//                                     <p className="title is-4 pb-2">
//                                         {firstNameRef.current?.value ||
//                                             userData.first_name}{" "}
//                                         {lastNameRef.current?.value ||
//                                             userData.last_name}
//                                     </p>
//                                 )}
//                                 {isEditingState ? (
//                                     <div className="field">
//                                         <div className="control">
//                                             <div className="select is-small">
//                                                 <select
//                                                     ref={userStateRef}
//                                                     defaultValue={
//                                                         userData.state.id
//                                                     }
//                                                     onChange={handleStateChange}
//                                                 >
//                                                     {userStates &&
//                                                         userStates.results.map(
//                                                             (state) => (
//                                                                 <option
//                                                                     key={
//                                                                         state.id
//                                                                     }
//                                                                     value={
//                                                                         state.id
//                                                                     }
//                                                                 >
//                                                                     {
//                                                                         state.name
//                                                                     }
//                                                                 </option>
//                                                             )
//                                                         )}
//                                                 </select>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ) : (
//                                     <p className="subtitle is-6">
//                                         {userData.state.name}
//                                     </p>
//                                 )}
//                             </div>
//                         </div>
//                         <div className="content">
//                             {editMode ? (
//                                 <div>
//                                     <div className="field">
//                                         <label className="label">Email</label>
//                                         <div className="control">
//                                             <input
//                                                 type="email"
//                                                 className="input"
//                                                 ref={emailRef}
//                                                 defaultValue={userData.email}
//                                             />
//                                         </div>
//                                     </div>
//                                     <div className="field">
//                                         <label className="label">Date of Birth</label>
//                                         <div className="control">
//                                             <input
//                                                 type="date"
//                                                 className="input"
//                                                 ref={dobRef}
//                                                 defaultValue={userData.dob}
//                                             />
//                                         </div>
//                                     </div>
//                                     <div className="field">
//                                         <label className="label">Bio</label>
//                                         <div className="control">
//                                             <textarea
//                                                 className="textarea"
//                                                 ref={bioRef}
//                                                 defaultValue={userData.bio}
//                                             />
//                                         </div>
//                                     </div>
//                                     <button
//                                         type="submit"
//                                         className="button is-primary"
//                                     >
//                                         Save
//                                     </button>
//                                     <button
//                                         type="button"
//                                         className="button"
//                                         onClick={handleEditMode}
//                                     >
//                                         Cancel
//                                     </button>
//                                 </div>
//                             ) : (
//                                 <div>
//                                     <p className="subtitle is-6">{userData.bio}</p>
//                                     <button
//                                         type="button"
//                                         className="button is-info"
//                                         onClick={handleEditMode}
//                                     >
//                                         Edit
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     </form>
//                     <ProfileImageModal
//                         isOpen={isModalOpen}
//                         onClose={() => setIsModalOpen(false)}
//                         onSave={updateProfileImage}
//                         currentImage={userData.image}
//                     />
//                 </>
//             ) : (
//                 <p>No se encontraron datos del usuario.</p>
//             )}
//         </div>
//     );
// }

// export default Profile;

// import { useAuth } from '../contexts/AuthContext';

// function Profile() {
//     const { state } = useAuth('state');
//     const { user, userId } = state;

//     return (
//         <div>
//             <h1>Perfil</h1>
//             {user ? (
//                 <div>
//                     <p>ID de Usuario: {userId}</p>
//                     <p>Nombre de Usuario: {user}</p>
//                 </div>
//             ) : (
//                 <p>No se encontraron datos del usuario.</p>
//             )}
//         </div>
//     );
// }

// export default Profile;

import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

function Profile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { token } = useAuth("state");

    useEffect(() => {
        fetch(
            `${import.meta.env.VITE_API_BASE_URL}users/profiles/profile_data/`,
            {
                method: "GET",
                headers: {
                    Authorization: `Token ${token}`,
                },
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                return response.json();
            })
            .then((data) => {
                setUserData(data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Cargando perfil...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="card">
            {userData ? (
                <>
                    <div className="card-content">
                        <div className="media">
                            <div className="media-left">
                                <figure className="image is-48x48">
                                    <img
                                        src={
                                            userData.image ||
                                            "https://bulma.io/assets/images/placeholders/96x96.png"
                                        }
                                        alt="Profile image"
                                        style={{ borderRadius: "50%" }}
                                    />
                                </figure>
                            </div>
                            <div className="media-content">
                                <p className="title is-4 pb-2">
                                    {userData.first_name} {userData.last_name}
                                </p>
                                <div
                                    className="subtitle is-6"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <img
                                        src={`${
                                            import.meta.env.VITE_API_BASE_URL
                                        }${userData.state.icon}`}
                                        alt="State icon"
                                        style={{
                                            height: "20px",
                                            marginRight: "5px",
                                            borderRadius: "50%",
                                        }}
                                    />
                                    {userData.state.name}
                                </div>
                            </div>
                        </div>

                        <div className="content">
                            Email: {userData.email}
                            <br />
                            Fecha de Nacimiento: {userData.dob}
                            <br />
                            Biografía: {userData.bio || "No disponible"}
                        </div>
                    </div>
                </>
            ) : (
                <p className="subtitle">No se encontraron datos del usuario.</p>
            )}
        </div>
    );
}

export default Profile;