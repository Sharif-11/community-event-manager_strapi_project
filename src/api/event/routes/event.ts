/**
 * event router
 */

import { factories } from '@strapi/strapi'

module.exports = {
  routes: [
    // ... other routes like find, findOne ...
    {
      method: 'PUT',
      path: '/events/:id',
      handler: 'event.update',
      config: {
        policies: ['global::is-event-owner'], // Only event owners can update events
      },
    },
    // delete event route with is-event-owner policy
    {
      method: 'DELETE',
      path: '/events/:id',
      handler: 'event.deleteEvent',
      config: {
        policies: ['global::is-event-owner'], // Only event owners can delete events
      },
    },
    // attend event route without any policy

    {
      method: 'POST',
      path: '/events/:id/attend',
      handler: 'event.attend',
      config: {
        policies: [
          'global::check-attendance', // Ensure user is authenticated
        ], // No policy, any authenticated user can attend
      },
    },
    {
      method: 'GET',
      path: '/events',
      handler: 'event.find',
      config: {
        policies: [],
      },
    },
  ],
}

export default factories.createCoreRouter('api::event.event')
