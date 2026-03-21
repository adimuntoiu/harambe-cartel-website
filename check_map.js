import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  page.on('console', msg => {
      console.log(`[${msg.type()}] ${msg.text()}`);
  });
  
  page.on('pageerror', error => {
      console.log(`[PAGE ERROR] ${error.message}`);
  });
  
  try {
      const response = await page.goto('http://localhost:5173/map', { waitUntil: 'networkidle0', timeout: 15000 });
      console.log("HTTP STATUS:", response.status());
      
      const html = await page.content();
      console.log("HTML START -->", html.substring(0, 500), "<-- HTML END");
      
      const mapHtml = await page.evaluate(() => {
          const el = document.getElementById('map');
          if (!el) return "NO_MAP_ELEMENT";
          return el.innerHTML;
      });
      
      console.log("MAP_HTML_LENGTH:", mapHtml.length);
      if (mapHtml.length < 200) {
          console.log("MAP_HTML_PREVIEW:", mapHtml);
      }
      
      const markers = await page.evaluate(() => {
          return document.querySelectorAll('.leaflet-marker-icon').length;
      });
      console.log("MARKERS_COUNT:", markers);
      
  } catch(e) {
      console.log("Error:", e.message);
  }
  
  await browser.close();
})();
