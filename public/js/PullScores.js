const scoreContainer = document.getElementById("scores-container")

class scoreSet {
    score;
    name;
}

scoreList = [];

const fetchScores = async ()=>{
    try{
        //fetch data from server
        const response = await fetch("/scores");
        if(!response.ok){
            throw new Error("Failed to get scores");
        }

        //Parse json
        const scores = await response.json();
        console.log(scores);
        //Format the data to html
        scoreContainer.innerHTML = "";

        scores.forEach((score)=>{
            scoreList.push(new scoreSet())
        })


        scores.forEach((score) => {
            const scoreDiv = document.createElement("div");
            scoreDiv.className = "score";
            scoreDiv.innerHTML = `Score: ${score.score} Name: ${score.name}`;
            scoreContainer.appendChild(scoreDiv);
        });
    }catch(error){
        console.error("Error: ", error);
        scoreContainer.innerHTML = "<p style='color:red'>Failed to get scores</p>";
    }
    
    
}

fetchScores();