import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import NoteAdd from '@material-ui/icons/NoteAddOutlined';

import { stateManager } from '../components/State';

const styles = {
  create: {
    link: { marginLeft: 'auto' },
    button: { color: '#FFF' }
  }
}

// this component is always present, but needs a unmount to unsubscribe if it is deleted!
export class Menu extends Component {
  constructor() {
    super();

    // initialize local state
    this.state = {
      nav: 'home'
    }
    
    // subscribe to navigation events
    this._subscribeToEvents();

  }

  _subscribeToEvents() {
    stateManager.subscribe('nav', (location) => {
      this.setState({ nav: location });
    });
  }

  render() {
    // provide some sort of guidance to the user as to where navigation currently is
    let title = ''
    switch (this.state.nav) {
      case 'home':
        title = <h2>Incident List</h2>
        break;
      case 'new':
        title = <h2>Create Incident</h2>
        break;
      case 'edit':
        title = <h2>Edit Incident</h2>
        break;
      default:
        break;
    }

    return (
      <AppBar position="static">
        <Toolbar>

          {title}

          <Link to="/create" style={styles.create.link} onClick={() => { stateManager.publish('nav', 'new') }} >
            <Button style={styles.create.button}>
              <NoteAdd></NoteAdd> Add Incident
            </Button>
          </Link>

        </Toolbar>
      </AppBar>
    )
  }
}
