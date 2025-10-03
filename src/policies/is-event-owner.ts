module.exports = async (policyContext, config, { strapi }) => {
  console.log('Running is-event-owner policy')
  const eventId = policyContext.params.id
  const currentUserId = policyContext.state.user.id
  console.log({ eventId, currentUserId })

  // Use strapi.entityService to find the event and its organizer
  const event = await strapi.entityService.findOne('api::event.event', eventId, {
    populate: { organizer: true },
  })

  // Check if event exists
  if (!event) {
    throw new Error('Event not found') // This will be handled by Strapi's error middleware
  }

  // Check if the current user is the owner
  if (event.organizer.id === currentUserId) {
    return true // Policy passed
  }

  // Policy failed with custom message
  throw new Error('You are not authorized to perform this action')
}
