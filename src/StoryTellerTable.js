import { store } from "./store";

export function StoryTellerTable({ storyTellerTable, endStoryTellerRound, host}) {

    const RotateImg = (img,el) => {

      if(el === storyTellerTable[storyTellerTable.length - 1] && !endStoryTellerRound && host)
      {
        store.game.storyTellerTable[storyTellerTable.length - 1].similar = !store.game.storyTellerTable[storyTellerTable.length - 1].similar
        img.className === "false" ? img.className = "true" : img.className = "false"
      }
    }
  return (
    <div>
      <p style={{ fontSize: "xx-large",
  "font-family": "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",  color: "rgb(79,167,158)"}}>Segítő kártyák:</p>
      <ul className="container">
        {console.log(storyTellerTable)}
        {storyTellerTable.map((el) => {
          return (
            <li style={{padding: "5px"}}>
              <img
                src={require(`${el.img}`)}
                alt={el.name}
                className = {el.similar ? "true" : "false"}
                width={"auto"}
                height={"200px"}
                onClick={(e) => RotateImg(e.target, el) }
              ></img>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
