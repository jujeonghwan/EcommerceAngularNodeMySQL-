const express = require('express');
const router = express.Router();
const { database } = require('../config/helpers');


/* Get all projects */
router.get('/', (req, res) => {       // Ex. http://localhost:3000/api/project?page=1&limit=5
  
  let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;
  const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 10;   // set limit of items per page
  let startValue;
  let endValue;

  if (page > 0) {
      startValue = (page * limit) - limit;  // 0, 10, 20, 30
      endValue = page * limit;              // 10, 20, 30, 40
  } else {
      startValue = 0;
      endValue = 10;
  }

  database.table('project as p')
    .join([
      {
        table: 'user as u',
        on: 'p.clientUserId = u.userId'
      }
    ])
    .withFields([
      'p.projectId',
      'p.projectName',      
      'p.contactFirstName',
      'p.contactLastName',
      'p.contactEmail',
      'p.contactPhone',
      'p.description',
      'p.businessGoals',
      'p.prerequisites',
      'p.additionalNotes',      
      'p.projectStatus',
      'p.clientUserId',
      'p.created',      
      'p.updated',

      'u.clientName'
    ])
    .slice(startValue, endValue)
    .sort({ projectId: 1})      // 1 (acending) -1 (descending)
    .getAll()                   // get all data
    .then(projects => {
      if (projects.length > 0) {
        res.status(200).json({
          count: projects.length,
          projects: projects
        });
      } else {
        res.json({
          message: 'No projects found'
        });
      }
    })
    .catch(err => console.log(err));

});


/* Get single project */
router.get('/:projectId', (req, res) => {

  const projectId = req.params.projectId;
  console.log(projectId);
  
  database.table('project as p')
    .join([
      {
        table: 'user as u',
        on: 'p.clientUserId = u.userId'
      }
    ])
    .withFields([
      'p.projectId',
      'p.projectName',
      'p.projectStatus',
      'u.userId',
      'u.clientName'
    ])
    .filter({ 'p.projectId': projectId })
    .get()                      // get single data
    .then(project => {
      if (project) {
        res.status(200).json({
          project
        });
      } else {
        res.json({
          message: `No project found with projectId ${projectId}`
        });
      }
    })
    .catch(err => console.log(err));
  
});

module.exports = router;