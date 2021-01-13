import React from 'react';
import StoreContext from './StoreContext'


{/* Create a new component AddFolder that implements a form to capture the name of a new folder from the user. 
This form should submit the name of the new folder to the POST /folders endpoint on the server. 
Ensure that any errors are properly handled. 
Add a button to the navigation to invoke the new form.*/}

class AddFolder extends React.Component {

  static contextType = StoreContext;

  render(){

      return(
          <form onSubmit={e => this.context.newFolder(e)}>
              <label htmlFor="new-folder" className="new-folder-label">New Folder Name:</label>
              <input
                  type="text" 
                  id="newFolder"
                  name="newFolder"
                  placeholder="New Folder"
                  onChange={e => this.context.newFolderName(e.target.value)}
                  required
                  className="new-folder-input"
                  aria-label="Add a New Folder"
                  aria-required="true"
              />
              <button type="submit">Add New Folder</button>
          </form>
      );
  }
}



export default AddFolder;