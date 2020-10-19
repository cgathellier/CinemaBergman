const express = require('express');
const router = express.Router();
const aws = require('aws-sdk')

// @route           GET /api/sign-s3
// @description     Get s3 credentials
// @access          Public
router.get('/:name/:type', (req, res) => {
    const s3 = new aws.S3();
    const S3_BUCKET = process.env.S3_BUCKET;
    const fileName = req.params.name;
    const fileType = req.params.type;
    console.log(S3_BUCKET);

    const s3Params = {
        Bucket: S3_BUCKET,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if(err){
            console.log(err);
            return res.end();
        }
        const returnData = {
            signedRequest: data,
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
        };
        return res.status(200).json(returnData);
    });
})




module.exports = router;