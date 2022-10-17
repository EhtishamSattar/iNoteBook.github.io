import React from "react";
import { useState } from "react";
// import { useState } from 'react';
import NotesContext from "./NotesContext";

//! to use this context , we have to wrap all the components
//! in app.js file in <NotesState> tag
 
// todo  following code is for the understanding of the useContext api

const NoteState = (props) => {
  const host = "http://localhost:5000";
  //! Fetching Notes
  const initialNotes = [];

  const [notes, setnotes] = useState(initialNotes);

  //! getting all notes
  const getAllNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //local storage sy token aye gha ab
        "auth-token":localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setnotes(json);
  };

  //!Adding a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addNotes`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag}),
    });
    // response.json() is a asychchronus function , always use krna hai iskay sath
    const note = await response.json();
    // concat will return a new concatenated array  where as push updates the array
    setnotes(notes.concat(note));
  };

  //! deleting a note
  const deleteNote = async (id) => {

    const response = await fetch(`${host}/api/notes/deleteNotes/${id}`, {
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
    });
    const json = await response.json();

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNotes);
  };

  //! editing a note
  const editNote = async (id, title, description, tag) => {
    // localhost:5000/api/notes/updateNotes/6341188ccc3bbfdedb5a0341
    const response = await fetch(`${host}/api/notes/updateNotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      //! {title ,description ,tag}  in brackets ki waja sy bht khapa tha 
      body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json();

    let updatedNotes=JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < updatedNotes.length; index++) {
      const element=updatedNotes[index];
      if (element._id === id) {
        updatedNotes[index].title = title;
        updatedNotes[index].description = description;
        updatedNotes[index].tag = tag;
        break;
      }
    }
    setnotes(updatedNotes);
  };


  return (
    //                     value={{state,update}}
    <NotesContext.Provider
      value={{ notes, addNote, deleteNote, getAllNotes,editNote }}
    >
      {props.children}
    </NotesContext.Provider>
  );
};
export default NoteState;
