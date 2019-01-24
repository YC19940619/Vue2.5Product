function dataimgsrc(src){
  if(!src.includes("http")){
    if(src.includes("media")){
      src = `${process.env.API_URL}${src}`
    }else{
      src = `${process.env.API_URL}/media/${src}`
    }
  }
  return src
}
export default dataimgsrc
