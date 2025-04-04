let url = "https://dog.ceo/api/breeds/image/random";

async function getImage() {
    try {
        let image = await axios.get(url);
        return image.data.message;
    }
    catch(error) {
        console.log("ERROR - ", error);
        return "Image not found";
    }
}

let btn = document.querySelector("button");

btn.addEventListener("click", async () => {
    let link = await getImage();
    console.log(link);
    let img = document.querySelector("#dogImg");
    img.setAttribute("src",link);
})