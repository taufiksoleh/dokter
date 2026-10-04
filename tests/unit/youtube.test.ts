import assert from 'node:assert/strict'
import { test } from 'node:test'
import { getLatestVideos, parseYouTubeFeed } from '../../src/lib/youtube'

const feed = `<feed>
  <title>Channel</title>
  <entry><yt:videoId>abc123</yt:videoId><title>Nyeri &amp; kesemutan</title></entry>
  <entry><yt:videoId>def456</yt:videoId><title>Skoliosis</title></entry>
</feed>`

test('membaca video dari RSS channel', () => {
  assert.deepEqual(parseYouTubeFeed(feed), [
    {
      title: 'Nyeri & kesemutan',
      youtubeId: 'abc123',
      url: 'https://www.youtube.com/watch?v=abc123',
    },
    { title: 'Skoliosis', youtubeId: 'def456', url: 'https://www.youtube.com/watch?v=def456' },
  ])
})

test('tanpa channel, video pilihan dari konten yang dipakai', async () => {
  const fallback = [
    { title: 'A', url: 'https://www.youtube.com/' },
    { title: 'B', url: 'https://www.youtube.com/' },
  ]
  assert.deepEqual(await getLatestVideos(undefined, fallback, 1), [fallback[0]])
})
