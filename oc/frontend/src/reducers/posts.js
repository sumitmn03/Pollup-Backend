import {
  GET_POSTS,
  ADD_POST,
  INCREMENT_OPTION_COUNT,
  DECREMENT_OPTION_COUNT,
  ADD_COMMENT,
  ADD_REPLY,
  AddSharePoll
} from "../actions/types";

const initialState = {
  posts: []
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: [...action.payload]
      };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload]
      };
    case AddSharePoll:
      return {
        ...state,
        posts: [...state.posts, action.payload]
      };
    case DECREMENT_OPTION_COUNT:
      let {
          decrement_option_result,
          decrement_post_index,
          decrement_option_index
        } = action.payload,
        decrement_selected_post = state.posts[decrement_post_index];
      return {
        ...state,
        // updating the posts
        posts: [
          // keeping post datas before the selected post as it is
          ...state.posts.slice(0, decrement_post_index),

          // updating the count of the option of the selected post
          // **********************************************************
          // **********************************************************

          {
            ...decrement_selected_post,
            options: [
              // keeping options before selected option unchanged
              ...decrement_selected_post.options.slice(
                0,
                decrement_option_index
              ),
              // updating the selected option
              decrement_option_result,
              // keeping options after selected option unchanged

              ...decrement_selected_post.options.slice(
                decrement_option_index + 1
              )
            ],
            option_opted_by_current_user: []
          },

          // **********************************************************
          // **********************************************************
          // updating finished... so keeping all other post datas ater the selected post as it is

          ...state.posts.slice(decrement_post_index + 1)
        ]
      };
    case INCREMENT_OPTION_COUNT:
      let {
          optedby_result,
          increment_option_result,
          increment_post_index,
          increment_option_index
        } = action.payload,
        increment_selected_post = state.posts[increment_post_index];
      return {
        ...state,
        // updating the posts
        posts: [
          // keeping post datas before the selected post as it is
          ...state.posts.slice(0, increment_post_index),

          // updating the count of the option of the selected post
          // **********************************************************
          // **********************************************************

          {
            ...increment_selected_post,
            options: [
              // keeping options before selected option unchanged
              ...increment_selected_post.options.slice(
                0,
                increment_option_index
              ),
              // updating the selected option
              increment_option_result,
              // keeping options after selected option unchanged

              ...increment_selected_post.options.slice(
                increment_option_index + 1
              )
            ],
            option_opted_by_current_user: [optedby_result]
          },

          // **********************************************************
          // **********************************************************
          // updating finished... so keeping all other post datas ater the selected post as it is

          ...state.posts.slice(increment_post_index + 1)
        ]
      };

    case ADD_COMMENT:
      let { result_for_addcomment, post_index } = action.payload,
        selected_post_for_addcomment = state.posts[post_index];
      return {
        ...state,
        // updating the posts
        posts: [
          // keeping post datas before the selected post as it is
          ...state.posts.slice(0, post_index),

          // updating the count of the option of the selected post
          // **********************************************************
          // **********************************************************

          {
            ...selected_post_for_addcomment,
            comments: [
              // keeping everything unchanged
              ...selected_post_for_addcomment.comments,
              result_for_addcomment
            ]
          },

          // **********************************************************
          // **********************************************************
          // updating finished... so keeping all other post datas ater the selected post as it is

          ...state.posts.slice(post_index + 1)
        ]
      };

    case ADD_REPLY:
      let {
          result_for_reply,
          post_index_for_reply,
          comment_index_for_reply
        } = action.payload,
        selected_post_for_addreply = state.posts[post_index_for_reply],
        selected_comment_for_addreply =
          state.posts[post_index_for_reply].comments[comment_index_for_reply];
      return {
        ...state,
        // updating the posts
        posts: [
          // keeping post datas before the selected post as it is
          ...state.posts.slice(0, post_index_for_reply),

          // updating the count of the option of the selected post
          // **********************************************************
          // **********************************************************

          {
            ...selected_post_for_addreply,
            comments: [
              // keeping everything unchanged
              ...selected_post_for_addreply.comments.slice(
                0,
                comment_index_for_reply
              ),
              // edit the selected comment
              {
                ...selected_comment_for_addreply,
                // add the new reply
                replies: [
                  ...selected_comment_for_addreply.replies,
                  result_for_reply
                ]
              },
              // keeping every other things unchanged
              ...selected_post_for_addreply.comments.slice(
                comment_index_for_reply + 1
              )
            ]
          },

          // **********************************************************
          // **********************************************************
          // updating finished... so keeping all other post datas ater the selected post as it is

          ...state.posts.slice(post_index_for_reply + 1)
        ]
      };

    default:
      return state;
  }
}
