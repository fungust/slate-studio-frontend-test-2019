import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import Edit from '@material-ui/icons/Edit';

import { stateManager } from '../components/State';

const styles = {
  box: {
    body: {
      padding: '10px',
      boxSizing: 'content-box',
    },
    card: {
      header: {
        backgroundColor: '#EEE'
      },
      actions: { float: 'right' }
    }
  }
}

export class Incident extends Component {
  _editIncident() {
    stateManager.data.edit = this.props.index;
    stateManager.publish('nav', 'edit')
  }

  render() {
    return (
      <div style={styles.box.body}>

        <div className="card">
          <div className="card-header" style={styles.box.card.header}>
            <div className="row">
              <Link to="/create">
                <Button onClick={() => { this._editIncident() }} style={styles.box.card.actions}>
                  <Edit></Edit>
                </Button>
              </Link>
              <h3>{this.props.title}</h3>
            </div>
          </div>

          <div className="card-body">
            <blockquote className="blockquote mb-0">
              <p>Assignee: {this.props.assignee}</p>
              <footer className="blockquote-footer">Status: {this.props.status}</footer>
            </blockquote>
          </div>

        </div>
      </div>
    )
  }
}