import React from "react";
import StoreContext from "./StoreContext";
import PropTypes from 'prop-types';


class Note extends React.Component {
  static contextType = StoreContext;

  render() {
    const note = this.context.notes.find(
      note => `/note/${note.id}` === this.props.match.url
    );

    if (!note) {
      return "page not found";
    }

    const date = new Date(note.modified);
    const convertedDate = date.toDateString();

    const folder = this.context.folders.find(folder => {
      if (folder.id === note.folder_id) {
        return true;
      } else return false;
    });

    return (

      <div key={note.id}>
        <div className="button-folder-container">
          <button
            className="go-back"
            onClick={() => this.props.history.goBack()}
          >
            Go Back
          </button>
          <h2 className="folder-name">{folder.folder_title}</h2>
        </div>

        <div className="expanded-note">
          <h2 className="note-name">{note.note_title}</h2>
          <p>Date Modified On: {convertedDate}</p>
          <button type="button" onClick={() => this.context.delete(note.id)}>
            Delete Note
          </button>
        </div>

        <p className="note-content">{note.content}</p>
      </div>
    );
  }
}

Note.propTypes = {
  notes: PropTypes.array,
  folders: PropTypes.array,
  url: PropTypes.string,
  history: PropTypes.object,
};

export default Note;