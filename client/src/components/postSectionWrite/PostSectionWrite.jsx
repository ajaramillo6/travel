import './postSectionWrite.css';

export default function PostSectionWrite({postSection, handleRemoveSection}) {
  const PF = "http://localhost:5000/images/";

  return (
    <div className="postSectionWrite">
        <>
        {postSection.map((section, i) => (
            <>
            <div className="sectionWriteContainer" key={i}>
              <i className="postSectionIcon fa-solid fa-rectangle-xmark fa-lg" 
              onClick={()=>handleRemoveSection(section.sectionId)}></i>
              {section.sectionHeader &&
                <div className="sectionWriteHeader">{section.sectionHeader}</div>
              }
              {section.newSectionWords &&
                <div className="sectionWriteText">{section.newSectionWords}</div>
              }
              {section.sectionImg &&
                <div className="sectionWriteImgWrapper">
                  <img className="sectionWriteImg" src={PF + section.sectionImg} />
                  <div className="sectionWriteImgDesc">{section.sectionImgDesc}</div>
                </div>
              }
              {section.sectionListItems &&
                <>
                <div className="sectionWriteListTitle">{section.sectionListTitle}</div>
                {section.sectionListItems.map((item, i) => (
                  <ul key={i}>
                    <li className={item ? "sectionWriteListItem": "sectionWriteListItemHide"}>{item}</li>
                  </ul>
                ))}
                </>
              }
            </div>
            </>
        ))}
        </>
    </div>
  )
}
