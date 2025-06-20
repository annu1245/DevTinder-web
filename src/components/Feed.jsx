import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector(store => store.feed)

  const getFeed = async() => {
    if(feed) return;
    try {
      const feedData = await axios.get(BASE_URL + "user/feed", {withCredentials: true})
      dispatch(addFeed(feedData.data))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getFeed();
  },[])

  if(!feed) return;

  if(feed.length == 0) return (<h1 className='text-center text-xl my-4'>No more Users</h1>)

  return feed && (
    <div className='flex justify-center my-5'>
      <UserCard user={feed[0]}/>
    </div>
  )
}

export default Feed