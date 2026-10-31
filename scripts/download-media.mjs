import fs from 'fs';
import path from 'path';
import https from 'https';

const MEDIA_DIR = path.join(process.cwd(), 'public', 'media');
if (!fs.existsSync(MEDIA_DIR)) {
  fs.mkdirSync(MEDIA_DIR, { recursive: true });
}

// Curated list of cute puppy photos from Unsplash
const PHOTOS = [
  // Hero arches
  { name: 'hero-1.jpg', url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&h=800&q=80' },
  { name: 'hero-2.jpg', url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&h=800&q=80' },
  { name: 'hero-3.jpg', url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&h=800&q=80' },
  { name: 'hero-4.jpg', url: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=600&h=800&q=80' },
  { name: 'hero-5.jpg', url: 'https://images.unsplash.com/photo-1591160690555-5debfba289f0?auto=format&fit=crop&w=600&h=800&q=80' },
  { name: 'hero-6.jpg', url: 'https://images.unsplash.com/photo-1560743641-3914f4c4b88c?auto=format&fit=crop&w=600&h=800&q=80' },
  { name: 'hero-7.jpg', url: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&h=800&q=80' },

  // Puppies 1-15
  { name: 'pup-1.jpg', url: 'https://images.unsplash.com/photo-1591160690555-5debfba289f0?auto=format&fit=crop&w=700&h=900&q=80' }, // Milo Maltipoo
  { name: 'pup-2.jpg', url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=700&h=900&q=80' }, // Coco Pomeranian
  { name: 'pup-3.jpg', url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=700&h=900&q=80' }, // Teddy Toy Poodle
  { name: 'pup-4.jpg', url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=700&h=900&q=80' }, // Bella Cavapoo
  { name: 'pup-5.jpg', url: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=700&h=900&q=80' }, // Mochi Bichon
  { name: 'pup-6.jpg', url: 'https://images.unsplash.com/photo-1560743641-3914f4c4b88c?auto=format&fit=crop&w=700&h=900&q=80' }, // Luna Yorkie
  { name: 'pup-7.jpg', url: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=700&h=900&q=80' }, // Oliver Shih Tzu
  { name: 'pup-8.jpg', url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=700&h=900&q=80' }, // Biscuit Maltipoo
  { name: 'pup-9.jpg', url: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=700&h=900&q=80' }, // Peanut Pomeranian
  { name: 'pup-10.jpg', url: 'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?auto=format&fit=crop&w=700&h=900&q=80' }, // Daisy Toy Poodle
  { name: 'pup-11.jpg', url: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=700&h=900&q=80' }, // Leo Frenchie
  { name: 'pup-12.jpg', url: 'https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?auto=format&fit=crop&w=700&h=900&q=80' }, // Ruby Cavapoo
  { name: 'pup-13.jpg', url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=700&h=900&q=80' }, // Waffles Maltipoo
  { name: 'pup-14.jpg', url: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&w=700&h=900&q=80' }, // Chloe Pom
  { name: 'pup-15.jpg', url: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=700&h=900&q=80' }, // Archie Poodle

  // Showroom & Import cards
  { name: 'showroom.jpg', url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=900&h=650&q=80' },
  { name: 'import.jpg', url: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=900&h=650&q=80' },

  // Chat collage photos
  { name: 'chat-1.jpg', url: 'https://images.unsplash.com/photo-1591160690555-5debfba289f0?auto=format&fit=crop&w=400&h=400&q=80' },
  { name: 'chat-2.jpg', url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&h=400&q=80' },
  { name: 'chat-3.jpg', url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&h=400&q=80' },
  { name: 'chat-4.jpg', url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=400&h=400&q=80' },

  // Happy families (8 photos)
  { name: 'family-1.jpg', url: 'https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?auto=format&fit=crop&w=600&h=700&q=80' },
  { name: 'family-2.jpg', url: 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?auto=format&fit=crop&w=600&h=700&q=80' },
  { name: 'family-3.jpg', url: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=600&h=700&q=80' },
  { name: 'family-4.jpg', url: 'https://images.unsplash.com/photo-1508948956644-0017e845d09f?auto=format&fit=crop&w=600&h=700&q=80' },
  { name: 'family-5.jpg', url: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&h=700&q=80' },
  { name: 'family-6.jpg', url: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=600&h=700&q=80' },
  { name: 'family-7.jpg', url: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=600&h=700&q=80' },
  { name: 'family-8.jpg', url: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=600&h=700&q=80' },

  // Final CTA peek puppy
  { name: 'welcome-pup.jpg', url: 'https://images.unsplash.com/photo-1591160690555-5debfba289f0?auto=format&fit=crop&w=600&h=700&q=80' },
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        // Handle redirect
        downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => {});
        reject(new Error(`Failed with status: ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log(`Starting download of ${PHOTOS.length} media files into public/media...`);
  let successCount = 0;
  for (const item of PHOTOS) {
    const dest = path.join(MEDIA_DIR, item.name);
    try {
      await downloadFile(item.url, dest);
      console.log(`Downloaded: ${item.name}`);
      successCount++;
    } catch (err) {
      console.warn(`Could not download ${item.name}: ${err.message}. Creating placeholder fallback.`);
      // We will create a fallback if needed
    }
  }
  console.log(`Done! Successfully downloaded ${successCount}/${PHOTOS.length} photos.`);
}

run();

