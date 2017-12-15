var router = require('express').Router();
var EMPLOYEECLASS = require('../mongodb/mongoose_connection');
module.exports = router;

router.get('/', do_homepage);

function do_homepage(req, res) {
  console.log('doing homepage');
  res.render('index');
}

// populate dropdowns, checkboxes etc
// we'll do tomorrow!

// api 

router.get('/api/v4/read', do_read);
router.post('/api/v4/create', do_create);
router.put('/api/v4/update', do_update);
router.delete('/api/v4/delete/:_id', do_delete);

function do_read(request, response) {
  console.log('finding all records');

  EMPLOYEECLASS.find().then(function (results) {
      console.log(results);
      response.json(results);
  });

}

function do_create(request, response) {
  console.log('creating employee');
  console.log(request.body);
  var data = {
    name: request.body.name,
    email: request.body.email,
    gender: request.body.gender,
    avatar: request.body.avatar
  }
  var employee = new EMPLOYEECLASS(data);
  employee.save().then(function (result) {
      console.log(result);
      response.json({message: 'backend saved!'})
  });
}

function do_update(request, response) {
  console.log('updating employee');
  console.log(request.body);

  var update = {
    $set: {
      _id: request.body._id,
      name: request.body.name,
      email: request.body.email,
      gender: request.body.gender,
      avatar: request.body.avatar
    }
  }

  EMPLOYEECLASS.findByIdAndUpdate(request.body._id, update).then(function (result) {
      console.log(result);
      response.json({message: 'backend updated!'})
  });
}

function do_delete(request, response) {
  console.log('deleting employee');
  console.log(request.params._id);

  EMPLOYEECLASS.findByIdAndRemove(request.params._id).then(function (result) {
    console.log(result);
    response.json({message: 'backend deleted!'})
});

}