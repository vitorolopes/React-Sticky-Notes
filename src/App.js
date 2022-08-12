import React, { useState, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import './App.scss';

const initialState = {lastNoteCreated: null, notes: [] }

const reducer = (prevState, action) => {
  switch(action.type){
    case "ADD_NOTE":{
      const newState = {
        ...prevState,
        notes: [...prevState.notes, action.payload]
      }
      return newState
    }
    default:
      return prevState
  }
}

function App() {

  const [noteInput, setNoteInput] = useState(""); 
  const [state, dispatch] = useReducer(reducer, initialState)

  const addNote = (e) => { 
    e.preventDefault()
    if(!noteInput) return // We don't want to add a blank note 
    const newNote = {
      text: noteInput,
      id: uuidv4(), // going to need an id to delete notes
      rotate: Math.floor(Math.random() * 20)
    }
    dispatch({type: "ADD_NOTE", payload: newNote})
    setNoteInput("")
   }

   const dropNote = (e) => { 
    e.target.style.left = `${e.pageX - 50}px`
    e.target.style.top = `${e.pageY - 50}px`
    }

  return (
    <div className="app">
      <h1>Sticky Notes</h1>

      <form className="note-form" onSubmit={addNote}>
        <textarea placeholder='Create a new note ...'
                  value={noteInput}
                  onChange={(e)=> setNoteInput(e.target.value)}
        ></textarea>
        <button>
          Add
        </button>
      </form>

      {state.notes.map(note => {
        return(
           <div className="note" key={note.id}
                style = {{transform:`rotate(${note.rotate}deg)`}}
                draggable="true"
                onDragEnd={dropNote}
           >
            <div className="close">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <pre className="text">
              {note.text}
            </pre>
           </div>
        )
      })}
     
    </div>
  );
}

export default App;
