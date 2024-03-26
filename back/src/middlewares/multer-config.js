import multer from "multer";

// const MIME_TYPES = {
//   'image/jpg': 'jpg',
//   'image/jpeg': 'jpg',
//   'image/png': 'png'
// };


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, '/assets/images');
    },
    filename: (req, file, callback) => {
        // const name = file.originalname.split(' ').join('_');
        // const extension = MIME_TYPES[file.mimetype];
        // callback(null, name + Date.now() + '.' + extension);
        callback(null, Date.now() + extname(file.originalname));
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
            extname(file.originalname).toLowerCase()
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
}); // src_img est le nom de l'input type file -> attribut name, 10 est le nombre de fichiers acceptés maximum
// }).array("src_img", 10); // src_img est le nom de l'input type file -> attribut name, 10 est le nombre de fichiers acceptés maximum

// const multerStorage = multer({storage: storage}).single('src_img');
// const upload = multer({ storage: storage });

// export {storage, multerStorage};
export {storage, upload};