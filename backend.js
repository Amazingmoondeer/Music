const express = require('express');
const ytdlp = require('yt-dlp-exec');
const path = require('path');

const app = express();
app.use(express.json());

app.post('/download', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).send('Missing URL');

  try {
    const info = await ytdlp(url, {
      dumpSingleJson: true,
      noWarnings: true,
      preferFreeFormats: true
    });

    const videoUrl = info.url;
    const filename = (info.title || 'track').replace(/[^a-z0-9]/gi, '_') + '.mp3';

    const ffmpegArgs = [
      '-i', videoUrl,
      '-vn', '-ab', '192k',
      '-f', 'mp3',
      'pipe:1'
    ];

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    const cp = ytdlp.exec(videoUrl, { 
      args: ffmpegArgs,
      stdio: ['ignore', 'pipe', 'ignore']
    });
    cp.stdout.pipe(res);
  }
  catch (err) {
    console.error(err);
    res.status(500).send('Download failed');
  }
});

app.listen(4000, () => console.log('Backend running on http://localhost:4000'));

