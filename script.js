const accessKey = "uDK_FwfSVQS8z4j4ygLMil_Lt49bqKTS9JAE2MxP4nI";
const searchText = document.getElementById("search-text");
const searchBtn = document.querySelector(".search-btn");
const searchResult = document.querySelector(".search-result");
const showBtn = document.querySelector(".showBtn");
 const searchForm = document.querySelector(".main-section");
const spinner = document.querySelector(".spinner");

let inputData ="";
 let  page = 1;

 async function searchImages(){
    spinner.style.display = "block";
        inputData = searchText.value;
            const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}&per_page=12`;
            const response = await fetch(url);
            const data = await response.json();
            if (page===1){
                searchResult.innerHTML="";
            }
            const results = data.results;
         if(results.length>0) {  results.map((result)=>{
                const imageStore = document.createElement("img");
                imageStore.src = result.urls.small;
                imageStore.alt = result.alt_description;
                imageStore.loading = "lazy";
                const imageLink =document.createElement("a");
                imageLink.href = result.links.html;
                imageLink.target ="_blank";

                imageLink.appendChild(imageStore);
                searchResult.appendChild(imageLink);
                
            } );
            showBtn.style.display= "block";
        }else{
            searchResult.innerHTML = "<p> No results found.</p>";
        }
        spinner.style.display = "none";
    }
        searchForm.addEventListener ("submit",(evt) =>{
            evt.preventDefault();
            page=1;
            searchImages();
        })
        showBtn.addEventListener("click", ()=>{
            page++;
            searchImages();

        })