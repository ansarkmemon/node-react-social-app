import React, { useState } from 'react'
import { Feed, Card, Icon } from 'semantic-ui-react';
import { getUserImage } from '../../utils/helpers';
import formatDistance from 'date-fns/formatDistance'

const Post = ({ data, createBookmark }) => {
  const [isBookMarked, setBookMark] = useState(false);
  const formattedPostDate = formatDistance(new Date(data.createdAt), new Date(), { addSuffix: true });

  const handleBookmark = () => {
    if (isBookMarked) {
      setBookMark(false);
      // Make api call to destroy bookmark
    } else {
      setBookMark(true);
      createBookmark(data.postId);
    }
  }
  return (
    <Card fluid className="post__container">
      {data.imageUrl && <div className="post__image-container" style={{ backgroundImage: `url(http://localhost:3001/${data.imageUrl})`}} />}
      <Card.Content>
        <Feed className="post__container-header">
          <Feed.Event>
            <Feed.Label image={getUserImage(data.user)} />
            <Feed.Content>
              <Feed.Summary>
                {data.user && data.user.name && <p>{data.user.name}</p>}
                <Feed.Date>{formattedPostDate}</Feed.Date>
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>

          { createBookmark && 
            (isBookMarked ?
              <Icon 
                name="bookmark" 
                className="bookmark-icon" 
                onClick={handleBookmark}
              /> : 
              <Icon 
                name="bookmark outline" 
                className="bookmark-icon" 
                onClick={handleBookmark}
              />
            )}
        </Feed>

        <Card.Description>
          {data.content}
        </Card.Description>
      </Card.Content>
    </Card>
  )
}

export default Post
