/**
 * event router
 */

import { factories } from '@strapi/strapi'

module.exports = {
  routes: [
    // ... other routes like find, findOne ...

    {
      method: 'POST',
      path: '/events/:id/attend',
      handler: 'event.attend',
      config: {
        policies: [], // No policy, any authenticated user can attend
      },
    },
    {
      method: 'GET',
      path: '/event',
      handler: 'event.find',
      config: {
        policies: [],
      },
    },
  ],
}

export default factories.createCoreRouter('api::event.event')
