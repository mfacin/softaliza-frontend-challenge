import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Calendar, MapPin, Globe, Phone, Mail } from 'react-feather'

import api from '../../services/api'
import { EventTypeEnum, IEvent } from '../../types'
import dateFormater from '../../utils/dateFormater'

const EventDetails: React.FC = () => {
  const { id } = useParams() as { id: string }

  const [event, setEvent] = useState<IEvent>()

  useEffect(() => {
    ;(async () => {
      const response = await api.get(`events/${id}`)
      const eventResponse = response.data as IEvent

      const event = {
        ...eventResponse,
        date: new Date(eventResponse.date),
      }

      setEvent(event)
    })()
  }, [id])

  if (!event) {
    return (
      <div className="page event-details-page">
        <h1>Detalhes do Evento</h1>

        <p>Carregando...</p>
      </div>
    )
  }

  return (
    <div className="page event-details-page">
      <h1>Detalhes do Evento</h1>

      <div className="event-details">
        <h2>{event.title}</h2>

        <div className="date">
          <Calendar />
          <small>
            {dateFormater(event.date)} -{' '}
            {event.type === EventTypeEnum.HYBRID
              ? 'Híbrido'
              : event.type === EventTypeEnum.ONLINE
              ? 'Online'
              : 'Presencial'}
          </small>
        </div>

        <div className="description">
          {event.description.split('\n').map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <address>
          <div className="email">
            <Mail />
            <small>
              <a href={`mailto:${event.email}`}>{event.email}</a>
            </small>
          </div>

          <div className="phone">
            <Phone />
            <small>
              <a href={`tel:${event.phone}`}>{event.phone}</a>
            </small>
          </div>

          {(event.type === EventTypeEnum.PRESENTIAL ||
            event.type === EventTypeEnum.HYBRID) && (
            <div className="local">
              <MapPin />
              <small>
                {event.physicalAddress?.address} - {event.physicalAddress?.city}{' '}
                - {event.physicalAddress?.state}
              </small>
            </div>
          )}

          {(event.type === EventTypeEnum.ONLINE ||
            event.type === EventTypeEnum.HYBRID) && (
            <div className="link">
              <Globe />
              <small>
                <a href={event.onlineAddress || ''}>{event.onlineAddress}</a>
              </small>
            </div>
          )}
        </address>
      </div>
    </div>
  )
}

export default EventDetails