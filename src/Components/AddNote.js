import React,{useState,useContext} from 'react';
import NotesContext from '../Context/NotesContext';

const AddNote = (props) => {

    const context=useContext(NotesContext);
    const{addNote}=context;

    const [note, setNote] = useState({title:"",description:"",tag:"default"});
    const handleClick=(e)=>{
        //! button click krny pr page reload huta hai.... is sy bachny ky liye hm
        //! preventdefault ka paryooog kry ghy .. LOL
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:"default"});
        props.showAlert("Your Note has been added successfully","success");
    }

    const onChange=(e)=>{
        //! ...  --> spreadOperator 

        //todo THING TO UNDERSTAND

        //    ...note  --> means jo bhi values notes object me hein wo rhy or 
        //                 jo properties agy likhy ja rhi hein unhy add ya over-write
        //                 kr dein
        setNote({...note,[e.target.name]:e.target.value});
    }
  return (
    <>
    <h2 className='text mt-5' style={{paddingTop:"50px"}}>Add a Note</h2>
      <form id="addNoteForm" className='my-2'>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={3} required/>
          
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required/>
          <div id="descHelp" className="form-text">
            Your description must contain 5 or more cahracters.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" value={note.tag==="default"?"":note.tag} onChange={onChange} minLength={3} />
        </div>
        <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note </button>
      </form>
    </>
  );
}

export default AddNote;
