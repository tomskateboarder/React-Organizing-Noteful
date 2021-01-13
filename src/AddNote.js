import React from 'react';
import StoreContext from './StoreContext';

{/* Create a new component AddNote that implements a form to capture the name, 
content and folder for a new Note. 
Submit to the POST /notes endpoint on the server. 
Add validation to ensure that the name of the note is not left blank. 
The folder should be selected from a list of existing folders. 
Ensure that errors are properly handled. Add a button to the note list page to invoke this new form.*/}

{/*Define an error boundary component. Add this component to specific points in your component structure. */}

{/*Review each of the components that you have built so far for this project. 
Any component that receives props from its parent should be refactored to define PropType validation. */}

class AddNote extends React.Component {
  static contextType = StoreContext;

  render() {
    return (
      <form onSubmit={e => this.context.newNote(e)}>
        <label htmlFor="new-note-name">Name:</label>
        <input
          type="text"
          name="new-note-name"
          placeholder="New Note"
          id="new-note-name"
          onChange={e => this.context.newNoteName(e.target.value)}
          required
          aria-label="Add a New Note"
           aria-required="true"
        />

        <label htmlFor="new-note-content">Content:</label>
        <input
          type="text"
          name="new-note-content"
          placeholder="Type here"
          id='new-note-content'
          onChange={e => this.context.newNoteContent(e.target.value)}
          aria-label="New Note Content"
        />

        <label htmlFor="new-note-folder" aria-label="Pick a Folder to Add the New Note to">Folder:</label>
        <select onChange={e => this.context.newNoteFolder(e.target.value)}>
          <option value="Pick an Existing Folder">
            Pick an Existing Folder
          </option>

          {this.context.folders.map(folder => (
            <option key={folder.id} value={folder.id}>
                {folder.folder_title}
                </option>
          ))}

        </select>
        

        <button type="submit" className="add-note-button">Add New Note</button>
      </form>
    );
  }
}

export default AddNote;