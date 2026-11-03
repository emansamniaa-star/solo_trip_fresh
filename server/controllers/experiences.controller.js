

import * as experienceModel from '../models/experience.model.js'
import { requiredText } from '../utils/validate.js'

export async function listExperiences(req, res, next) {
  try {
    const stories = await experienceModel.findAllExperiences()
    res.json(stories)
  } catch (error) {
    next(error)
  }
}

export async function getExperienceById(req, res, next) {
  try {
    const id = Number(req.params.id)
    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({ error: 'Invalid experience id' })
    }

    const story = await experienceModel.findExperienceById(id)
    if (!story) {
      return res.status(404).json({ error: 'Experience not found' })
    }

    res.json(story)
  } catch (error) {
    next(error)
  }
}

export async function createExperience(req, res, next) {
  try {
    const story = await experienceModel.createExperience({
      title: requiredText(req.body.title, 'Title', 140),
      place: requiredText(req.body.place, 'Place', 120),
      excerpt: requiredText(req.body.excerpt, 'Excerpt', 280),
      tag: requiredText(req.body.tag, 'Tag', 40),
      body: requiredText(req.body.body, 'Story', 4000),
      author: req.user.firstName,
      authorUserId: req.user.id,
    })

    res.status(201).json(story)
  } catch (error) {
    next(error)
  }
}