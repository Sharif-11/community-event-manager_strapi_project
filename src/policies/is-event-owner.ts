module.exports = async (policyContext, config, { strapi }) => {
  console.log('Running is-event-owner policy')
  const eventId = policyContext.params.id
  const currentUserId = policyContext.state.user.id

  // Use strapi.entityService to find the event and its organizer
  const event = await strapi.entityService.findOne('api::event.event', eventId, {
    populate: { organizer: true },
  })

  // Check if the event exists and if the current user is the owner
  if (event && event.organizer.id === currentUserId) {
    return true // Policy passed
  }

  return false // Policy failed, Strapi will automatically send a 403 Forbidden
}
