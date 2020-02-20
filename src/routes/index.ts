import express from "express";
const router = express.Router();
import {Response, Request, NextFunction} from "express";
const fs = require("fs");
import {FileService} from "../services/FileService"

const fileService = new FileService();

router.get('/api/v1/download/:token', async function (req: Request, res: Response, next: NextFunction) {
  const token = req.params.token;
  const fileInfo = await fileService.getFileInfoFromToken(token);
  if (fileInfo.error) {
    return res.status(400).json({error: fileInfo.error})
  }
  const stream = fs.createReadStream(fileInfo.filePath);
  res.setHeader("content-disposition", "attachment; filename=" + fileInfo.fileName);
  stream.on('error', function (e: Error) {
    return res.status(500).end('Internal Server Error')
  }).pipe(res)
});

export {router};

