import { createApp } from './app'

createApp()
  .then(app => {
    app.listen(4000, () => console.log('server on port 4000'))
  })
  .catch(e => console.log('something went wrong', e))
