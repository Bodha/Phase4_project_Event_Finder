import React, { Component } from "react";
import EventServices from "../services/event.service";
// import { Link } from "react-router-dom";

export default class Event extends Component {

  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getEvent = this.getEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);

    this.state = {
      currentEvent: {
        id: null,
        name: "",
        location: "",
        date: "",
        description: ""
      },
      message: ""
    };

  }

  componentDidMount() {
    this.getEvent(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentEvent: {
          ...prevState.currentEvent,
          name: name
        }
      };
    });
  }

  onChangeLocation(e) {
    const location = e.target.value;
    
    this.setState(prevState => ({
      currentEvent: {
        ...prevState.currentEvent,
        location: location
      }
    }));
  }

  onChangeDate(e){
      const date = e.target.value;

      this.setState(prevState => ({
          currentEvent: {
              ...prevState.currentEvent,
              date: date
          }
      }))
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentEvent: {
        ...prevState.currentEvent,
        description: description
      }
    }));
  }

  getEvent(id) {
    EventServices.get(id)
      .then(response => {
        this.setState({
          currentEvent: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteEvent() {  
    // console.log("This was called "+this.props.match.params.id);  
    EventServices.delete(this.props.match.params.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/events')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const {currentEvent} = this.state;

    return(
        <div>
            {currentEvent ? (
          <div className="edit-form">
            <h4>Event</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentEvent.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  value={currentEvent.location}
                  onChange={this.onChangeLocation}
                />
              </div>
              <div>
                  <label htmlFor="date">Date</label>
                  <input
                    type="text"
                    className="form-control"
                    id="date"
                    onChange={this.onChangeDate}
                    value={currentEvent.date}
                  />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentEvent.description}
                  onChange={this.onChangeDescription}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteEvent()}>
              Delete
            </button>

          </div>
        ) : (
          <div>
            <br />
            <p>Please select an Event...</p>
          </div>
        )}
        </div>
    );
  }
}