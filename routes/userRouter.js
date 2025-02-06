const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');


router.post('/user', userCtrl.addUser);
router.get('/user/:uid', userCtrl.getUserInfo);
router.delete('/user/:uid', userCtrl.deleteUser);
router.put('/user/:uid', userCtrl.updateUser);

router.get('/users', userCtrl.getAllUser);



module.exports = router;
