/* eslint-disable import/named */
import { Router } from 'express';
import BibleController from '../controllers/BibleController';


const router = Router();

const {
  getBibleBook,
  getBibleVerse,
  getBibleChapter,
  getBibleBooks
} = BibleController;

router.get('/book', getBibleBook);
router.get('/book/title', getBibleBooks);

router.get('/book/chapter', getBibleChapter);
router.get('/book/chapter/verse', getBibleVerse);


export default router;
