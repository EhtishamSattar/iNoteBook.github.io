import React, { useContext } from "react";
import { useEffect,useRef,useState } from "react";
import NotesContext from "../Context/NotesContext";
import AddNote from "./AddNote";
import NotesItem from "./NotesItem";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

export default function Notes(props) {
  let context = useContext(NotesContext);
  let { notes, getAllNotes,editNote } = context;

  let navigate=useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token'))
    {
      getAllNotes();

    }else{
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  //!  use of useRef hook
  const ref=useRef(null);
  const refClose=useRef();

  const [note, setNote] = useState({eid:"",etitle:"",edescription:"",etag:"default"});

  const updateNote = (currentNote) => {
    ref.current.click();
    //console.log(currentNote._id); thk hai 
    setNote({eid:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
    
  };
  
  const eonChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value});
  }
  
  const ehandleClick=(e)=>{
    editNote(note.eid,note.etitle,note.edescription,note.etag);
    refClose.current.click();
    props.showAlert("Your Note has been updated Successfully","success");
    e.preventDefault();

  }

  return (
    <>
    
    
    <div className="row my-2">
      <AddNote showAlert={props.showAlert}/>

      {/* using modal for edit note functionality */}
      <button
        type="button "
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit your Note
              </h1>
            </div>
            <div className="modal-body">
              <form className="my-2" onSubmit={ehandleClick}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    value={note.etitle}
                    onChange={eonChange}
                    minLength={3}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label" >
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={eonChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={eonChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  
                >
                  Update Note{" "}
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text my-4">Your Notes here </h2>

      <div className="contanier">
        {notes.length===0 && 'You have not added any notes yet :/ '}
      </div>
      {notes.map((note) => {
        return (
          <NotesItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
        );
        
      })}
    </div>
    <Footer/>
    </>
  );
}
