import React, { Component } from 'react'

import { stateManager } from '../components/State';

const styles = {
  form: {
    error: { borderColor: 'red' },
    submit: { padding: '5px' },
    body: {
      padding: '10px',
      boxSizing: 'content-box',
    }
  }
}

export class CreateIncident extends Component {
  constructor() {
    super()
    // check if we are in edit mode
    if (stateManager.data.edit !== null) {
      let ptr = stateManager.data.incidents[stateManager.data.edit];
      this.state = {
        error: [],
        title: ptr.title,
        assignee: ptr.assignee,
        status: ptr.status
      };
    } else {
      this.state = {
        error: [],
        title: '',
        assignee: '',
        status: ''
      };
    }
  }

  _formValid() {
    // check that the form is filled up (there is probably a better way of doing this)
    if ((this.state.title === '') || (this.state.assignee === '') || (this.state.status === '')) {
      let update = [];
      if (this.state.title === '') update.push('title');
      if (this.state.assignee === '') update.push('assignee');
      if (this.state.status === '') update.push('status');
      // update the state to force component to render
      this.setState({ error: update });
      return false
    } else {
      return true
    }
  }

  _returnHome() {
    stateManager.publish('nav', 'home');
    stateManager.data.edit = null;
    this.props.history.push('/');
  }

  handleCancel() {
    // we just need to return home here
    this._returnHome();
  }

  handleSave() {
    if (this._formValid()) {
      // assign a priority for sorting
      let priority = NaN;
      switch (this.state.status) {
        case 'New':
          priority = 1;
          break;
        case 'Acknowledged':
          priority = 2;
          break;
        case 'Resolved':
          priority = 3;
          break;
        default:
          break;
      }
      // check if we are in edit mode
      if (stateManager.data.edit !== null) {
        let ptr = stateManager.data.incidents[stateManager.data.edit];
        ptr.title = this.state.title;
        ptr.assignee = this.state.assignee;
        ptr.status = this.state.status;
        ptr.priority = priority;
      } else {
        let data = {
          title: this.state.title,
          assignee: this.state.assignee,
          status: this.state.status,
          priority: priority
        };
        stateManager.data.incidents.push(data);
        stateManager.publish('newIncidentAdded', data);
      }
      // return home when we are done
      this._returnHome();
    }
  }

  handleChange(field, evt) {
    // update the state on change of form
    let update = {};
    update[field] = evt.target.value;
    this.setState(update);
  }

  render() {
    
    return (
      <form style={styles.form.body}>

        <div className="form-group">
          <label>Incident Title</label>
          <input
            className="form-control"
            placeholder="Enter title of incident"
            value={this.state.title}
            onChange={(evt) => { this.handleChange('title', evt) }}
            style={this.state.error.indexOf('title') !== -1 ? (styles.form.error) : ({})}
          />
        </div>

        <div className="form-group">
          <label>Assignee</label>
          <input
            className="form-control"
            placeholder="Enter Incident Assignee Name"
            value={this.state.assignee}
            onChange={(evt) => { this.handleChange('assignee', evt) }}
            style={this.state.error.indexOf('assignee') !== -1 ? (styles.form.error) : ({})}
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            className="form-control"
            value={this.state.status}
            onChange={(evt) => { this.handleChange('status', evt) }}
            style={this.state.error.indexOf('status') !== -1 ? (styles.form.error) : ({})}
          >
            <option></option>
            <option>New</option>
            <option>Acknowledged</option>
            <option>Resolved</option>
          </select>
        </div>

        {this.state.error.length !== 0 ? (<small className="form-text text-muted">Please fill out the form properly before saving!</small>) : (<small></small>)}

        <span style={styles.form.submit}>
          <button onClick={() => { this.handleSave() }} type="button" className="btn btn-success">Save</button>
        </span>

        <span style={styles.form.submit}>
          <button onClick={() => { this.handleCancel() }} type="button" className="btn btn-danger">Cancel</button>
        </span>

      </form >
    )

  }
}