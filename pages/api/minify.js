import { minify } from 'html-minifier';

export default async (req, res) => {
  try {
    const minifiedHtml = await minify(req.body.html, {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
    });
    res.statusCode = 200;
    res.json({ html: minifiedHtml });
  } catch (err) {
    res.statusCode = 500;
    throw err;
  }
}