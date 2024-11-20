import express from "express";

const router = express.Router();

router.post('/login',);
router.post('/signup',);
router.put('/rest-password',);
router.put('/logout',);
router.get('/profile',);
router.put('/update-profile',);
router.delete('/delete-account');

router.get('/check-restaurant');


export {router as restaurantRouter}