


function PostCard({imgAdd, message, createdAt, likes, comments, shares}) {
    const date = new Date(createdAt);
    
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        // second: 'numeric',
        // timeZoneName: 'short'
    };
    const formattedDate = date.toLocaleString('en-US', options);

    return (
        <div className="card mb-3" style={{ maxWidth: '50%', margin: 'auto'}}>
            {imgAdd &&
                (<img src={imgAdd} className="card-img-top" alt="postImage" style={{ maxWidth: '100%', maxHeight: '500px', width: 'auto', height: 'auto' }} />)
            }
            <div className="card-body">
                <h5 className="card-title">Post</h5>
                <p className="card-text">{message}</p>
                <p className="card-text"><small className="text-body-secondary">Last updated {formattedDate}</small></p>
            </div>
            <div className="row">
                <div className="col-4"><p>Likes: {likes}</p> </div>
                <div className="col-4"><p>Comments: {comments}</p></div>
                <div className="col-4">
                    {shares ? (
                    <p>Shares: {shares}</p>
                    ) : (
                    <p>Shares: 0</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PostCard;