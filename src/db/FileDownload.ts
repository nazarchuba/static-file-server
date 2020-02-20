import {sequelize} from "./connection"
const Sequelize = require('sequelize');

const FileDownload = sequelize.define('filedownload', {
  // attributes
  filePath: {
    type: Sequelize.STRING,
    allowNull: false
  },
  fileName: {
    type: Sequelize.STRING
  }
}, {
  // options
});
FileDownload.sync({ force: false }).then(()=>{

});
export {FileDownload}