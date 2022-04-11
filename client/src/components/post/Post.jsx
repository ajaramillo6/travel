import "./post.css";

export default function Post() {
  return (
    <div className="post">
        <img className="postImg" src="/img/travel6.jpg" alt="" />
        <div className="postInfo">
            <div className="postCats">
                <span className="postCat">Breckenridge, CO</span>
            </div>
            <span className="postTitle">Lorem ipsum dolor, sit amet consectetur</span>
        <span className="postDate">1 hour ago</span>
      </div>
        <p className="postDesc">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
          Dicta eveniet assumenda nesciunt laboriosam autem magnam 
          nemo fuga suscipit, perspiciatis doloremque nulla natus ullam 
          incidunt reiciendis quo amet nobis hic sint.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
          Dicta eveniet assumenda nesciunt laboriosam autem magnam 
          nemo fuga suscipit, perspiciatis doloremque nulla natus ullam 
          incidunt reiciendis quo amet nobis hic sint.
        </p>
    </div>
  )
}
