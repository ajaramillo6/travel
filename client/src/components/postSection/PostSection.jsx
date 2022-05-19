import "./postSection.css";

export default function PostSection({post}) {

    let postSection = post.postSection;
    let postSections = [];

    if(postSection !== undefined){
        for(let i = 0; i < postSection.length; i++){
            postSections.push(postSection[i]);
        }
    }

  return (
    <div className="postSection">
        {postSections.map((section, i)=>(
            <div className="postSectionContainer" key={i}>
                <div className="postSectionHeader">{section.sectionHeader}</div>
                <div className="postSectionImgContainer">
                    <img className="postSectionImg" src={section.sectionImg} alt="" />
                </div>
                <div className="postSectionImgDesc">{section.sectionImgDesc}</div>
                <div className="postSectionText">{section.sectionText}</div>
            </div>
        ))}
    </div>
  )
}
