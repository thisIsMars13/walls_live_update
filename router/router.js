const express = require('express');
const router = express.Router();
const auth = require('../controllers/authentication_controller');
const landing = require('../controllers/landing_controller');
const wall = require('../controllers/wall_controller');
const { viewDashAdmin, addNew, editAdmin } = require('../controllers/dash_admin_controller')
const { viewDash } = require('../controllers/dash_normal_controller')
const { editProfile } = require('../controllers/users_normal_controller')
const { onLanding, onDashboard, isADmin, isNormal } = require('../util/middleware')

router.get('/', onLanding, landing.landing);
router.get('/signin', onLanding, landing.sign_in);
router.get('/register', onLanding, landing.register);


router.get('/logout', onDashboard, landing.logout);
router.get('/dashboard', onDashboard, isNormal, viewDash);


router.get('/dashboard/admin', onDashboard, isADmin, viewDashAdmin);
router.get('/users/new', onDashboard, isADmin, addNew);
router.get('/users/edit/:id', onDashboard, isADmin, editAdmin);

router.get('/users/edit', onDashboard, editProfile);
router.get('/users/show/:id', onDashboard, wall.show);

router.post('/register', auth.register_user);
router.post('/signin', auth.signin);

router.post('/users/edit_info', onDashboard, isNormal, auth.editInfo);
router.post('/users/edit_password', onDashboard, isNormal, auth.editPassword);
router.post('/users/edit_description', onDashboard, isNormal, auth.editDescription);

router.post('/messages/leave_message/:id', onDashboard, wall.leaveMessage);
router.post('/messages/leave_comment/:message_id', onDashboard, wall.leaveComment);

router.post('/users/add_new', onDashboard, isADmin, auth.addUser);
router.post('/users/edit_info/:id', onDashboard, isADmin, auth.editInfoAdmin)
router.post('/users/edit_password/:id', onDashboard, isADmin, auth.editPasswordAdmin)



module.exports = router;