import logo from "./logo.svg";
import "./App.css";
import cards from "./cards.json";
import { useEffect, useState } from "react";
import { GameTable } from "./GameTable";
import { StoryTellerHand } from "./StoryTellerHand";
import { StoryTellerTable } from "./StoryTellerTable";
import { GameMenu } from "./GameMenu";
import { Result } from "./Result";
import { nanoid } from "nanoid";
import { useSnapshot, snapshot } from "valtio";
import { bindProxyAndYMap } from "valtio-yjs";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";
import {
  store,
  addClient,
  initStore,
  tableElementOnClick,
  storyTellerHandOnClick,
  newGameOnClick,
  setEndStoryTellerRound,
} from "./store";
import { CurrentPlayer } from "./CurrentPlayer";

const waitForSync = (websocketProvider) =>
  new Promise((resolve, reject) => {
    const timerId = setTimeout(() => reject("timeout"), 5000);
    websocketProvider.on("sync", (isSynced) => {
      if (isSynced) {
        clearTimeout(timerId);
        resolve();
      }
    });
  });
const createSyncedStore = async (room, store) => {
  try {
    const ydoc = new Y.Doc();
    const websocketProvider = new WebsocketProvider(
      "wss://demos.yjs.dev",
      room,
      ydoc
    );
    await waitForSync(websocketProvider);
    const yStore = ydoc.getMap("store");
    bindProxyAndYMap(store, yStore);
    return { clientId: ydoc.clientID };
  } catch (e) {
    console.error(e);
  }
};

function App() {
  const [room, setRoom] = useState(nanoid(10));
  const [host, setHost] = useState(false);
  const [playerId, setPlayerId] = useState(0);
  const snapshot = useSnapshot(store);
  const isEmptySnapshot = Object.keys(snapshot).length === 0;
  const [menuShow, setMenuShow] = useState(false);

  const handleCreate = async (e) => {
    const { clientId } = await createSyncedStore(room, store);
    initStore();
    addClient(clientId);
    setHost(true);
    setPlayerId(clientId);
  };
  const handleJoin = async (e) => {
    const { clientId } = await createSyncedStore(room, store);
    addClient(clientId);
    setPlayerId(clientId);
  };

  const handleTableElementOnClick = (el) => {
    if (!host) {
      tableElementOnClick(el);

      if (store.game.tableCards !== null) {
        if (store.game.tableCards.filter(card => card.name === store.game.answer.name).length === 0) {
          store.game.end="lost"
        }
        if (
          store.game.tableCards.length === 1 &&
          store.game.tableCards[0].name === store.game.answer.name
        ) {
          store.game.end="won"
        }
      }
    }
  };

  const handleStoryTellerHandOnClick = (el) => {
    if(host)
    {
      storyTellerHandOnClick(el);
      setEndStoryTellerRound(false);
    }
    
  };

  const handleNewGameButtonOnClick = () => {
    newGameOnClick();
    setMenuShow(false)
    store.game.end=""
  };

  const handleEndRoundOnClick = () => {
    setEndStoryTellerRound(true);
  };

  const handleExitRoomOnClick = () => {
    console.log("Exit");
    store.clients = store.clients.filter(client => client !== playerId)
    window.location.reload(true)
  }

  return (
    <div className="App">
      <img
        src={require(`./Képek/logo.png`)}
        width="9%"
        height={"9%"}
        alt="logo"
      ></img>
      <div hidden={snapshot.game !== undefined}>
        <input value={room} onChange={(e) => setRoom(e.target.value)} />
        <button className="newGameButton" onClick={handleCreate}>Create</button>
        <button className="newGameButton" onClick={handleJoin}>Join</button>
      </div>
      {isEmptySnapshot ? null : (
        <div className="mainBoard">
          {store.game.tableCards !== null ? (
            <GameTable
              className="gameTable"
              tableCards={snapshot.game.tableCards}
              tableElementOnClick={handleTableElementOnClick}
              storyTellerRound={snapshot.game.storyTellerRound}
              answer={store.game.answer.name}
            />
          ) : (
            "Error loading the json"
          )}
          <div className="rightBoard">
            {store.game.storyTellerHand !== null ? (
              <StoryTellerHand
                storyTellerHand={store.game.storyTellerHand}
                storyTellerHandOnClick={handleStoryTellerHandOnClick}
                storyTellerRound={store.game.storyTellerRound}
              />
            ) : (
              ""
            )}
            <div className="buttoncContainer">
              
              <button className="newGameButton" onClick={() => setMenuShow(true)}>
                    Menü
              </button>
              <GameMenu
                  show={menuShow}
                  handleMenuClose={() => setMenuShow(false)}
                  newGameButtonOnClick={handleNewGameButtonOnClick}
                  exitRoomOnClick={handleExitRoomOnClick}
              />
              <Result
                end={snapshot.game.end}
                handleResultClose={() => store.game.end=""}
                answer={store.game.answer.name}
                newGameButtonOnClick={handleNewGameButtonOnClick}
                exitRoomOnClick={handleExitRoomOnClick}
              />
              <button
                className="newGameButton"
                onClick={handleEndRoundOnClick}
                disabled={store.game.storyTellerRound}
                hidden={!host || snapshot.game.endStoryTellerRound}
              >
                End round
              </button>
              <CurrentPlayer 
                storyTellerRound={store.game.storyTellerRound}
                endStoryTellerRound={snapshot.game.endStoryTellerRound}
                host={host}
              />
            </div>
            <StoryTellerTable
              storyTellerTable={snapshot.game.storyTellerTable}
              endStoryTellerRound={snapshot.game.endStoryTellerRound}
              host={host}
            />
          </div>
        </div>
      )}
      
    </div>
  );
}

export default App;
