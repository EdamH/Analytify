import axios from 'axios';


var analytifyBaseURL = "https://localhost:7242/analytify";
var atreemoBaseURL = "https://tools.atreemo.com/SM_CentralServiceUAT/api/Values"
var graphBaseURL = "https://graph.facebook.com"

// ANALYTIFY API


    // PAGES
    export const getPages = () => {
        return axios.get(analytifyBaseURL + "/Page")
            .then((response) => { console.log("Pages!", response.data); return response.data })
        .catch((error) => {
            console.error('Error fetching pages:', error.message);
        })
    }

    export const getPage = (id) => {
        return axios.get(analytifyBaseURL + "/Page/id", {params: {id: id}})
        .then((response) => { console.log(`Here's your page: ${response.data.name}!`, response.data); return response.data })
        .catch((error) => {
            console.error('Error fetching page:', error.message);
        })
    }

    export const getFeed = (id, range = -1, start = 0) => {
        return axios.get(analytifyBaseURL + "/Page/feed", {params: {id: id, range: range, startIndex: start}})
        .then((response) => { console.log(`Here's the feed of #${id}!`, response.data); return response.data })
        .catch((error) => {
            console.error('Error fetching feed:', error.message);
        })
    }

    export const getPageUsers = (id) => {
        axios.get(analytifyBaseURL + "/Page/users", {params: {id: id}})
        .then((response) => { console.log(`Here are the users of #${id}!`, response.data); return response.data })
        .catch((error) => {
            console.error('Error fetching users:', error.message);
        })
    }

    export const createPage = (pageId, Name, accessToken, likes) => {
        const postData = {
        PageId: pageId,
        Name: Name,
        AccessToken: accessToken,
        Likes: likes
        };
        axios.post(analytifyBaseURL + "/Page/create", postData)
        .then((response) => { console.log("Page created!", response.data) })
        .catch((error) => {
            console.error('Error posting page:', error.message);
        })
    }
    
    export const deletePage = (id) => {
        
        const encodedId = encodeURIComponent(id);

        axios.delete(analytifyBaseURL + `/Page/${encodedId}`)
        .then((response) => { console.log(`Deleted page: #${id}!`, response.data)})
        .catch((error) => {
            console.error('Error deleting page:', error.message);
        })
    }
    
    export const createPageUser = (pageId, Name, accessToken, likes, userId, type="private") => {
        
        const lowerType = type.toLowerCase();
        const typeSelector = {
            private: 0,
            public: 1,
        }
        const postData = {
        PageId: pageId,
        Name: Name,
        AccessToken: accessToken,
        Likes: likes
        };
        return axios.post(analytifyBaseURL + `/Page/userId?userId=${userId}&type=${typeSelector[lowerType]}`, postData)
        .then((response) => { console.log("Page created!", response.data) })
        .catch((error) => {
            console.error('Error posting page:', error.message);
        })
    }


    // USERS
    export const getUsers = () => {
        return axios.get(analytifyBaseURL + "/User")
            .then((response) => { console.log("Users!", response.data); return response.data })
        .catch((error) => {
            console.error('Error fetching users:', error.message);
        })
    }

    export const getUser = (id) => {
        axios.get(analytifyBaseURL + "/User/id", {params: {id: id}})
        .then((response) => { console.log(`Here's your user: ${response.data.name}!`, response.data); return response.data })
        .catch((error) => {
            console.error('Error fetching user:', error.message);
        })
    }
        
    export const getUserPages = (id) => {
            axios.get(analytifyBaseURL + "/User/pages", {params: {id: id}})
            .then((response) => { console.log(`Here are the pages of #${id}!`, response.data); return response.data })
            .catch((error) => {
                console.error('Error fetching pages:', error.message);
            })
}
    
    export const getUserPublicPages = (id) => {
            return axios.get(analytifyBaseURL + "/User/publicPages", {params: {id: id}})
            .then((response) => { console.log(`Here are the public pages of #${id}!`, response.data); return response.data })
            .catch((error) => {
                console.error('Error fetching pages:', error.message);
            })
}
    
    export const getUserPrivatePages = (id) => {
            return axios.get(analytifyBaseURL + "/User/privatePages", {params: {id: id}})
            .then((response) => { console.log(`Here are the private pages of #${id}!`, response.data); return response.data })
            .catch((error) => {
                console.error('Error fetching pages:', error.message);
            })
    }

    export const createUser = (userId, Name, accessToken) => {
        const postData = {
        UserId: userId,
        Name: Name,
        AccessToken: accessToken,
        };
        return axios.post(analytifyBaseURL + "/User", postData)
        .then((response) => { console.log("User created!", response.data) })
        .catch((error) => {
            console.error('Error posting user:', error.message);
        })
    }
    
    export const deleteUser = (id) => {
        axios.delete(analytifyBaseURL + `/User/${encodeURIComponent(id)}`)
        .then((response) => { console.log(`Deleted user: #${id}!`, response.data)})
        .catch((error) => {
            console.error('Error deleting user:', error.message);
        })
}
    
    // COMMENTS

    export const getComments = () => {
        return axios.get(analytifyBaseURL + "/Comment")
            .then((response) => { console.log("Comments!", response.data); return response.data })
        .catch((error) => {
            console.error('Error fetching comments:', error.message);
        })
    }

    export const getComment = (id) => {
        return axios.get(analytifyBaseURL + "/Comment/id", {params: {id: id}})
        .then((response) => { console.log(`Here's your commment: ${response.data.commentId}!`, response.data); return response.data })
        .catch((error) => {
            console.error('Error fetching comment:', error.message);
        })
    }
    
    export const createComment = (commentId, commentText, likes, loves, wows, hahas, sads, angers, createdAt, postId) => {
        const postData = {
        CommentId: commentId,
        CommentText: encodeURIComponent(commentText),
        LikesNum: likes,
        LoveNum: loves,
        WowNum: wows,
        HahaNumn: hahas,
        SadNum: sads,
        AngerNum: angers,
        CreatedAt: createdAt,
        };
        return axios.post(analytifyBaseURL + `/Comment/postId?postId=${postId}`, postData)
        .then((response) => { console.log("Comment created!", response.data) })
        .catch((error) => {
            console.error('Error posting comment:', error.message);
        })
    }

    export const deleteComment = (id) => {
        axios.delete(analytifyBaseURL + `/Comment/${encodeURIComponent(id)}`)
        .then((response) => { console.log(`Deleted comment: #${id}!`, response.data)})
        .catch((error) => {
            console.error('Error deleting comment:', error.message);
        })
    }
    
    // POSTS

    export const getPosts = () => {
        return(axios.get(analytifyBaseURL + "/Post")
            .then((response) => { console.log("Posts!", response.data); return response.data })
        .catch((error) => {
            console.error('Error fetching posts:', error.message);
        }))
    }

    export const getPost = (id) => {
        return axios.get(analytifyBaseURL + "/Post/id", {params: {id: id}})
        .then((response) => { return response.data })
        .catch((error) => {
            console.error('Error fetching post:', error.message);
        })
    }

    export const getPostComments = (id, range = -1, start = 0) => {
        return axios.get(analytifyBaseURL + "/Post/comments", { params: { id: id, range: range, startIndex: start}})
        .then((response) => { console.log(`Here's your comments: ${response.data.commentId}!`, response.data); return response.data })
        .catch((error) => {
            console.error('Error fetching comments:', error.message);
        })
    }
    
    export const createPost = (postId, imgAdd, message, likes, loves, wows, hahas, sads, angers, comments, shares, createdAt, pageId) => {
        const postData = {
        PostId: postId,
        ImgAdd: encodeURIComponent(imgAdd),
        message: encodeURIComponent(message),
        LikesNum: likes,
        LoveNum: loves,
        WowNum: wows,
        HahaNumn: hahas,
        SadNum: sads,
        AngerNum: angers,
        CommentsNum: comments,
        SharesNum: shares,
        CreatedAt: createdAt
        };
        return axios.post(analytifyBaseURL + `/Post/pageId?pageId=${pageId}`, postData)
        .then((response) => { console.log("Post created!", response.data) })
        .catch((error) => {
            console.error('Error posting post:', error.message, postData.PostId);
        })
    }

    export const deletePost = (id) => {
        axios.delete(analytifyBaseURL + `/Post/${encodeURIComponent(id)}`)
        .then((response) => { console.log(`Deleted post: #${id}!`, response.data)})
        .catch((error) => {
            console.error('Error deleting post:', error.message);
        })
    }
// ATREEMO API

export const searchPage = (page) => {
    return(axios.get(atreemoBaseURL + `/Search?query=${page}`)
        .then((response) => { console.log(`SEARCH DONE!`, response.data); return response.data })
        .catch((error) => {
            console.error('Error searching:', error.message);
        }))
}

export const publicFeed = (pageId) => {
    return axios.get(atreemoBaseURL + `/Call?query=/${pageId}/feed?fields=full_picture,created_time,shares,comments.summary(true).limit(50){created_time,message},likes.summary(true).limit(50),message,reactions,insights.metric(post_reactions_by_type_total)`)
        .then((response) => { console.log(`Feed returned!`, response.data); return response.data })
        .catch((error) => {
            console.error('Error searching:', error.message);
        })
}

// GRAPH API
    
// COMPLEX

export const deepAddComments = async (post) => {
    let dummyComments = await post.comments;
              while (true) {
                
                
                for (const commentData of dummyComments.data) {
                  let comment = await getComment(commentData.id);
                  if (!comment) {
                    await createComment(
                      commentData.id,
                      commentData.message,
                      commentData.like.summary.total_count,
                      commentData.love.summary.total_count,
                      commentData.wow.summary.total_count,
                      commentData.haha.summary.total_count,
                      commentData.sad.summary.total_count,
                      commentData.angry.summary.total_count,
                      commentData.created_time.replace("+", "."),
                      post.id
                    );
                  }
                }
                if (!dummyComments.paging || !dummyComments.paging.next) {
                  break;
                }                
                dummyComments = (await axios.get(dummyComments.paging.next));
              }
}

export const deepAddPosts = async (feed) => {
    let dummyFeed = feed;        
        let currentPageID = feed.PageId;
        while (true) {
          for (const item of dummyFeed.data) {
            let post = await getPost(item.id);
            if (!post) {
              await createPost(
                item.id,
                item.full_picture,
                item.message,
                item.like.summary.total_count,
                item.love.summary.total_count,
                item.wow.summary.total_count,
                item.haha.summary.total_count,
                item.sad.summary.total_count,
                item.angry.summary.total_count,
                item.comments.summary.total_count,
                item.shares?.count,
                item.created_time.replace("+", "."),
                currentPageID
              );
            deepAddComments(item)
            }
          }
          if (!dummyFeed.paging || !dummyFeed.paging.next) {
            break;
          }          
          dummyFeed = (await axios.get(dummyFeed.paging.next)).data;
        }
}

