const router = require('express').Router();
const { postMetricValue, getKeyValuesSum } = require('../controllers/metric');

router.post('/:key', postMetricValue);
router.get('/:key/sum', getKeyValuesSum);

module.exports = router;
