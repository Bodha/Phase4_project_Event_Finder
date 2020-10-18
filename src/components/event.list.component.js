import React, { Component } from "react";
import EventServices from "../services/event.service";
import { Link } from "react-router-dom";

export default class EventList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveEvents = this.retrieveEvents.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveList = this.setActiveList.bind(this);
    this.removeAllEvents = this.removeAllEvents.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      events: [],
      currentEvent: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveEvents();
  }

  onChangeSearchName(n) {
    const searchName = n.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveEvents() {
    EventServices.getAll()
      .then(response => {
        this.setState({
          events: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveEvents();
    this.setState({
      currentEvent: null,
      currentIndex: -1
    });
  }

  setActiveList(event, index) {
    this.setState({
      currentEvent: event,
      currentIndex: index
    });
  }

  removeAllEvents() {
    EventServices.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchName() {
    EventServices.searchByName(this.state.searchName)
      .then(response => {
        this.setState({
          events: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
      const {searchName, events, currentEvent, currentIndex} = this.state;
    return(
        <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Event List</h4>

          <ul className="list-group">
            {events &&
              events.map((event, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveList(event, index)}
                  key={index}
                >
                  {event.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllEvents}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentEvent ? (
            <div>
              <h4>Event</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentEvent.name}
              </div>
              <div>
                <label>
                  <strong>Location:</strong>
                </label>{" "}
                {currentEvent.location}
              </div>
              <div>
                  <label>
                      <strong>Date</strong>
                  </label>{" "}
                  {currentEvent.date}
              </div>    
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentEvent.description}
              </div>

              <Link
                to={"/events/" + currentEvent._id}
                className="badge badge-warning"
              >
                Delete
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please select an Event...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}