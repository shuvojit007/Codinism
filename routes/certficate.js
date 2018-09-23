const router = require('express-promise-router')();
const { validateBody,validateParam, schemas } = require('../helpers/RouteHelpers');
const CertificateController = require('../controllers/certificate');


router.route('/')
 .post(validateBody(schemas.postSchema),
 CertificateController.GenerateCertificate
)

 
module.exports = router;