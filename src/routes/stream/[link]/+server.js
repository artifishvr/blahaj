import ytdl from 'ytdl-core';
import { ReadableStream } from 'web-streams-polyfill';

export async function GET({ params }) {
    const info = await ytdl.getInfo(params.link);
    const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
    if (!format) {
        return Response('No suitable format found');
    }

    const audioStream = ytdl.downloadFromInfo(info, { format: format });
    const readableStream = new ReadableStream({
        start(controller) {
            audioStream.on('data', chunk => controller.enqueue(chunk));
            audioStream.on('end', () => controller.close());
            audioStream.on('error', err => controller.error(err));
        }
    });

    return new Response(readableStream, {
        headers: {
            'Content-Type': 'audio/mpeg',
            'Content-Disposition': 'attachment; filename="audio.mp3"'
        }
    });
};