import multer from "multer";

const customeStorage = multer.memoryStorage();

export const upload = multer({
  storage: customeStorage,
});
