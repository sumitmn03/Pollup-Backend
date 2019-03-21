import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import {
  GET_POSTS,
  INCREMENT_OPTION_COUNT,
  DECREMENT_OPTION_COUNT,
  ADD_COMMENT,
  ADD_REPLY
} from "./types";

// GET POSTS

export const getPosts = () => (dispatch, getState) => {
  axios
    .get("api/timeline", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// decrement_then_increment

// I thought to use async await but it's working just with the promise

export const decrement_then_increment = (
  last_option_opted_id,
  opted_by_id,
  count_of_previous_option_opted,
  post_index,
  last_option_opted_index,
  option_id,
  post_id,
  count,
  option_index
) => (dispatch, getState) => {
  count_of_previous_option_opted -= 1;
  axios
    .delete(`api/optedby/${opted_by_id}/`, tokenConfig(getState))
    .then(() => {
      axios
        .patch(
          `api/options/${last_option_opted_id}/`,
          JSON.stringify({
            count: count_of_previous_option_opted
          }),
          tokenConfig(getState)
        )
        .then(option_result => {
          dispatch({
            type: DECREMENT_OPTION_COUNT,
            payload: {
              decrement_option_result: option_result.data,
              decrement_post_index: post_index,
              decrement_option_index: last_option_opted_index
            }
          });
          dispatch(
            incrementOption(option_id, post_id, count, post_index, option_index)
          );
        });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// DECREMENT THE COUNT OF THE OPTION
export const decrementOption = (
  last_option_opted_id,
  opted_by_id,
  count_of_previous_option_opted,
  post_index,
  last_option_opted_index
) => (dispatch, getState) => {
  count_of_previous_option_opted -= 1;
  axios
    .delete(`api/optedby/${opted_by_id}/`, tokenConfig(getState))
    .then(() => {
      axios
        .patch(
          `api/options/${last_option_opted_id}/`,
          JSON.stringify({
            count: count_of_previous_option_opted
          }),
          tokenConfig(getState)
        )
        .then(option_result => {
          dispatch({
            type: DECREMENT_OPTION_COUNT,
            payload: {
              decrement_option_result: option_result.data,
              decrement_post_index: post_index,
              decrement_option_index: last_option_opted_index
            }
          });
        });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// INCREMENT THE COUNT OF THE OPTION
export const incrementOption = (
  posts_option,
  post_id,
  count,
  post_index,
  option_index
) => (dispatch, getState) => {
  count += 1;
  axios
    .post(
      `api/optedby/`,
      JSON.stringify({ posts: post_id, posts_option }),
      tokenConfig(getState)
    )
    .then(optedby_result => {
      axios
        .patch(
          `api/options/${posts_option}/`,
          JSON.stringify({ count }),
          tokenConfig(getState)
        )
        .then(option_result => {
          dispatch({
            type: INCREMENT_OPTION_COUNT,
            payload: {
              optedby_result: optedby_result.data,
              increment_option_result: option_result.data,
              increment_post_index: post_index,
              increment_option_index: option_index
            }
          });
        });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// ADD POST

export const addPost = data_from_form => (dispatch, getState) => {
  const [post, options] = data_from_form;
  axios
    .post("/api/posts/", JSON.stringify(post), tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ addPost: "Post Added" }));
      dispatch(addOptions(res.data.id, options));
      dispatch(getPosts());
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// ADD OPTION

export const addOptions = (posts, options) => (dispatch, getState) => {
  options.map(option => {
    let final_option_data = JSON.stringify({ posts, option });
    axios
      .post("api/options/", final_option_data, tokenConfig(getState))
      .then(res => {
        dispatch(createMessage({ addOptions: "Option Added" }));
      })
      .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  });
};

// ADD COMMENT

export const addComment = (
  post_type,
  posts,
  author,
  parent_comment,
  comment_index,
  comment_content,
  post_index
) => (dispatch, getState) => {
  const comment = {
    post_type,
    posts,
    author,
    parent_comment,
    comment: comment_content
  };
  axios
    .post("/api/comments/", JSON.stringify(comment), tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ addComment: "comment Added" }));
      if (parent_comment == undefined && comment_index == undefined) {
        dispatch({
          type: ADD_COMMENT,
          payload: { result_for_addcomment: res.data, post_index }
        });
      } else {
        dispatch({
          type: ADD_REPLY,
          payload: {
            result_for_reply: res.data,
            post_index_for_reply: post_index,
            comment_index_for_reply: comment_index
          }
        });
      }
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// DELETE POST

export const deletePost = (post_type, post_id) => (dispatch, getState) => {
  if (post_type == 1) {
    axios
      .delete(`api/posts/${post_id}/`, tokenConfig(getState))
      .then(res => {
        dispatch(getPosts());
      })
      .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  } else {
    axios
      .delete(`api/sharedpoll/${post_id}/`, tokenConfig(getState))
      .then(res => {
        dispatch(getPosts());
      })
      .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  }
};

// UPDATE POST

export const updatePost = (post_type, post_id, udpated_data, options) => (
  dispatch,
  getState
) => {
  if (post_type == 1) {
    let final_data = { posts: udpated_data };
    axios
      .patch(
        `api/posts/${post_id}/`,
        JSON.stringify(final_data),
        tokenConfig(getState)
      )
      .then(res => {
        options.map(option => {
          axios.patch(
            `api/options/${option.id}/`,
            JSON.stringify(option),
            tokenConfig(getState)
          );
        });
        dispatch(getPosts());
      })
      .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  } else if (post_type == 2) {
    let final_data = { caption: udpated_data };
    axios
      .patch(
        `api/sharedpoll/${post_id}/`,
        JSON.stringify(final_data),
        tokenConfig(getState)
      )
      .then(res => {
        dispatch(getPosts());
      })
      .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  }
};
