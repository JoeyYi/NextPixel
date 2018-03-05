# NextPixel
A simple web app using NodeJS, Express and MongoDB 
基于Node, Express, mongoDB的内容分享平台
- Displaying&managing posts
- User registration&authentication
- Keep updating...

## Live Demo
[Next Pixel](https://damp-lake-13286.herokuapp.com/)

## API
### Index

|Purpose|Path|Method|
|-|-|-|
|Show landing page|/|GET|
|Show login page|/login|GET|
|Login|/login|POST|
|Show sign-up page|/register|GET|
|Sign up|/register|POST|
|Logout|/logout|POST|

### Posts [/posts]

|Purpose|Path|Method|
|-|-|-|
|Show all posts|/posts/|GET|
|Show post details|/posts/:post_id|GET|
|Show posting page|/posts/new|GET|
|Create new post|/posts/|POST|
|Show editing page|/posts/:post_id/edit|GET|
|Update post|/posts/:post_id|PUT|
|Delete post|/posts/:post_id|DELETE|
|Get favorites number|/posts/:post_id/fav|GET|
|Add to/remove from user favorites|/posts/:post_id/fav|POST|
|Get latest 5 posts|/posts/latest|GET|


### Comments [/posts/:post_id]

|Purpose|Path|Method|
|-|-|-|
|Show commenting page|/posts/:post_id/new|GET|
|Post new comment|/posts/:post_id|POST|
|show editing page|/posts/:post_id/:comment_id/edit|GET|
|Update comment|/posts/:post_id/:comment_id/|PUT|
|Delete comment|/posts/:post_id/:comment_id/|DELETE|


### Users [/users]

|Purpose|Path|Method|
|-|-|-|
|Show user profile|/users/:user_id|GET|

## Todos
- Fuzzy search
- Pagination
- User info update
- Picture upload
- UI improvements

