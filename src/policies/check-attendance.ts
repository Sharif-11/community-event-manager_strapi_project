module.exports = async (policyContext, config, { strapi }) => {
  console.log('Running check-attendance policy')
  const eventId = policyContext.params.id
  const currentUserId = policyContext.state.user.id
  // Fetch the event to ensure it exists
  const event = await strapi.entityService.findOne('api::event.event', eventId, {
    populate: { attendees: true },
  })
  if (!event) {
    return false // Event not found, policy fails
  }
  // Check if the user is already an attendee
  const isAlreadyAttending = event.attendees?.some(attendee => attendee.id === currentUserId)
  if (isAlreadyAttending) {
    return false // User is already attending, policy fails
  }
  // update the event to add the user as an attendee
  await strapi.entityService.update('api::event.event', eventId, {
    data: {
      attendees: [...(event.attendees || []), currentUserId],
    },
  })

  return true // Policy passed
}
