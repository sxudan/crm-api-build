"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRoutes = void 0;
const express_1 = require("express");
// import { updateProfile } from "../controllers/profileController";
exports.profileRoutes = (0, express_1.Router)();
// profileRoutes.put('/', async (req, res, next) => {
//   try {
//     const { uid, firstname, lastname, phone, dob } = req.body;
//     const user = await updateProfile(uid, { firstname, lastname, phone, dob });
//     res.status(200).json({ success: true, data: user });
//   } catch (e) {
//     next(e);
//   }
// });
