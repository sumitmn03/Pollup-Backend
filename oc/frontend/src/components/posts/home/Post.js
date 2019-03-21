import React, { Component, Fragment } from "react";

import Option from "./Option";
import Comment from "./comment/Comment";
import PostHeader from "./PostHeader";
import ShareButton from "./sharebutton/ShareButton";

export class Post extends Component {
  state = {
    is_any_option_opted: false,
    last_option_opted: {},
    last_option_opted_index: null,
    count_of_previous_option_opted: 0,
    actions_are_ready: false
  };

  componentDidMount() {
    // console.log(this.props);
    let is_any_option_opted = false,
      last_option_opted = {},
      last_option_opted_index = null,
      count_of_previous_option_opted = 0,
      actions_are_ready = true;

    if (this.props.post.option_opted_by_current_user.length > 0) {
      is_any_option_opted = true;
      last_option_opted = this.props.post.option_opted_by_current_user[0];

      this.props.post.options.map((option, index) => {
        if (option.id == last_option_opted.posts_option) {
          last_option_opted_index = index;
          count_of_previous_option_opted = option.count;
        }
      });
    }

    this.setState({
      is_any_option_opted,
      last_option_opted,
      last_option_opted_index,
      count_of_previous_option_opted,
      actions_are_ready
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.post != prevProps.post) {
      let is_any_option_opted = false,
        last_option_opted = {},
        last_option_opted_index = null,
        count_of_previous_option_opted = 0,
        actions_are_ready = true;

      if (this.props.post.option_opted_by_current_user.length > 0) {
        is_any_option_opted = true;

        last_option_opted = this.props.post.option_opted_by_current_user[0];
        this.props.post.options.map((option, index) => {
          if (option.id == last_option_opted.posts_option) {
            last_option_opted_index = index;
            count_of_previous_option_opted = option.count;
          }
        });
      } else {
      }
      this.setState({
        is_any_option_opted,
        last_option_opted,
        last_option_opted_index,
        count_of_previous_option_opted,
        actions_are_ready
      });
    }
  }

  handle_option_opted = (
    option_id,
    post_id,
    count,
    post_index,
    option_index
  ) => {
    if (this.state.actions_are_ready) {
      let {
        is_any_option_opted,
        last_option_opted,
        last_option_opted_index,
        count_of_previous_option_opted
      } = this.state;
      let actions_are_ready = false;

      let {
        decrement_then_increment,
        decrementOption,
        incrementOption
      } = this.props;

      if (is_any_option_opted) {
        // optedby id to use in decrement action
        let opted_by_id = last_option_opted.id,
          last_option_opted_id = last_option_opted.posts_option;

        if (last_option_opted_id == option_id) {
          this.setState(
            { actions_are_ready },
            decrementOption(
              last_option_opted_id,
              opted_by_id,
              count_of_previous_option_opted,
              post_index,
              last_option_opted_index
            )
          );
        } else {
          // decrement must always be done before increment
          this.setState(
            { actions_are_ready },
            decrement_then_increment(
              last_option_opted_id,
              opted_by_id,
              count_of_previous_option_opted,
              post_index,
              last_option_opted_index,
              option_id,
              post_id,
              count,
              option_index
            )
          );
        }
      } else {
        this.setState(
          { actions_are_ready },
          incrementOption(option_id, post_id, count, post_index, option_index)
        );
      }
    }
  };

  render() {
    let {
      post,
      post_index,
      option_opted_by_current_user,
      current_user
    } = this.props;
    return (
      <Fragment>
        <div className="bg-info">
          <PostHeader {...this.props} />
          <p className="text-light">{post.posts}</p>
          {post.options.map((option, option_index) => {
            return (
              <Option
                key={option_index}
                option={option}
                post_index={post_index}
                option_index={option_index}
                handle_option_opted={this.handle_option_opted}
                post_id={post.id}
                option_count={option.count}
                option_opted_by_current_user={option_opted_by_current_user}
              />
            );
          })}
          <br />
          <br />
          <div>
            <Comment {...this.props} />
            <ShareButton {...this.props} />
          </div>{" "}
          <br />
        </div>
      </Fragment>
    );
  }
}

export default Post;
