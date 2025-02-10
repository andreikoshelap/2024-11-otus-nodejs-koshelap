import { createApp } from './app/router';

const PORT = process.env.PORT || 3000;
createApp()
  .then((app) => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((err) => console.error(err));
