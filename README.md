## Description
This repository represents a submission to the test available at [Slate Frontend Test Assignment](https://github.com/slate-studio/assessment-frontend-2019).

1. You should store your library code in the `/lib` folder of this repository.
	- **Code is in /lib/blu.js**
2. You are free to use any architecture pattern for designing your library. It can be **Flux**, **Redux**, **BloC**, etc.
	- **blu.js implements a simple publish/subscribe mechanism**
	- **Instantiated via State.js component**
3. Your library should be integrated with a simple example app in `src` folder.
    1. You should create a form component for creating a new incident
		- **Form component is in CreateIncident.js**
    2. When an incident is created, an action must be dispatched notifying the rest of the app that a new incident is created
		- **Event is emitted and printed to console. Subscriber is in App.js**
    3. Home page should get a list of incident from your library's store instead of hardcoded values
		- **Home Page displays list of values stored in State.js**
4. You should bring some essential styling to the app (currently it has no styling at all).
    1. You can use any styling framework you want.
		- **bootstrap + material-ui for some icons**
    2. The information should be displayed appropriately on devices of all sizes
		- **Layout should work on most devices**

5. **Bonus**
  - **Added a title bar to improve navigation and usability**
  - **Incidents are ordered in terms of priority New -> Acknowledged -> Resolved**
  - **Incidents can be edited by clicking on the individual incident pencil icon**

## Start the development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Run `npm install` before running `npm start` in the root of the project.
