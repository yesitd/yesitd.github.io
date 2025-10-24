// colorize.js — extrae color promedio de imagen local y actualiza variables CSS
document.addEventListener('DOMContentLoaded', () => {
  const imgPath = 'imagenes/sin.png';
  const img = new Image();
  img.src = imgPath;
  // No crossOrigin: local file

  img.addEventListener('load', () => {
    try {
      const w = 50; const h = 50;
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext('2d');
      // Draw scaled image to reduce samples
      ctx.drawImage(img, 0, 0, w, h);
      const data = ctx.getImageData(0, 0, w, h).data;
      let r=0,g=0,b=0,count=0;
      for (let i=0;i<data.length;i+=4){
        const alpha = data[i+3];
        if (alpha===0) continue;
        r += data[i]; g += data[i+1]; b += data[i+2]; count++;
      }
      if (count===0) return;
      r = Math.round(r/count); g = Math.round(g/count); b = Math.round(b/count);
      const accent = rgbToHex(r,g,b);
      const accent2 = rgbToHex(...darken([r,g,b], 18));

      // set CSS variables
      const doc = document.documentElement;
      doc.style.setProperty('--accent', accent);
      doc.style.setProperty('--accent-2', accent2);
      doc.style.setProperty('--bg-1', `linear-gradient(135deg, ${accent} 0%, ${accent2} 100%)`);

      // Optional: update buttons that used previous class backgrounds
      // (Most styles rely on --bg-1 and --accent variables already.)
    } catch (e) {
      console.warn('colorize: error procesando la imagen', e);
    }
  });

  img.addEventListener('error', (e) => {
    console.warn('colorize: no se pudo cargar la imagen', imgPath, e);
  });

  function componentToHex(c){
    const hex = c.toString(16);
    return hex.length==1 ? '0'+hex : hex;
  }
  function rgbToHex(r,g,b){ return '#'+componentToHex(r)+componentToHex(g)+componentToHex(b); }
  function darken([r,g,b], pct){
    const f = 1 - (pct/100);
    return [clamp(Math.round(r*f)), clamp(Math.round(g*f)), clamp(Math.round(b*f))];
  }
  function clamp(v){ return Math.max(0, Math.min(255, v)); }
});
