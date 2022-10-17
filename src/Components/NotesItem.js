import React,{useContext} from 'react';
import NotesContext from '../Context/NotesContext';

 
const NotesItem = (props) => {
  const context = useContext(NotesContext);
  
  //! destructuring
  const {deleteNote}=context;
  const {note,updateNote}=props;
  return (
    
    <div className="col-md-4 col-sm-12">
      <div className="card text-bg-dark my-2 " >
        <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description} </p>
            <i className="fa-solid fa-trash-can mx-1" onClick={()=>{deleteNote(note._id);props.showAlert("Your notes has been deleted Successfully","success")}}></i>
            {/* jab bhi wo function use krna hu jis me argument pass krna hai to usko 1 arrow function 
            me hi use kry ghy --> warna hm simple onClick={updateNote} likh saktay hein */}
            <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
        </div>
      </div>

    </div>
    
  );
}

export default NotesItem;
