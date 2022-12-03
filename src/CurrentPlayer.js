export function CurrentPlayer({storyTellerRound, endStoryTellerRound, host}) {

    let currentPlayer = ""

    if(!storyTellerRound && endStoryTellerRound)
    {
        if(host)
        {
            currentPlayer = "A kitalálók csapata van soron!"
        }
        else
        {
            currentPlayer = "Te/ti jöttök!"
        }
    }
    else
    {
        if(host)
        {
            currentPlayer = "Te jössz!"
        }
        else
        {
            currentPlayer = "A mesélő van soron!"
        }
    }

    return(
        <h2 className="currentPlayer">
            { currentPlayer}        
        </h2>
    )
}