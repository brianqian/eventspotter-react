const router = require('express').Router();
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

router.get('/calendar', async (req, res) => {
  app.render(req, res, '/calendar');
  // return ssrCache({ req, res, pagePath: '/' })
});

router.get('/library', (req, res) => {
  const actualPage = '/libraryPage';
  // ssrCache({ req, res, pagePath: '/libraryPage' });
  app.render(req, res, actualPage);
});

module.exports = router;
