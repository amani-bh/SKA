import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useState } from 'react';
import { inviteMemberToProject } from '../../../utils/Task';
import { findUsers, getCurrentUser } from '../../../utils/user.auth.service';

export default function InviteMembersModal({ project, setShowModal }) {
    const [member, setMember] = useState();
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleChange = async (event) => {
        const value = event.target.value;
        setInputValue(value);
    
        try {
          const response = await findUsers(value)
    
          setSuggestions(response);
        } catch (error) {
          console.error(error);
        }
      };

      const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion.email);
        setMember(suggestion)
        setSuggestions([]);
      };

    const handleInvite = async () => {
        const user=getCurrentUser()
        try {
            await inviteMemberToProject(project.id,member.email,user?.first_name+" "+user?.last_name,member.id)
        } catch (error) {
            console.log(error);
        }
        setShowModal(false);
    };
  return (
    <div className="label-modal label-modal--shadow" >
    <div className="label-modal__header">
        <p>Add Members</p>
        <button style={{border:'none',backgroundColor:'white'}} onClick={() => setShowModal(false)}>
        <FontAwesomeIcon icon={faTimes} />
        </button>
    </div>

    <div className="label-modal__content">
        <p className="label-modal__invite-header">
            <i className="fal fa-user"></i>
            Enter Email Address 
        </p>
        <input
            className="label-modal__input"
            type="text"
            name="members"
            placeholder="exemple@capgemini.com"
            value={inputValue} onChange={handleChange}
            autoComplete="off" 
        />
        <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion.email}
          </li>
        ))}
      </ul>
        {inputValue.trim() !== "" ? (
            <button className="btn" onClick={handleInvite}>
                Invite to Project
            </button>
        ) : (
            <button className="btn btn--disabled" disabled>
                Invite to Project
            </button>
        )}
    </div>
</div>
  )
}
