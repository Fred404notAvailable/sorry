import Jimp from 'jimp';

async function processImage(path) {
  try {
    const image = await Jimp.read(path);
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      
      // If the pixel is very close to white
      if (r > 240 && g > 240 && b > 240) {
        const minColor = Math.min(r, g, b);
        let alpha = 0;
        
        // Anti-aliasing threshold
        if (minColor <= 250) {
          alpha = (250 - minColor) * 12; // Gradual alpha scale
        }
        
        this.bitmap.data[idx + 3] = alpha > 255 ? 255 : (alpha < 0 ? 0 : alpha);
      }
    });
    await image.writeAsync(path);
    console.log(`Processed ${path}`);
  } catch (err) {
    console.error(err);
  }
}

processImage('public/images/flower-tl.png');
processImage('public/images/flower-br.png');
