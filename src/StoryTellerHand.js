import { Table } from "react-bootstrap";

export function StoryTellerHand({storyTellerHand, storyTellerHandOnClick}) {
    return(
        <table>
            <tbody>
                <tr>
                    {
                        storyTellerHand.map(el =>
                            <td>
                                {
                                    console.log(el)
                                }
                                <img src={require(`${el.img}`)} alt={el.name} width={"auto"} height={"200px"}  onClick={() => storyTellerHandOnClick(el)}></img>
                            </td>)
                    }
                </tr>
            </tbody>
        </table>
    )
}