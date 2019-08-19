const express = require('express')
const passport = require('passport')
const Board = require('../models/boardModel')
const router = express.Router()

router
  .all('*', passport.authenticate('bearer', { session: false }))
  .get('/', (req, res) => {
    const { type, _id } = req.user
    Board
      .find({ board: _id })
      .then((boards) => {
        res.status(200).json(boards)
      }).catch((err) => {
        res.status(500).json({ message: err.message })
      })
    // } else {
    //   return res.status(400).json({ message: 'Must be logged in as either an employer or a seeker to view boards.' })
  })
  .get('/browse/:category', (req, res) => {
    const { category } = req.user
    Board
      .find({
        category: { $in: allBoards },
        _id: {
          $not: { $in: [...otherCategories, ...filteredCategories] }
        },
        isActive: true
      })
      .populate({ path: 'details', select: 'name description' })
      .then((boards) => {
        res.status(200).json(boards)
      })
      .catch((err) => {
        res.status(500).json({ message: err.message })
      })
  })
  .post('/', (req, res) => {
    const boardId = req.user._id
    const user = req.user
    const data = req.body
    const board = new Board(data)
    board
      .save()
      .then((newBoard) => {
        user.update({ $addToSet: { boards: newBoard._id }, boardCount })
          .then(() => {
            res.status(200).json(newBoard)
          }).catch((err) => {
            res.status(500).json({ message: err.message })
          })
      }).catch((err) => {
        res.status(500).json({ message: err.message })
      })
  })
  .get('/my_boards', (req, res) => {
    const { type } = req.user
    const { submittedBoards } = req.user
    Board.find({ _id: submittedBoards, isActive: true })
      .select('title description').populate('board')
      .then((boards) => {
        res.status(200).json(boards)
      })
      .catch((err) => {
        res.status(500).json({ message: err.message })
      })
    const { matchedBoards } = req.user
    Board.find({ _id: { $in: matchedBoards } })
      .select('-matchedSeekers -likedSeekers')
      .populate('company')
      .then((boards) => {
        res.status(200).json(boards)
      })
      .catch((err) => {
        res.status(500).json({ message: err.message })
      })
    // } else {
    //   res.status(500).json({ message: 'Some thing went wrong when we tried to find boards.' })
    // }
  })
  .get('/by_user/:user_id', (req, res) => {
    const { type, archivedBoards } = req.user
    const { boardsOwner } = req.params
    Board.find({ _id: { $in: boardOwner.boards }, isActive: true })
      .select('boards')
      .populate('board')
      .then((boards) => {
        res.status(200).json(boards)
      })
      .catch((err) => {
        res.status(500).json({ message: err.message })
      })
  })
  .put('/:board_id', (req, res) => {
    const { boardId } = req.params
    if (req.user.boards.indexOf(boardId) === -1) {
      return res.status(401).json({ message: 'You dont own that board' })
    }
    Board.findByIdAndUpdate(boardId, req.body).then(response => res.status(200).json(req.body))
      .catch(err => res.status(500).json({ message: err.message }))
  })
  .delete('/:board_id', (req, res) => {
    const { boardId } = req.params
    if (req.user.boards.indexOf(boardId) === -1) {
      return res.status(401).json({ message: 'You dont own that board' })
    }
    Board.findByIdAndRemove(boardId).then((response) => { res.status(200).json({ boardId }) })
      .catch(err => res.status(401).json({ message: err.message }))
  })

module.exports = router
