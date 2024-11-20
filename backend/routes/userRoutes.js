import express from "express";
import {  checkUser, deleteUserAccount, getProfile, logout, profileUpdate, resetPassword, userLogin, userSignup } from "../controllers/userControllers.js";
import { userAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/signup',userSignup);
router.post('/login',userLogin);
router.put('/rest-password',userAuth,resetPassword);
router.put('/logout',userAuth,logout);
router.get('/profile/',userAuth,getProfile);
router.put('/update-profile',userAuth,profileUpdate);
router.delete('/delete-account',userAuth,deleteUserAccount);

router.get('/check-user',userAuth,checkUser);


export {router as userRouter}