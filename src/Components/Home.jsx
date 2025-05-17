import React, { useState } from 'react'
import ImageUpload from './ImageUpload'
import ImagePreview from './ImagePreview'
import {enhancedImageAPI} from "../utiles/enhanceImageApi"
const Home = () => {

  const [uploadImage, setUploadImage] = useState(null)
  const [enhancedImage, setEnhancedImage] = useState(null)
  const [loading, setloading] = useState(false)
  const UploadImageHandler= async(file)=>{
   setUploadImage(URL.createObjectURL(file))
   setloading(true);
    //callning the api
    try {
      //code which can genrates thr error
      const enhancedURL=await enhancedImageAPI(file)
      setEnhancedImage(enhancedURL.image);
      setloading(false);
    } catch (error) {
      //code to handel the errr ans show the message
      console.log(error);
      alert("error while enhanciong the image plese try again later ")
    }

  }
  
  
  return (
    <>
      <ImageUpload UploadImageHandler={UploadImageHandler} />
      <ImagePreview loading={loading} uploaded={uploadImage} enhanced={enhancedImage}  />
    </>
  )
}

export default Home