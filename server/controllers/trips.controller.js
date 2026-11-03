import * as tripModel from '../models/trip.model.js'
import { optionalText, requireDate, requiredText } from '../utils/validate.js'

export async function listTrips(req, res, next) {
  try {
    const trips = await tripModel.findAllTrips()
    res.json(trips)
  } catch (error) {
    next(error)
  }
}

export async function getTripById(req, res, next) {
  try {
    const id = Number(req.params.id)

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({ error: 'Invalid trip id' })
    }

    const trip = await tripModel.findTripById(id)

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' })
    }

    res.json(trip)
  } catch (error) {
    next(error)
  }
}

export async function createTrip(req, res, next) {
  try {
    const destination = requiredText(req.body.destination, 'Destination', 120)
    const departureCity = requiredText(req.body.departureCity, 'Departure city', 120)
    const startDate = requireDate(req.body.startDate, 'Departure date')
    const endDate = requireDate(req.body.endDate, 'Return date')
    const budget = requiredText(req.body.budget, 'Budget', 40)
    const travelStyle = requiredText(req.body.travelStyle, 'Travel style', 40)
    const blurb = requiredText(req.body.blurb, 'Trip description', 1000)
    const itinerary = optionalText(req.body.itinerary, 'Itinerary', 2000)

    if (endDate < startDate) {
      return res.status(400).json({ error: 'Return date must be on or after the departure date' })
    }

    const trip = await tripModel.createTrip({
      destination,
      departureCity,
      startDate,
      endDate,
      budget,
      travelStyle,
      hostName: req.user.firstName,
      hostUserId: req.user.id,
      blurb,
      itinerary,
    })

    res.status(201).json(trip)
  } catch (error) {
    next(error)
  }
}