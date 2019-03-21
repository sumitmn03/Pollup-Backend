import { POSTTOBEUPDATED } from "./types";

// UPDATE POST
export const set_post_to_be_update = post => dispatch => {
  dispatch({
    type: POSTTOBEUPDATED,
    payload: post
  });
  //   axios
  //     .patch(
  //       `api/posts/${poll_id}/`,
  //       JSON.stringify(updated_data),
  //       tokenConfig(getState)
  //     )
  //     .then(res => {
  //       dispatch(getPosts());
  //     })
  //     .catch(err => {
  //       dispatch(returnErrors(err.response.data, err.response.status));
  //     });
};
