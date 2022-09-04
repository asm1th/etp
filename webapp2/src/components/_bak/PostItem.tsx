import React, { FC } from 'react'
import { IPost } from '../../models/test/IPost';

interface PostItemProps {
  post: IPost;
  remove: (post: IPost) => void;
  update: (post: IPost) => void;
}

const PostItem: FC<PostItemProps> = ({ post, remove, update }) => {

  return (

    <div className="post">
      {post.id}. {post.title}
      <button onClick={() => remove(post)}>Delete</button>
    </div>

  )
}

export default PostItem;