import React, { Component } from "react";
import EventServices from "../services/event.service";

export default class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveEvent = this.saveEvent.bind(this);
    this.newEvent = this.newEvent.bind(this);

    this.state = {
      id: null,
      name: "",
      location: "",
      date: "",
      description: "",

      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeLocation(e) {
    this.setState({
      location: e.target.value
    });
  }

  onChangeDate(e){
      this.setState({
          date: e.target.value
      });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveEvent() {
    var data = {
      name: this.state.name,
      location: this.state.location,
      date: this.state.date,
      description: this.state.description
    };

    EventServices.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          location: response.data.location,
          date: response.data.date,
          description: response.data.description,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newEvent() {
    this.setState({
      id: null,
      name: "",
      location: "",
      date: "",
      description: "",

      submitted: false
    });
  }

  render(){
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>Event submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newEvent}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  value={this.state.name}
                  onChange={this.onChangeName}
                  name="name"
                />
              </div>

              <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <input 
                    type="text"
                    className="form-control"
                    id="location"
                    required
                    value={this.state.location}
                    onChange={this.onChangeLocation}
                    name="location"
                  />
              </div>

              <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input
                    type="text"
                    name="date"
                    onChange={this.onChangeDate}
                    className="form-control"
                    required
                    value={this.state.date}
                    id="date"
                  />
              </div>
  
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  name="description"
                />
              </div>
  
              <button onClick={this.saveEvent} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
  }

}