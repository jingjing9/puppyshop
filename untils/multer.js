var multer = require('multer');
var storage = multer.diskStorage({
    destination:function (req,file,cb) {
        cb(null,'./public/uploade')
    },
    filename:function (req,file,cb) {
        var arr = file.originalname.split('.');
        cb(null,arr[0]+'-'+Date.now()+'.'+arr[1]);
    }
});
var upload = multer({storage:storage});
module.exports = upload;