let url = "https://universities.hipolabs.com/search?name=";
let btn = document.querySelector("button");
let country = "india";

btn.addEventListener("click", async () => {
    let country = document.querySelector("input").value;
    console.log(country);
    getColleges();
    
})


async function getColleges() {
    try {
        let result = await axios.get(url+country);
        console.log(result);
    }
    catch(e) {
        console.log("error",e);
    }
}