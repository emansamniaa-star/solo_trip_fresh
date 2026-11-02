import * as tripModel from '../models/trip.model.js'

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
    const {
      destination,
      departureCity,
      startDate,
      endDate,
      budget,
      travelStyle,
      hostName,
      blurb,
      itinerary = '',
    } = req.body

    if (
      !destination ||
      !departureCity ||
      !startDate ||
      !endDate ||
      !budget ||
      !travelStyle ||
      !hostName ||
      !blurb
    ) {
      return res.status(400).json({ error: 'Missing required trip fields' })
    }

    const trip = await tripModel.createTrip({
      destination,
      departureCity,
      startDate,
      endDate,
      budget,
      travelStyle,
      hostName,
      blurb,
      itinerary,
    })

    res.status(201).json(trip)
  } catch (error) {
    next(error)
  }
}