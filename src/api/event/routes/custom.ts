module.exports = {
  routes: [
    // ... other routes like find, findOne ...
    {
      method: 'PUT',
      path: '/events/:id',
      handler: 'event.update',
      config: {
        policies: ['is-event-owner'], // Policy applied here
      },
    },
    {
      method: 'DELETE',
      path: '/events/:id',
      handler: 'event.delete',
      config: {
        policies: ['is-event-owner'], // Policy applied here too
      },
    },
  ],
}
