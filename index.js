require('dotenv').config()
let Client = require('ssh2-sftp-client');
const { asyncGcpUpload } = require('./gcp.js');


const main = async ()=>{
    const client = new Client()
    try {
        const options={
            host: process.env.SFTP_HOST,
            port: process.env.SFTP_PORT,
            username: process.env.SFTP_USERNAME,
            password: process.env.SFTP_PASSWORD
        }
        await client.connect(options)
        console.log(`Conected OK to ${options.username}@${options.host}:${options.port}`)

        const path=process.env.SFTP_PATH
        const pathBkp=process.env.SFTP_PATH_BKP

        let fileObjects
        try {
            console.log(`Searching in ${path} filter: ${process.env.SFTP_FILTER}`);
            fileObjects = await client.list(path,process.env.SFTP_FILTER)

            let i=0
            for (let i=0;i<fileObjects.length;i++){
                const file =fileObjects[i]
                await client.rename(path+ "/"+ file.name, path + "/tmp_"+ file.name)
                //Dowload file
                console.log(`Mark ${file.name}`);
                //Process file
                await client.get(path + "/tmp_"+ file.name, "./files/" + file.name)
                await asyncGcpUpload("./files/" , file.name)
                //Move to backup
                await client.rename(path+ "/tmp_"+ file.name, pathBkp + "/"+ file.name)
                console.log(`File ${file.name} moved top ${pathBkp}`)
            }
        } catch (err) {
            console.log('Listing failed:', err)
        }
        await client.end();
        console.log('Disconected ok')

    } catch (err) {
        console.log('Failed to connect/disconect:', err)
    }
}

main()
