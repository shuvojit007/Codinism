const router = require('express-promise-router')();
const { validateBody, schemas } = require('../helpers/RouteHelpers');
const CertificateController = require('../controllers/certificate');


router.route('/')
 .post(validateBody(schemas.nameSchema),CertificateController.GenerateCertificate)

 
module.exports = router;