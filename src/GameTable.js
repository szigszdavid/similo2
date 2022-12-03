export function GameTable({tableCards, tableElementOnClick, answer}) {

    let tableData = []
    let row = []
    for (let i = 0; i < tableCards.length; i++) {
        row.push(tableCards[i])

        if(row.length === 4 || i === tableCards.length - 1)
        {
            tableData.push(row)
            row = []
        }
        
    }
    return(
        <table>
            <tbody>
            {
                tableData.map(row =>
                    <tr>
                        {
                            row.map(el =>
                                <td style={{paddingRight: 10}}>
                                    <img src={require(`${el.img}`)} alt={el.name} width={"100%"} height={"200px"} className={el.name === answer ? "answer" : ""} onClick={() => tableElementOnClick(el)}></img>
                                </td>)
                        } 
                    </tr>)
            }
            </tbody>
        </table>
    )
}