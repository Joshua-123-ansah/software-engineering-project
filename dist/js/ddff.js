const dlist = document.getElementById("collections35");
let collections = ["Shawm","muchadf", "lifda"]
let options = ""

for (var i=0; i < collections.length;++i){
options += '<option value="'+collections[i]["col_name"]+'" />'; // Storing options in variable
}

dlist.innerHTML = options;

console.log("hjh")