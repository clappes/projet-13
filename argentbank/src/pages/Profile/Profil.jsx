import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../features/profile/profileSlice";
import { updateUserProfile } from "../../features/profile/profileSlice";
import { useNavigate } from "react-router-dom";

import info from "../../data/info.json";
import Account from "../../components/Account/Account";

const Profil = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.profile.profile);
  const loading = useSelector((state) => state.profile.loading);
  const error = useSelector((state) => state.profile.error);
  const [isEditing, setIsEditing] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState(''); 

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (!profile) {
      dispatch(fetchUserProfile()).then((response) => {
        console.log("Fetched profile:", response.payload);
      });
    }
  }, [dispatch, user, profile, navigate]);

  useEffect(() => {
    if (profile) {
      setNewUserName(profile.userName || '');
      setNewFirstName(profile.firstName || '');
      setNewLastName(profile.lastName || '');
    }
  }, [profile]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({
      userName: newUserName,
      firstName: newFirstName,
      lastName: newLastName,
    }));
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error.message}</p>;

  

  return (
    <main className="main bg-dark">
      <div className="header-account">
        {isEditing ? (
          <form onSubmit={handleFormSubmit}>
            <h1>Edit User info</h1>
            <div className="container-input">
              <div>
                <label>Username : </label>
                <input
                  className="container-input__label--username"
                  type="text"
                  value={newUserName || ''}
                  onChange={(e) => setNewUserName(e.target.value)}
                />
              </div>
              <div>
                <label>First Name : </label>
                <input
                  className="container-input__label--firstname"
                  type="text"
                  value={newFirstName}
                  onChange={(e) => setNewFirstName(e.target.value)}
                  aria-label="First name"
                />
              </div>
              <div>
                <label>Last Name : </label>
                <input
                  className="container-input__label--lastname"
                  type="text"
                  value={newLastName}
                  onChange={(e) => setNewLastName(e.target.value)}
                  aria-label="Last name"
                />
              </div>
            </div>
            <div className="container-button">
              <button type="submit">Save</button>
              <button type="button" onClick={handleCancelClick}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <h1>
              Welcome back
              <br />
              {profile ? profile.firstName : ""}{" "}
              {profile ? profile.lastName : ""}
            </h1>
            <button className="edit-button" onClick={handleEditClick}>
              Edit Name
            </button>
          </>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      {info.transactions.map((transaction, index) => (
        <Account key={index} name={transaction.title} solde={transaction.montant} balance={transaction.available} />
      ))}
      
    </main>
  );
};

export default Profil;