import React, { useEffect, useState } from 'react'
import { IPost } from '../../models/test/IPost';
import { postAPI } from '../../services/_bak/PostService';
import PostItem from './PostItem';

const PostContainer = () => {
  const [limit, setLimit] = useState(100);
  const { data: posts, error, isLoading, refetch } = postAPI.useFetchAllPostsQuery(limit, {
    //pollingInterval: 1000
  })
  const [createPost, {}] = postAPI.useCreatePostMutation({
    // selector = some filter
  })
  const [deletePost, {}] = postAPI.useDeletePostMutation()

  useEffect(() => {
    setLimit(3)
  }, [])

  const handleCreate = async () => {
    const title = prompt()
    await createPost({
      title: title,
      body: title
    } as IPost)
  }

  const handleRemove = (post: IPost) => {
    deletePost(post)
  }

  const handleUpdate = (post: IPost) => {
    deletePost(post)
  }

  return (
    <div>
      <div className="posts">
        <button onClick={handleCreate}>handleCreate</button>
        <button onClick={() => refetch()}>refetch</button>
        {isLoading && <h1>загрузка</h1>}
        {error && <h1>ошибка</h1>}
        {posts && posts.map(post =>
          <PostItem remove={handleRemove} update={handleUpdate} key={post.id} post={post} />
        )}
      </div>
    </div>
  )
}

export default PostContainer;