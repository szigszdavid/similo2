export function GameRules({ gameRulesBackButtonOnClick }) {
  return (
    <>
      <div>
        <h1 style={{ marginLeft: "30%" }}>Játékszabály</h1>
        <div style={{marginLeft: "auto", marginRight: "auto", width: 500, height: 380, overflowY: "scroll"}}>
          <p>
            <img src={require(`./Képek/rule1.jpg`)} alt="rule1" style={{width: 400, height: 380,marginLeft: 50}}></img>
            <img src={require(`./Képek/rule2.jpg`)} alt="rule2" style={{width: 400, height: 380,marginLeft: 50}}></img>
            <img src={require(`./Képek/rule3.jpg`)} alt="rule3" style={{width: 400, height: 380,marginLeft: 50}}></img>
            <img src={require(`./Képek/rule4.jpg`)} alt="rule4" style={{width: 400, height: 380,marginLeft: 50}}></img>
            <img src={require(`./Képek/rule5.jpg`)} alt="rule5" style={{width: 400, height: 380,marginLeft: 50}}></img>
            <img src={require(`./Képek/rule6.jpg`)} alt="rule6" style={{width: 400, height: 380,marginLeft: 50}}></img>
          </p>
        </div>
      </div>
      <button
        className="newGameButton"
        onClick={gameRulesBackButtonOnClick}
        style={{ marginLeft: "35%" }}
      >
        Vissza
      </button>
    </>
  );
}
