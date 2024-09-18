type FileObject = {
    id: string;
    filename: string;   
    filesize: number;
    uploaddate: Date;
    ownerId: string;
    mimetype: string;
}

export default FileObject;