function createPixel(){
    let pixel =[];
    let pRed = Math.floor(Math.random()*256);
    let pGreen = Math.floor(Math.random()*256);
    let pBlue = Math.floor(Math.random()*256);
    pixel.push({pRed: pRed, pGreen: pGreen, pBlue: pBlue});
    return pixel;
}


function createPicture(y,x){
    let picture = [];
    for(let i=0; i<y; i++){
        picture[i]=[];
        for(let j=0; j<x; j++){
            picture[i].push(createPixel());
        }
    }
    return picture;
}



function applyFilter(pictureData){
    if(typeof pictureData !== 'object' || !Array.isArray(pictureData)){
        console.log(`Given data is not an object and array.`);
        return false;
    }
    let filteredPicture = Array.from({length: pictureData.length},i=>Array.from({length: pictureData[0].length},i=>[]));

    for(let i=0; i<pictureData.length; i++){
        for(let j=0; j<pictureData[i].length; j++){
            let cumulativeValues = {pRed:0,pGreen:0,pBlue:0};
            let countedPixels = 0;
            for(let k=-1; k<=1;k++){
                for(let l=-1; l<=1; l++){
                    if(((i+k)>=0 && (i+k)<pictureData.length) && ((j+l)>=0 && (j+l)<pictureData[i].length)){
                        // console.log(pictureData[i+k][j+l]);
                        // console.log(cumulativeValues)
                        cumulativeValues.pRed += pictureData[i+k][j+l][0].pRed;
                        cumulativeValues.pGreen += pictureData[i+k][j+l][0].pGreen;
                        cumulativeValues.pBlue += pictureData[i+k][j+l][0].pBlue;
                        //console.log(cumulativeValues)
                        countedPixels++;
                    }
                }
            }
            //console.log(countedPixels);
            let avgValue = {
                pRed: Math.floor(cumulativeValues.pRed/countedPixels),
                pGreen: Math.floor(cumulativeValues.pGreen/countedPixels),
                pBlue: Math.floor(cumulativeValues.pBlue/countedPixels)
            }
            //console.log(avgValue);
                filteredPicture[i][j].push(avgValue);

        }
    }
    //console.log(filteredPicture)
    return filteredPicture;
}

function drawPicture(pictureData=[]) {
    let pixelTemp = (colorCode)=>{
        //console.log(`${colorCode.pRed,colorCode.pGreen,colorCode.pBlue}`)
        let newDiv = document.createElement("div");
        newDiv.innerHTML = " ";
        newDiv.style.cssText = `display:inline-block; background-color: rgb(${colorCode.pRed}, ${colorCode.pGreen}, ${colorCode.pBlue}); width: 1px; height: 1px;`;
        return newDiv;
    }
    for(let i=0; i<pictureData.length; i++) {
        for(let j=0; j<pictureData[i].length; j++){
            document.getElementById('container').appendChild(pixelTemp(pictureData[i][j][0]));
        }
    }

}



window.addEventListener("load", () => {
    let pPD = createPicture(500,500);
    let fPD = applyFilter(pPD);
    console.log(fPD);
drawPicture(pPD);
    drawPicture(fPD);
})
