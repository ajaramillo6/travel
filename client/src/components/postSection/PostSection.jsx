import "./postSection.css";

export default function PostSection({post}) {
    const PF = "http://localhost:5000/images/";
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
                {section.sectionHeader &&
                    <div className="postSectionHeader">{section.sectionHeader}</div>
                }
                {section.sectionImg &&
                <>
                    <div className="postSectionImgContainer">
                        <img className="postSectionImg" src={PF + section.sectionImg} alt="" />
                    </div>
                    <div className="postSectionImgDesc">{section.sectionImgDesc}</div>
                </>
                }
                {section.sectionText &&
                    <div className="postSectionText">{section.sectionText}</div>
                }
                {section.sectionListItems &&
                <>
                    <div className="postSectionListTitle">{section.sectionListTitle}</div>
                    {section.sectionListItems.map((item, i) => (
                        <ul className="postSectionList" key={i}>
                            <li className={item ? "postSectionListItem":"postSectionListItemHide"}>{item}</li>
                        </ul>
                    ))}
                </>
                }
            </div>
        ))}
    </div>
  )
}
