import multer from "multer";
import path from "path";

const imageStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        let folder = ""

        if(req.baseUrl.includes("admin")) {
            folder = "organizations"
        }else if(req.baseUrl.includes("pets")) {
            folder = "pets"
        }

        cb(null, `uploads/${folder}/`)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

export const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return cb(new Error("Por favor, envie apenas png ou jpg!"))
        }

        cb(null, true)
    }
})