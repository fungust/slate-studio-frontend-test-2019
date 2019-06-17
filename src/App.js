import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css';

import { Menu } from './components/Menu'
import { stateManager } from './components/State';

import { CreateIncident } from './pages/CreateIncident'
import { Home } from './pages/Home'

// initial data store
stateManager.data = {
  edit: null,
  incidents: [
    {
      title: "Test incident",
      assignee: "Admin",
      status: "Resolved",
      priority: 3
    },
    {
      title: "Another incident",
      assignee: "Engineer",
      status: "Acknowledged",
      priority: 2
    },
  ]
}

// subscribe to the incident channel of the statemanager
stateManager.subscribe('newIncidentAdded', (data) => {
  console.log('Event has been fired: New Incident Added', data)
})

class App extends React.Component {
  render() {

    return (
      <Router>
        <div className="App">
          <div>

            <Menu></Menu>

            <Route path="/create" component={CreateIncident} />
            <Route exact path="/" component={Home} />

          </div>
        </div>
      </Router >
    )
  }
}

export default App
