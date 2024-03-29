import './postSectionWrite.css';

export default function PostSectionWrite({postSection, handleRemoveSection, theme}) {

  return (
    <div className="postSectionWrite" data-theme={theme}>
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
                  <img className="sectionWriteImg" src={section.sectionImg} alt="" />
                  <div className="sectionWriteImgDesc">{section.sectionImgDesc}</div>
                </div>
              }
              {section.listWords &&
                <>
                <div className="sectionWriteListTitle">{section.sectionListTitle}</div>
                {section.listWords.map((item, i) => (
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
