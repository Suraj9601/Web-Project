const input = document.querySelector("input");
const btn = document.querySelector("button");
const result = document.querySelector("p");

btn.addEventListener("click", () => {
    if(input.value == "") {
        alert("Please enter your date of birth");
    } else {
        console.log(input.value);
        const dob = new Date(input.value);
        console.log("dob:",dob);
        const dob_year = dob.getFullYear();
        console.log("year:",dob_year);

        let todayDate = new Date();
        console.log("Today's Date : ",todayDate);
        const today_year = todayDate.getFullYear();
        console.log("Today's Year :",today_year);

        const ageYear =  today_year- dob_year;
        console.log("age is",ageYear);
        result.innerHTML = `Now you're </b><b>${ageYear}</b> years old.`;
    }
});


