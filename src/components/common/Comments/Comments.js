import React from "react";

import "./styles.scss";

import {replaceTag} from "../../../services/utils/utils";
import CommentsList from "./CommentsList/CommentsList";
import CommentsForm from "./CommentsForm/CommentsForm";


const Comments = (props) => {
  const {size, colorTheme, control, imageAvatar, person, personAction, text, customTagName} = props;

  const CustomTag = replaceTag(`div`, customTagName);

  return (
    <CustomTag className="comments"
               data-size={size}
               data-color-theme={colorTheme}
    >
      <CommentsList imageAvatar={imageAvatar}
                    person={person}
                    personAction={personAction}
                    text={text}
                    control

      />

      <CommentsForm imageAvatar={imageAvatar}/>

    </CustomTag>
  )
};


export default Comments;
