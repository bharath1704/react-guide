import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary'

class App extends Component {
  state = {
    persons: [
      { id: '1', name: 'Rust', age: '30' },
      { id: '2', name: 'Howard', age: '29' },
      { id: '3', name: 'Danny', age: '28' }
    ],
    showPersons: false
  }

  nameChangedHandler = (event, id) => {

    const personIndex = this.state.persons.findIndex(p => p.id === id);

    const person = {
      ...this.state.persons[personIndex]
    }
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  }

  deletePersonHandler = (personIndex) => {
      const persons = [...this.state.persons];
      persons.splice(personIndex,1);
      this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons
    })
  }

  render() {

    let persons = null;
    let btnClass = null;

    if(this.state.showPersons){
      persons = (
        <div>
          {this.state.persons.map((person,index) => {
            return <ErrorBoundary key={person.id}>
            <Person 
                      click = {() => this.deletePersonHandler(index)}
                      name={person.name}
                      age={person.age}
                      changed={(event) => this.nameChangedHandler(event, person.id)}/>
            </ErrorBoundary>          
          })}
          
        </div>
      )  

      btnClass = classes.Red;
    }

    const assginedClasses = [];

    if(this.state.persons.length <= 2){
      assginedClasses.push( classes.red);
    }
    if(this.state.persons.length <= 1){
      assginedClasses.push( classes.bold );
    }

    return (
      <div className={classes.App}>

        <h1>Hey React, Ssup</h1>
        <p className={ assginedClasses.join(' ') }>This is working</p>

        <button
          className = {btnClass}
          onClick={this.togglePersonsHandler}>Toggle Persons</button>

        { persons }    
        
      </div>
    );
    //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App'));
  }
}

export default App;