import * as forge from "node-forge"
import * as fs from "fs"
import { promisify } from 'util'
import * as path from "path"

const rsa = forge.pki.rsa;

function sleep(ms : number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const setup = async (keyProps : { bits : number } = {bits : 2048}, 
    genPropertis : { androidFolder : string, webFolder : string } = {androidFolder : "./Android", webFolder : "./Web"},
    callback? : (status : string, percent : number) => void
) => {
    /**
     * This function will setup the key generator process
     * she will create the new keys one in format for the Android, and one for the 
     * Node Forge PKI 
    */
    if (callback)
        callback("Creating Key Pair for new rsa Keys",10)
    await sleep(1000)
    const keyPair = rsa.generateKeyPair({ bits : keyProps.bits })
    if (callback)
        callback("Creating Pem For Public Key",60)
    await sleep(1000)
    const publicPem = forge.pki.publicKeyToPem(keyPair.publicKey)
    if (callback)
        callback("Creating Pem For Private Key",70)
    await sleep(1000)
    const PrivatePem = forge.pki.privateKeyToPem(keyPair.privateKey)
    if (callback)
        callback("Creating android keys Format",80)
    await sleep(1000)
    const publicPemAndroid = publicPem.replace("-----BEGIN RSA PUBLIC KEY-----","-----BEGIN PUBLIC KEY-----")
    const privatePemAndroid = PrivatePem.replace("-----BEGIN RSA PRIVATE KEY-----","-----BEGIN PRIVATE KEY-----")
    await sleep(1000)
    if (callback)
        callback("Saving Andorid Keys",85)
    
    if(!(await promisify(fs.exists)(genPropertis.androidFolder))){
        await promisify(fs.mkdir)(
            genPropertis.androidFolder
        )
        if (callback)
            callback("Create Android Key Folder",86)
    }

    await sleep(1000)
    await promisify(fs.writeFile)(
        path.join(
            genPropertis.androidFolder,
            "public"
        ),
        publicPemAndroid
    )
    if (callback)
        callback("Saved Public Android Key",88)

    await promisify(fs.writeFile)(
        path.join(
            genPropertis.androidFolder,
            "private"
        ),
        privatePemAndroid
    )

    if (callback)
        callback("Saving Web Keys",90)
    await sleep(1000)
    
    if(!(await promisify(fs.exists)(genPropertis.webFolder))){
        await promisify(fs.mkdir)(
            genPropertis.webFolder
        )
        if (callback)
            callback("Create Web Key Folder",92)
    }

    await promisify(fs.writeFile)(
        path.join(
            genPropertis.webFolder,
            "public"
        ),
        publicPem
    )
    if (callback)
        callback("Saved Public Android Key",93)
    await sleep(1000)

    await promisify(fs.writeFile)(
        path.join(
            genPropertis.webFolder,
            "private"
        ),
        PrivatePem
    )
    if (callback)
        callback("Saved Private Android Key",95)

    
    
    await sleep(1000)
    if (callback)
        callback("Done All Thank For Using",100)
}



interface Config {
    androidFolder?: string;
    webFolder? : string;
    bits?: number;
}

const getConfig = () : Config => {
    if(process.argv.length == 3){
        return {
            androidFolder : process.argv[0],
            webFolder : process.argv[1],
            bits : Number(process.argv[2])
        }
    }
    return {
        androidFolder : undefined,
        webFolder : undefined,
        bits : undefined
    }
}


const config = getConfig()

setup(
    { 
        bits : config.bits ? config.bits : 2048
    },
    {
        androidFolder : config.androidFolder ? config.androidFolder :"./Android",
        webFolder : config.webFolder ? config.webFolder :"./Web"
    },
    (status : string, n : number) => {
        console.clear()
        console.log(status + "     " + n + "%")
    }
)
