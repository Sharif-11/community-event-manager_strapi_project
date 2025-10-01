/**
 * event controller
 */

import { factories } from '@strapi/strapi'
const attend = async ctx => {
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

module.exports = { attend, find }

export default factories.createCoreController('api::event.event')
