import * as jwt from "jsonwebtoken";
import {JWT_SECRET, BATH_PATH} from "../utils/secrets"
import path from "path";
import {sequelize, FileDownload} from "../db"

export class FileService {
  async createDownloadLink (filePath: string, fileName?: string) {
    const name = fileName ? fileName : getFileNameFromPath(filePath);
    let data = await FileDownload.create({
      filePath: filePath,
      fileName: name
    });
    const downloadId = data.get('id');
    const token = jwt.sign({filePath, fileName: name, id: downloadId}, JWT_SECRET, {
      expiresIn: '5y'
    });

    return `${BATH_PATH}/api/v1/download/${token}`;
  }

  async getFileInfoFromToken (token: string): Promise<{ filePath?: string, fileName?: string, id?: number, error?: string }> {
    let decoded = null;
    if (!token) {
      return {error: 'BAD_TOKEN'};
    }
    try {
      decoded = jwt.verify(token, JWT_SECRET) as { filePath: string, fileName: string, id: number }
    } catch (err) {
      return {error: 'BAD_TOKEN'};
    }
    let fileDownload = await FileDownload.findOne({where: {id: decoded['id']}});
    if (fileDownload) {
      return decoded;

    } else {
      return {error: 'DOWNLOAD_EXPIRED'};

    }
  }
  async removeFileDownload(id:number){
    return await FileDownload.destroy({where:{id:id}})
  }

}

function getFileNameFromPath (path: string) {
  const filename = path.replace(/^.*[\\\/]/, '')
  return filename;
}

async function createTestFileDownload () {
  let directory: string | string[] = __dirname + "";
  directory = directory.split(path.sep);
  directory.pop();
  directory.pop();
  directory = directory.join(path.sep) + path.sep;

  console.log(await  new FileService().createDownloadLink(`${directory}\\src\\app.ts`))

}

setTimeout(createTestFileDownload, 2000)



