import moment from "moment";

export const fileFormat =(url="")=>{
  const fileExt= url.split(".").pop()
  if(fileExt==='mp4'||fileExt==='webm'||fileExt==='ogg'){
    return "video";
  }
  if(fileExt==='mp3'||fileExt==='wav'){
    return 'audio';
  }
  if(fileExt==='png'||fileExt==='jpg'||fileExt==='jpeg'||fileExt==='gif'){
    return "image";
  }
  return "file";
}

//  /dpr_auto/w_200 gets u image in 200px
export const transformImage= (url="",width=100)=>{
  if(Array.isArray(url)) return 
  const newUrl= url.replace("upload/", `upload/dpr_auto/w_${width}/`)
  return newUrl
}

export const getLast7Days = ()=>{
  const currentDate= moment()
  const last7Days= []
  for(let i=0; i<7; i++){
    const dayDate = currentDate.clone().subtract(i,'days').format("dddd")
    last7Days.unshift(dayDate)
  }
  return last7Days
}

export const getOrSaveFromStorage= ({key,value,get})=>{
  if(get)  
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null
  else
    localStorage.setItem(key, JSON.stringify(value))
}