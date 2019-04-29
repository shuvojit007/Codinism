const router = require('express-promise-router')();
const { validateBody, schemas } = require('../../helpers/RouteHelpers');
const CertificateController = require('../../controllers/v2/newcertificate');


router.route('/')
    .post(validateBody(schemas.nameSchema),
        CertificateController.generateCertificate);




module.exports = router;