module.exports = async (policyContext, config, { strapi }) => {
  console.log('Running check-attendance policy')

  const eventId = policyContext.params.id
  const currentUserId = policyContext.state.user.id

  // Fetch the event to ensure it exists
  const event = await strapi.entityService.findOne('api::event.event', eventId, {
    populate: { attendees: true },
  })
  if (!event) {
    //throw 404 if event not found with message 'Event not found'
    return false
  }

  // Check if the user is already an attendee
  const isAlreadyAttending = event.attendees?.some(attendee => attendee.id === currentUserId)
  console.log({ isAlreadyAttending })
  if (isAlreadyAttending) {
    return false
  }
  // update the event to add the user as an attendee

  return true // Policy passed
}
