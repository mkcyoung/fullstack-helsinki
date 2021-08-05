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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}