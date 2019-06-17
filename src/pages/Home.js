import React, { Component } from 'react'

import { Incident } from '../components/Incident'
import { stateManager } from '../components/State';

export class Home extends Component {
  render() {

    // sort form with new (priority 0) at the top
    stateManager.data.incidents.sort((a, b) => {
      return a.priority - b.priority
    });
    
    // return list of incidents
    return (
      <div>
        {stateManager.data.incidents.map((d, i) => {
          return <Incident
            key={i}
            index={i}
            title={d.title}
            assignee={d.assignee}
            status={d.status}
          />
        })}
      </div>
    )
  }
}
