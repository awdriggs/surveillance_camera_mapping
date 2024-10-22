import path from 'path';
import { fileURLToPath } from 'url';

// Needed to handle ES module paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Controller to serve the home page
export const getHome = (req, res) => {
  const filePath = path.join(__dirname, '../public/index.html');
  res.sendFile(filePath); // Serve the HTML file
};

