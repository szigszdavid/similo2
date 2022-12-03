import { proxy } from "valtio";
import cards from "./cards.json";

const roundEliminations = [1,2,3,4,1];
export const store = proxy({});
export function initStore() {
  const shuffled = cards.sort(() => 0.5 - Math.random());
  let selected = shuffled.slice(0, 12);
  Object.assign(store, {
    clients: [],
    currentClientIndex: 0,
    game: {
      currentRound: 0,
      tableCards: selected,
      storyTellerHand: shuffled.slice(12, 17),
      deck: shuffled.slice(17),
      answer: selected[Math.floor(Math.random() * 12)],
      eliminateNumber: 1,
      storyTellerRound : true,
      storyTellerTable : [],
      end: "",
      endStoryTellerRound: false,
    },
  });
}
export function addClient(clientId) {
  store.clients.push(clientId);
}

export function newGameOnClick() {
  const shuffled = cards.sort(() => 0.5 - Math.random());
  let selected = shuffled.slice(0, 12);
  store.game.answer = selected[Math.floor(Math.random() * 12)];
  store.game.currentRound = 0;
  store.game.tableCards = selected;
  store.game.storyTellerHand = shuffled.slice(12, 17);
  store.game.deck = shuffled.slice(17);
  store.game.answer = selected[Math.floor(Math.random() * 12)];
  store.game.eliminateNumber = 1;
  store.game.storyTellerRound = true;
  store.game.storyTellerTable = [];
}

// export function handleClick(number) {
//   store.game.guesses.push(number);
// }

export function storyTellerHandOnClick(el) {
    if(store.game.storyTellerRound) 
    {
      store.game.storyTellerTable.push(el)
      //setStoryTellerHand([...storyTellerHand.filter(card => card !== el), deck.slice(0,1)[0]])
      store.game.storyTellerHand = store.game.storyTellerHand.filter(card => card !== el)
      store.game.storyTellerHand.push(store.game.deck[0]);
      store.game.deck = store.game.deck.slice(1)
      store.game.storyTellerRound = false;
    }
}

export function tableElementOnClick(el) {
    if(!store.game.storyTellerRound)
    {
        console.log(el);
        store.game.tableCards = store.game.tableCards.filter((card) => card.name !== el.name);
        console.log(store.game.tableCards);
        store.game.eliminateNumber -= 1;
        console.log(store.game.eliminateNumber);

      if (store.game.eliminateNumber === 0) {
        store.game.currentRound += 1;
        store.game.eliminateNumber = roundEliminations[store.game.currentRound];
        store.game.storyTellerRound = true;
      }
    }
}

export function changePlayer() {
  store.currentClientIndex === store.clients.length - 1
    ? (store.currentClientIndex = 0)
    : store.currentClientIndex++;
}

export function setEndStoryTellerRound(endStoryTellerRound) {
  store.game.endStoryTellerRound = endStoryTellerRound
}
