/**
 * event controller
 */

const attend = async ctx => {
  console.log(ctx)
  const eventId = ctx.params.id
  const userId = ctx.state.user.id

  // Fetch the event to ensure it exists
  const event = (await strapi.entityService.findOne('api::event.event', eventId, {
    populate: { attendees: true },
  })) as any

  if (!event) {
    return ctx.throw(404, 'Event not found')
  }
  // Check if the user is already an attendee
  const isAlreadyAttending = event.attendees?.some(attendee => attendee.id === userId)
  if (isAlreadyAttending) {
    return ctx.throw(400, 'User is already attending this event')
  }
  ctx.send({ message: 'User is now attending the event' })
}
const find = async ctx => {
  const events = await strapi.entityService.findMany('api::event.event', {
    populate: { organizer: true, attendees: true },
  })
  ctx.send(events)
}
const findOne = async ctx => {
  const eventId = ctx.params.id
  const event = await strapi.entityService.findOne('api::event.event', eventId, {
    populate: { organizer: true, attendees: true },
  })
  if (!event) {
    return ctx.throw(404, 'Event not found')
  }
  ctx.send(event)
}
const create = async ctx => {
  const createBody = ctx.request.body
  const currentUserId = ctx.state.user.id
  const newEvent = await strapi.entityService.create('api::event.event', {
    data: { ...createBody, organizer: currentUserId },
    populate: { organizer: true, attendees: true },
  })
  ctx.send(newEvent)
}

const update = async ctx => {
  const updateBody = ctx.request.body
  const eventId = ctx.params.id
  const updatedEvent = await strapi.entityService.update('api::event.event', eventId, {
    data: updateBody,
    populate: { organizer: true, attendees: true },
  })
  ctx.send(updatedEvent)
}
const deleteEvent = async ctx => {
  const eventId = ctx.params.id
  const currentUserId = ctx.state.user.id
  console.log({ eventId, currentUserId })

  // Use strapi.query to find the event and its organizer
  const event = await strapi.query('api::event.event').findOne({
    where: { id: eventId },
    populate: { organizer: true },
  })

  if (!event) {
    return ctx.throw(404, 'Event not found')
  }

  // Uncomment to check authorization
  if (event.organizer.id !== currentUserId) {
    return ctx.throw(403, 'You are not authorized to delete this event')
  }

  await strapi.query('api::event.event').delete({ where: { id: eventId } })
  ctx.send({ message: 'Event deleted successfully' })
}

module.exports = { attend, find, update, deleteEvent, findOne, create }

// export default factories.createCoreController('api::event.event')
