function createPixel(){
    let pixel =[];
    let val = Math.random()*10;
    pixel.push(Math.floor(val*1000));
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



function applyFilter(pictureData, toNewArray){
    if(typeof pictureData !== 'object' || !Array.isArray(pictureData)){
        console.log(`Given data is not an object and array.`);
        return false;
    }
    let filteredPicture = Array.from({length: pictureData.length},i=>Array.from({length: pictureData[0].length},i=>[]));

    for(let i=0; i<pictureData.length; i++){
        for(let j=0; j<pictureData[i].length; j++){
            let cumulativeValue = 0;
            let countedPixels = 0;
            for(let k=-1; k<=1;k++){
                for(let l=-1; l<=1; l++){
                    if(((i+k)>=0 && (i+k)<pictureData.length) && ((j+l)>=0 && (j+l)<pictureData[i].length)){
                        //console.log(i+k, j+l);
                        cumulativeValue += pictureData[i+k][j+l][0];
                        countedPixels++;
                    }
                }
            }
            //console.log(countedPixels);
            let avgValue = cumulativeValue / countedPixels;
            //console.log(avgValue);
            if(toNewArray){
                filteredPicture[i][j].push(Math.floor(avgValue));
            }else{
                pictureData[i][j].push(Math.floor(avgValue));
            }
        }
    }
    return toNewArray ? filteredPicture: pictureData;
}


let pD = createPicture(8,8);
console.log(applyFilter(pD,false))
//applyFilter(pD);
