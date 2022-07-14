import React from "react";

import "./styles.scss";
import CommentsItem from "../CommentsItem/CommentsItem";

const CommentsList = (props) => {
  const {size, colorTheme, imageAvatar, person, personAction, text} = props;

  return (
    <ul className="comments-list"
        data-size={size}
        data-color-theme={colorTheme}
    >

      <li className="comments-list__item">

        <CommentsItem imageAvatar={imageAvatar}
                      person={person}
                      personAction={personAction}
                      text={text}
                      control
        />
      </li>
    </ul>
  )
};


export default CommentsList;
