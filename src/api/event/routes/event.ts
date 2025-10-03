/**
 * event router
 */

module.exports = {
  routes: [
    // Core routes
    {
      method: 'GET',
      path: '/events',
      handler: 'event.find',
      config: {
        policies: [],
      },
    },
    {
      method: 'GET',
      path: '/events/:id',
      handler: 'event.findOne',
      config: {
        policies: [],
      },
    },
    {
      method: 'POST',
      path: '/events',
      handler: 'event.create',
      config: {
        policies: [], // Or whatever policy you want for creation
      },
    },
    // Custom routes
    {
      method: 'PUT',
      path: '/events/:id',
      handler: 'event.update',
      config: {
        policies: ['global::is-event-owner'],
      },
    },
    {
      method: 'DELETE',
      path: '/events/:id',
      handler: 'event.deleteEvent',
      config: {
        policies: ['global::is-event-owner'],
      },
    },
    {
      method: 'POST',
      path: '/events/:id/attend',
      handler: 'event.attend',
      config: {
        policies: ['global::check-attendance'],
      },
    },
  ],
}
