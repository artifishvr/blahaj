import * as Minio from 'minio'
import { v4 as uuidv4 } from 'uuid';


export async function POST({ request }) {
    const data = await request.json();

    const minioClient = new Minio.Client({
        endPoint: '192.168.68.130',
        port: 9000,
        useSSL: false,
        accessKey: 'SqGleGUK0o1GMxviEuCX',
        secretKey: '',
    });

    const response = await fetch("https://co.wuk.sh/api/json", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            url: data.url,
            isAudioOnly: true,
        }),
    });

    const contentDisposition = response.headers.get('Content-Disposition');
    if (contentDisposition) {
        const filename = contentDisposition.split('filename=')[1];
        console.log(filename);
    }


    let etag = "";
    await minioClient.putObject('blahajmusic', uuidv4(), await streamToBuffer(response.body), (err, etag) => {
        if (err) {
            console.error(err);
            return;
        }

        etag
    });
    console.log(thing);
    return new Response("ok");
}

async function streamToBuffer(readableStream) {
    const chunks = [];
    for await (const chunk of readableStream) {
        chunks.push(chunk);
    }
    return Buffer.concat(chunks);
}