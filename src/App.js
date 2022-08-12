import React, { useState, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import './App.scss';

const initialState = {lastNoteCreated: null, notes: [] }

const reducer = (prevState, action) => {
  switch(action.type){
    // TODO: ADD_NOTE
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
      // TODO: number of degrees(rotation) to randomly apply to this note
    }
    console.log(newNote);
    // TODO: dispatch action (add this note to state.notes)
    setNoteInput("")
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
    </div>
  );
}

export default App;
