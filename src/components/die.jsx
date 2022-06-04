import "./die.css";

const Die = (props) => {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <div>
      <h2 onClick={props.holdDice} style={styles} className="die">
        {props.value}
      </h2>
    </div>
  );
};

export default Die;
