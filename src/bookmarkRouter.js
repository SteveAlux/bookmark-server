const express = require('express')
const logger = require('./logger')
const bookmarkRouter = express.Router()
const bodyParser = express.json()
const {bookmarks} = require ('./database')

bookmarkRouter
  .route('/bookmarks')
  .get((req,res)=>{
   
    console.log(bookmarks)
    res.json(bookmarks)
  })
  .post(bodyParser,(req,res,)=>{
    //Ask jay about the body structur of the body parser
    const  {name, content} = req.body 
    if (!name){
      logger.error('Name is required')
      return res.status(400).send('Name is not found')
    }
    if (!content){
      logger.error('content is required')
      return res.status(400).send('Content is not found')
    }
    //set id making, should use uuid()
    const id =Math.random()
    //Creating the Bookmark object that will eventually be pushed to the array
    const bookmark = {
      id,
      name,
      content
    }
    bookmarks.push(bookmark)
    logger.info(`Card with id of ${id} created`)
    res.status(201).location(`http://localhost8000/bookmarks/${id}`).json(bookmark)
  })
bookmarkRouter
  .route('/bookmarks/:id')
  .get((req,res)=>{
    let {id} = req.params
    id = Number(id)
    const bookmark = bookmarks.find(b=>b.id === id)
    if (!bookmark){
      logger.error('bookmark not found')
      return res.status(404).send('Bookmark not found')
    }
    res.json(bookmark)
  })
  .delete((req,res)=>{
    let {id} = req.params
    id = Number(id)
    const bookmarkIndex = bookmarks.findIndex(b=>b.id === id)
    if(bookmarkIndex == -1){
      logger.error(`Bookmark with the ${id} could not be found`)
      return res.status(404).send("Not Found")
    }
    console.log(bookmarkIndex)
    bookmarks.splice(bookmarkIndex,1)
    logger.info(`Bookmark with the ${id} has been deleted`)
    res.status(204).end()
  })

    module.exports=  bookmarkRouter;