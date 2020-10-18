import http from "../http-common";

class EventServices {
  getAll() {
    return http.get("/events");
  }

  get(id) {
    return http.get(`/events/${id}`);
  }

  create(data) {
    return http.post("/events", data);
  }

  delete(id) {
    return http.delete(`/events/${id}`);
  }

  deleteAll() {
    return http.delete(`/events`);
  }

  searchByName(name) {
    return http.get(`/events?name=${name}`);
  }
}

export default new EventServices();