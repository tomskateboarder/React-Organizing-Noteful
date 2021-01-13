
import React from 'react';
import NoteList from './notelist';
import './styles/main.css'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';

export default function Main (props) {

    return(
        <div>
            <NoteList match={props.match}/>
            <Link to='/addnote'>
            <button className="add-note">Add Note</button>
            </Link>
        </div>
    )
}

Main.propTypes = {
    match: PropTypes.object
};