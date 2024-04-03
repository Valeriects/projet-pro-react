import fileUpload from "express-fileupload";

const uploadFile = fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // limiter la taille du fichier à 5MB
    uploadTimeout: 60000,
    createParentPath: true, //créé automatiquement le chemin du répertoire spécifié dans .mv(filePathName) 
    useTempFiles : true , 
    tempFileDir: '/temp/',
    abortOnLimit: true,
    responseOnLimit: 'La taille du fichier dépasse la limite de 5MB.',
    
});

export { uploadFile };