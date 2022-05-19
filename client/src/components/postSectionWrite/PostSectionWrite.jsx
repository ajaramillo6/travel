import './postSectionWrite.css';

export default function PostSectionWrite({postSections, handleRemoveSection}) {
  const PF = "http://localhost:5000/images/";

  return (
    <div className="postSectionWrite">
        <>
        {postSections.map((section, i) => (
            <>
            <div className="sectionWriteContainer" key={i}>
              <i className="postSectionIcon fa-solid fa-rectangle-xmark fa-lg" 
              onClick={()=>handleRemoveSection(section.sectionId)}></i>
              <div className="sectionWriteHeader">{section.sectionHeader}</div>
              <div className="sectionWriteImgWrapper">
                <img className="sectionWriteImg" src={PF + section.sectionImg} />
                <div className="sectionWriteImgDesc">{section.sectionImgDesc}</div>
              </div>
              <div className="sectionWriteText">{section.sectionText}</div>
            </div>
            </>
        ))}
        </>
    </div>
  )
}
