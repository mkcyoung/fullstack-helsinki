const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = (blogs) => {
    if (blogs.length === 0){
        return null
    }
    return blogs.reduce((favorite,blog) => {
        if (blog.likes > favorite.likes){
            return { title: blog.title, author: blog.author, likes: blog.likes }
        }
        else {
            return {title: favorite.title, author: favorite.author, likes: favorite.likes }
        }
    }, blogs[0])
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0){
        return null
    }
    return _(blogs)
            .groupBy('author')
            .map((arr,key) => {
                return {author:key, blogs:arr.length}
            })
            .maxBy((blog) => blog.blogs);
}

const mostLikes = (blogs) => {
    if (blogs.length === 0){
        return null
    }
    return _(blogs)
            .groupBy('author')
            .map((arr,key) => {
                return {author:key, likes:totalLikes(arr)}
            })
            .maxBy((blog) => blog.likes);
            
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}