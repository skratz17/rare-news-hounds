import React from "react"
import { Route, Redirect } from "react-router-dom"
import { CategoryProvider } from "./categories/CategoryProvider"
import CategoryForm from "./categories/CategoryForm"
import CategoryList from "./categories/CategoryList"
import { PostForm } from "./posts/postForm"
import { PostProvider } from "./posts/PostProvider"
import { UserPostList} from "./posts/UserPostList"
import TagForm from "./tags/TagForm";
import TagList from "./tags/TagList";
import { TagProvider } from "./tags/TagProvider";
import PostDetail from "./posts/PostDetail";
import { PostList } from "./posts/PostList";
import { PostTagProvider } from "./postTags/PostTagProvider";

export const ApplicationViews = () => {
  return (
    <>
      <Route
        path="/logout"
        render={() => {
          localStorage.removeItem("rare_user_id");
          return <Redirect to="/login" />;
        }}
      />

      <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
        <PostProvider>
          <CategoryProvider>
            <Route path="/posts/create" component={PostForm} />

            <Route path="/posts/edit/:postId" component={PostForm} />
          </CategoryProvider>
        </PostProvider>
        <PostProvider>
          <CategoryProvider>
          <Route exact path="/" component={PostList} />
          </CategoryProvider>
        </PostProvider>

				<PostTagProvider>
					<TagProvider>
						<PostProvider>
							<CategoryProvider>
								<Route path="/my-posts" component={UserPostList} />
								<Route
									exact
									path="/posts/:postId(\d+)"
									render={(props) => <PostDetail {...props} />}
								/>
							</CategoryProvider>
						</PostProvider>
					</TagProvider>
				</PostTagProvider>

        <CategoryProvider>
          <Route path="/categories">
            <CategoryForm />
            <CategoryList />
          </Route>
        </CategoryProvider>

        <TagProvider>
          <Route path="/tags">
            <TagForm />
            <TagList />
          </Route>
        </TagProvider>
      </main>
    </>
  );
};
