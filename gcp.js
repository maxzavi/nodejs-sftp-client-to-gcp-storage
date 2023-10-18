const { Storage } = require('@google-cloud/storage')

const storage = new Storage({
  keyFilename: process.env.GCP_PATH_KEY,
})

const bucketName = process.env.GCP_BUCKET_NAME
const bucket = storage.bucket(bucketName)

const asyncGcpUpload =  async (path, file)=>{
    await bucket.upload(path +file,{destination: file})
    console.log(`${file} uploaded to ${bucketName}`)
}

module.exports= {
    asyncGcpUpload
}