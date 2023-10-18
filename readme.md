# SFTP whit nodejs using ssh2-sftp-client

Read file from sftp server and move to bucket in GCP storage

Initialize node project:

```cmd
npm init -y
```

## ssh2-sftp-client

Add dependency **ssh2-sftp-client**:

```
npm install ssh2-sftp-client@^8.0.0
```

## dotenv

Add dependency **dotenv**

```cmd
npm i dotenv
```

Create file **.env**  (https://www.npmjs.com/package/dotenv) in root with environments variables:

```properties
#Hostname or IP SFTP server
SFTP_HOST=
#Port of SFTP server
SFTP_PORT=22
#Username of SFTP server
SFTP_USERNAME=
#Password of SFTP server
SFTP_PASSWORD=******
#Path containing the files in  SFTP server
SFTP_PATH=/aba
#Filter the files in  SFTP server
SFTP_FILTER=*.csv
#Path to move processed files
SFTP_PATH_BKP=/abc/bk
#GCP bucket name
GCP_BUCKET_NAME=mybucket
#GCP service account key path
GCP_PATH_KEY=./keys/gcp-key.json
```

## GCP Storage
Add dependency **@google-cloud/storage** :

```cmd
npm i @google-cloud/storage
```

