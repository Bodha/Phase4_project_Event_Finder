const db = require("../models");
const Event = db.events;

exports.create = (req, res) => {
    if(!req.body.name){
        res.status(400).send({message:"Event name is not mentioned!!"});
        return;
    }

    const event = new Event({
        name : req.body.name,
        location : req.body.location,
        date : req.body.date,
        description : req.body.description
    });

    event.save(event)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occured during event creation!!"
        });
    });
};

exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    Event.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Events!!"
      });
    });
};

exports.findById = (req, res) => {
    const id = req.params.id;

  Event.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "No event found with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error occured during fetching event with id : " + id });
    });

    // const id = req.param.id;

    // Event.findById(id)
    // .then(data => {
    //     if(data){
    //         res.send(data);
    //     }else{
    //         res.status(404).send({message:"No event found with id : " + id});
    //     }
    // })
    // .catch(err => {
    //     res.status(500)
    //     .send({message : "Error occured during fetching event with id : " + id});
    // });
};

// exports.findByName = (req, res) => {
//     const nam = req.query.name;
    
//     Event.find({name : new RegExp(nam, 'i')})
//     .then(data => {
//         res.send(data);
//     })
//     .catch(err => {
//         res.status(500).send({
//             message : 
//             err.message || "Some error occurred during reteival of events!!" 
//         });
//     });
// };

exports.deleteById = (req, res) => {
    const id = req.params.id;
    
    Event.findByIdAndRemove(id)
    .then( data => {
        if(!data){
            res.status(404).send({
                message : "Event with id : "+ id + " cannot be deleted because no such event found!!"
            })
        }else{
            res.send({
                message : "Successfully deleted Event with id : " + id
            });
        };
    })
    .catch(err => {
        res.status(500).send({
            message : "Could not delete Event with id : " + id
        });
    });
};

exports.deleteAll = (req, res) => {
    Event.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} All Events were successfully deleted!!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred during removal of events!!"
      });
    });
};
