import Vue from 'vue'
import VueRouter from 'vue-router'
import Message from '../views/Message.vue'
import PostList from '@/views/PostList.vue'
import post from '@/views/post.vue'
import comment from '@/views/Comment.vue'
import login from '@/views/Login.vue'
import user from '@/views/user.vue'
import createPost from '@/views/createPost'
import chat from '@/views/chat'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: login
  },
  {
    path: '/chat',
    name:'chat',
    component: chat
  },
  {
    path: '/NewPost',
    name: 'NewPost',
    component: createPost
  },

  {
    path: '/user',
    name: 'user',
    component: user
  },


  {
    path: '/Message',
    name: 'message',
    component: Message
  },
  {
    path: '/post/:postID',
    name: 'post',
    component: post
  },
  {
    path: '/post/comment/:commentID',
    name: 'comment',
    component: {a:comment}
  },
  {
    path: '/PostList',
    name: 'PostList',
    component: PostList
  }
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
