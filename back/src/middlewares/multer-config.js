import multer from "multer";
import path from 'path';

import { dateFile } from "../utils/formatDate.js";


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/assets/images');
    },
    filename: (req, file, callback) => {
        // const name = file.originalname.split(' ').join('_');
        // const extension = MIME_TYPES[file.mimetype];
        // callback(null, name + Date.now() + '.' + extension);
        const date = dateFile(Date.now());
        callback(null, date + '_' + file.originalname);
        // callback(null, Date.now() + '-' + file.originalname);
        // callback(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // limiter la taille du fichier à 5MB
    },
    fileFilter: function (req, file, callback) {
        const filetypes = /png|jpg|jpeg/; // extension de fichiers acceptées
        // test permet de vérifier si l'extension du fichier correspond à l'expression régulière
        const isExtnameValid = filetypes.test(
            path.extname(file.originalname).toLowerCase()
        );

        // test permet de vérifier si le type MIME du fichier correspond à l'expression régulière
        const isMimetypeValid = filetypes.test(file.mimetype);

        if (isMimetypeValid && isExtnameValid) {
            // si l'extension et le mimetype sont valides
            // on accepte le fichier
            // null correspond à l'erreur, true correspond à l'acceptation du fichier
            return callback(null, true);
        } else {
            callback("Images en png, jpg ou jpeg uniquement");
        }
    },
}); 

export { upload};