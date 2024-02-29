const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader")

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 10;
const apiKey="FBdM7wUj23FV9so03DZHkP_KKwReJpOGSFsGg5ZV4z4";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        count = 30;
    }
}

//Helper Function
function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key])
    }
}

// Create Elements For Links & Photos 
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log("total images =", totalImages)
    photosArray.forEach((photo) =>{
        // Create <a> to link to Unsplash
        const item = document.createElement("a");
        setAttributes(item,{
            href:photo.links.html,
            target: "_blank"
        })
        // Create <img> for photo
        const img = document.createElement("img")
        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description
        })
        // Event Listener, when each img is loaded
        img.addEventListener("load",imageLoaded)
        // Put <img> inside <a> and then both inside imageContainer
        item.appendChild(img)
        imageContainer.appendChild(item) 
    })
}

// Get Photos From Unsplash API

async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch(error){
        // Catch Error Here
    }
}

// Check scrolling
window.addEventListener("scroll",()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
})

// On Load
getPhotos();