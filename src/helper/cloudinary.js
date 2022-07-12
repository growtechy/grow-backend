const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

const profilePicture = async (route, file, userId) => {
    try {
        const filename = Math.random().toString(16).substr(2, 32);
        const upload = await cloudinary.uploader.upload(
            file,
            {
                public_id: `growng/${route}/${userId}/${filename}`,
                transformation: [
                    { gravity: "face", height: 400, width: 400, crop: "crop" },
                ]
            },
            function (error, result) {
                if (error) console.log(error);

                return result;
            }
        );

        return upload;
    } catch (error) {
        console.log(error);
    }
};
const regularUpload = async (route, file, userId) => {
    try {
        const filename = Math.random().toString(16).substr(2, 32);
        const upload = await cloudinary.uploader.upload(
            file,
            {
                public_id: `growng/${route}/${userId}/${filename}`,

            },
            function (error, result) {
                if (error) console.log(error);

                return result;
            }
        );

        return upload;
    } catch (error) {
        console.log(error);
    }
};

module.exports = { profilePicture, regularUpload };
