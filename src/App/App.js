import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons'
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import dummyStore from '../dummy-store';
import Main from '../Main';
import MainSidebar from '../MainSidebar';
import Note from '../Note';
import StoreContext from '../StoreContext';
import AddFolder from '../AddFolder';
import AddNote from '../AddNote';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

import {getNotesForFolder, findNote, findFolder} from '../notes-helpers';
import './App.css';
library.add(faCheckDouble)

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    componentDidMount() {
        // fake date loading from API call
        setTimeout(() => this.setState(dummyStore), 600);
    }

    renderNavRoutes() {
        const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => (
                            <NoteListNav
                                folders={folders}
                                notes={notes}
                                {...routeProps}
                            />
                        )}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(notes, noteId) || {};
                        const folder = findFolder(folders, note.folderId);
                        return <NotePageNav {...routeProps} folder={folder} />;
                    }}
                />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => {
                            const {folderId} = routeProps.match.params;
                            const notesForFolder = getNotesForFolder(
                                notes,
                                folderId
                            );
                            return (
                                <NoteListMain
                                    {...routeProps}
                                    notes={notesForFolder}
                                />
                            );
                        }}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(notes, noteId);
                        return <NotePageMain {...routeProps} note={note} />;
                    }}
                />
            </>
        );
    }

    render() {
        return (
            <div className="App">
                <nav className="App__nav">{this.renderNavRoutes()}</nav>
                <header className="App__header">
                    <h1>
                        <Link to="/">Noteful</Link>{' '}
                        <FontAwesomeIcon icon="check-double" />
                    </h1>
                </header>
                <main className="App__main">{this.renderMainRoutes()}</main>
            </div>
        );
            
    }
    render() {
        return (
          <StoreContext.Provider
            value={{
              folders: this.state.folders,
              notes: this.state.notes,
              delete: this.handleDelete,
              newFolderName: this.setNewFolderName,
              newFolder: this.handleAddNewFolder,
              newNoteName: this.setNewNoteName,
              newNoteContent: this.setNewNoteContent,
              newNoteFolder: this.setNewNoteFolder,
              newNote: this.handleAddNewNote
            }}
          >
            <div className="App">
              <Header />
              <Route exact path="/" component={MainSidebar} />
    
              <ErrorBoundry>
                <Route exact path="/" component={Main} />
    
                <Route
                  exact
                  path="/folder/:folderId"
                  render={props => (
                    <>
                      <MainSidebar match={props.match} />
                      <Main match={props.match} />
                    </>
                  )}
                />
                <Route exact path="/note/:noteId" component={Note} />
              </ErrorBoundry>
    
              <Route exact path="/addfolder" component={AddFolder} />
    
              <Route exact path="/addnote" component={AddNote} />
            </div>
          </StoreContext.Provider>
        );
      }
    }
}



export default App;