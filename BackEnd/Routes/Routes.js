import express from "express";
import { GetAllUser, GetUserById, MSGToAll, NewMSG, PostNewUser, UpdateReview, UpdateUserById } from "../Controller/UserController.js";
import { DeleteBook, GetAllBooks, GetBookById, GetReccomendedBooks, NewBook, UpdateBookData, UpdateRevInBook } from "../Controller/BookController.js";
import { getAllShowCase, RemoveShowCase } from "../Controller/ShowCaseController.js";
import { AddForShowCase } from "../../FrontEnd/src/assets/Json Related Things/JSONAPI.js";

const router = express.Router();

router.post("/UserDatas/InsertNew",PostNewUser);
router.get("/UserDatas/GetAll",GetAllUser);
router.get("/UserDatas/GetById/:id",GetUserById);
router.put("/UserDatas/UpdateById/:id",UpdateUserById);
// router.put("/UserDatas/UpdateById/Review/:id",UpdateReview);
router.put("/UserDatas/MsgToAll",MSGToAll);
router.put("/UserDatas/MsgById/:id",NewMSG);


/****************************************************************************************/


router.post("/BookDatas/InsertNew",NewBook);
router.get("/BookDatas/GetAll",GetAllBooks);
router.get("/BookDatas/GetById/:id",GetBookById);
router.post("/BookDatas/GetRecommdBooks",GetReccomendedBooks);
router.put("/BookDatas/UpdateById/:id",UpdateBookData);
// router.put("/BookDatas/UpdateById/Review/:id",UpdateRevInBook);
router.delete("/BookDatas/DeleteById/:id",DeleteBook);


/****************************************************************************************/


router.get("/BookShowCase/GetAll",getAllShowCase);
router.post("/BookShowCase/InsertNew:id",AddForShowCase);
router.delete("/BookShowCase/Remove:id",RemoveShowCase);


export default router;