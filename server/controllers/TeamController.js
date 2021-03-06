import express from 'express'
import TeamService from '../services/TeamService'
import { Authorize } from '../middleware/authorize'

let _service = new TeamService()
let _repo = _service.repository

export default class TeamController {
  constructor() {
    this.router = express.Router()
      .use(Authorize.authenticated)
      .get('', this.getAllTeams)
      .get('/:id', this.getTeamById)
      .get('/user/:id', this.getTeamsByUserId)
      .post('', this.createTeam)
      .put('/:id', this.editTeam) //double check this
      .delete('/:id', this.deleteTeam)
      .use(this.defaultRoute)
  }

  defaultRoute(req, res, next) {
    next({ status: 404, message: 'No such route' })
  }

  async getAllTeams(req, res, next) {
    try {
      let data = await _repo.find({})
      return res.send(data)
    } catch (error) { next(error) }
  }

  async getTeamById(req, res, next) {
    try {
      let data = await _repo.find({ _id: req.params.id })
        .populate({ path: 'users', select: 'name' })
      return res.send(data)
    } catch (error) { next(error) }
  }

  async getTeamsByUserId(req, res, next) {
    try {
      let data = await _repo.find({ users: { $in: [req.session.uid] } })
        .populate("users")
      res.send(data)
    } catch (error) { next(error) }
  }

  async createTeam(req, res, next) {
    try {
      req.body.userId = req.session.uid
      let team = await _repo.create(req.body)
      return res.status(201).send(team)
    } catch (error) { next(error) }
  }

  async editTeam(req, res, next) {
    try {
      let team = await _repo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }) //We will be using push and splice to edit the team array and remember to return new array.  
      //Make sure to return the body of the Array
      return res.send(team)
    } catch (error) { next(error) }
  }

  async deleteTeam(req, res, next) {
    try {
      await _repo.findOneAndRemove({ _id: req.params.id })
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }



}
