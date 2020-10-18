module.exports = app => {
    const events = require("../controllers/event.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", events.create);
 
    router.get("/", events.findAll);
  
    router.get("/:id", events.findById);

    // router.get("/name/:name", events.findByName);

    router.delete("/:id", events.deleteById);
  
    router.delete("/", events.deleteAll);
  
    app.use('/api/events', router);
  };