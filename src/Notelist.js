import React from 'react';
import {Link} from 'react-router-dom';
import StoreContext from './StoreContext';
import PropTypes from 'prop-types';



class NoteList extends React.Component {

    static contextType = StoreContext;

    render(){

    const filteredNoteList = this.context.notes
        .filter(note => `/folder/${note.folder_id}` === this.props.match.url)
        .map(note => {
            const date = new Date(note.modified)
        const convertedDate = date.toDateString()
            return (
                <li key={note.id}>
                    <Link to={`/note/${note.id}`}>
                    <h2>{note.note_title}</h2>
                    </Link>
                    <p>Date Modified On: {convertedDate}</p>
                    <button type="button" className="delete-button" onClick={()=>this.context.delete(note.id)}>Delete Note</button>
                </li>
            )
        })

    const noteList = this.context.notes.map(note => {
        const date = new Date(note.modified)
        const convertedDate = date.toDateString()
        return (
            <li key={note.id}>
                <Link to={`/note/${note.id}`}>
                <h2>{note.note_title}</h2>
                </Link>
                <p>Date Modified On: {convertedDate}</p>
                <button type="button" className="delete-button" onClick={() => this.context.delete(note.id)}>Delete Note</button>
            </li>
        )
    })

    if (this.props.match.url === '/') {
        return (
            <div className="note-list">
                <ul>
                {noteList}
                </ul>
            </div>
        )
    } else return (
        <div className="note-list">
            <ul>
            {filteredNoteList}
            </ul>
        </div>
    )

}
}

NoteList.propTypes = {
    notes: PropTypes.array,
    url: PropTypes.string,
    
};

export default NoteList;