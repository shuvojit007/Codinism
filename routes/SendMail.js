const router = require('express-promise-router')();

const MailController = require('../controllers/SendMailtoUser');
const { validateBody, schemas } = require('../helpers/RouteHelpers');

router.route('/')
 .post(validateBody(schemas.emailSchema),MailController.SendMailtoUser)

 
module.exports = router;