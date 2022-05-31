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

    // START LOOKING FOR URLS
    const sectionWords = [];
    const findURLs = [];
    const findSection = [];
    const findIndex = [];
    const createSectionLinks=[];
    const sectionLinkCoordinates = [];
    const postWords = [];
    const findCharIndex = [];
    const findPost = [];
    const newPostWords = [];

    if(postSection){
        for(let i = 0; i < postSection.length; i++){
            sectionWords[i] = postSection[i].newSectionWords
        }
        
        for(let i = 0; i < sectionWords.length; i++){
            let sectionWordsLength = sectionWords[i].length;
            for(let j = 0; j < sectionWordsLength; j++){
                if(sectionWords[i][j][0]==='['){
                    findURLs.push(sectionWords[i][j]);
                    findSection.push(i)
                    findIndex.push(j)
                }
            }
        }

        for(let j = 0; j < findURLs.length; j++){
            if(findURLs[j].includes(",")){
              createSectionLinks.push(<a className="postLink" href={findURLs[j].split(",")[0].substring(1).slice(0,-1)}>
                {(findURLs[j].split(",")[1].slice(0,-1).slice(0,-1)).split("-").join(" ")}</a>);
            }
          }

        for(let x = 0; x < createSectionLinks.length; x++){
            sectionLinkCoordinates.push([findSection[x], findIndex[x], createSectionLinks[x]]);
        }

        //Insert link objects as replacement for square bracket content
        for (let w = 0; w < sectionLinkCoordinates.length; w++){
            sectionWords[sectionLinkCoordinates[w][0]][sectionLinkCoordinates[w][1]] = 
                sectionLinkCoordinates[w][2];
        }

        //Create space between words, except if they're objects. Add period if object at end of sentence
        for(let m = 0; m < sectionWords.length; m++){
            for(let n = 0; n < sectionWords[m].length; n++){
                if((typeof sectionWords[m][n-1] === 'object') && (typeof sectionWords[m][n] === 'string') &&
                (sectionWords[m][n][0].toUpperCase() === sectionWords[m][n][0])){
                    postWords.push(". " + sectionWords[m][n])  
                } else if (typeof sectionWords[m][n-1] === 'object' && typeof sectionWords[m][n] === 'string'){
                    postWords.push(" " + sectionWords[m][n] + " ")
                } else {
                    postWords.push(sectionWords[m][n])
                }
                if((n+1) === sectionWords[m].length){
                    postWords.push("^");
                    findPost.push(m);
                    findCharIndex.push(n);
                }
            }
            
        }
    }

    //Split array into different sections
    const indexSummedx = [];
    const indexSummedy = [];

    // Add 1 to each element
    const correctIndex = findCharIndex.map(i => i+1);

    for(let a = 0; a < correctIndex.length; a++){
        if(a === 0){
            indexSummedy.push(correctIndex[a]) 
        }
        else if(a > 0){
            indexSummedy.push(correctIndex[a] += (correctIndex[a-1]+1))
        }
    }

    for (let x = 0; x < findCharIndex.length; x++){
        indexSummedx.push(indexSummedy[x] - findCharIndex[x] - 1);
    }

    if(indexSummedx[0] === 1){
        indexSummedx.splice(0,1,0);
    }

    for(let x=0; x < indexSummedx.length; x++){
        newPostWords.push(postWords.slice(indexSummedx[x], indexSummedy[x]));
    }

    //Replace old post sections with new formatted ones
    for (let i = 0; i < findPost.length; i++){
        postSection[i].newSectionWords.splice(0, postSection[i].newSectionWords.length, newPostWords[i]);
    }

  return (
    <div className="postSection">
        {postSections.map((section, i)=>(
            <div className="postSectionContainer" key={i}>
                {section.sectionHeader &&
                    <div className="postSectionHeader">{section.sectionHeader}</div>
                }
                {section.newSectionWords &&
                    <div className="postSectionText">{section.newSectionWords}</div>
                }
                {section.sectionImg &&
                <>
                    <div className="postSectionImgContainer">
                        <img className="postSectionImg" src={PF + section.sectionImg} alt="" />
                    </div>
                    <div className="postSectionImgDesc">{section.sectionImgDesc}</div>
                </>
                }
                {section.listWords &&
                <>
                    <div className="postSectionListTitle">{section.sectionListTitle}</div>
                    {section.listWords.map((item, i) => (
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
