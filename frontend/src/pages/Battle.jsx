import { useState } from "react";
import { startBattle, attack } from "../api/battleApi";

function Battle() {

    const [battleId, setBattleId] = useState(null);

    const [playerHealth, setPlayerHealth] = useState(0);
    const [monsterHealth, setMonsterHealth] = useState(0);
    const [maxPlayerHealth, setMaxPlayerHealth] = useState(0);
    const [maxMonsterHealth, setMaxMonsterHealth] = useState(0);

    const [message, setMessage] = useState("");

    const [victory, setVictory] = useState(false);


    const handleStartBattle = async () => {

        try {

            const response = await startBattle({
                characterName: "ShadowHunter",
                monsterName: "Goblin"
            });

            setBattleId(response.data.battleId);
            setPlayerHealth(response.data.playerHealth);
            setMonsterHealth(response.data.monsterHealth);
            setMaxPlayerHealth(response.data.playerHealth);
            setMaxMonsterHealth(response.data.monsterHealth);
            setMessage(response.data.message);
            setVictory(false);

        } catch (error) {
            console.error(error);
        }
    };

    const handleAttack = async () => {

        try {

            const response = await attack(battleId);

            setPlayerHealth(response.data.playerHealth);
            setMonsterHealth(response.data.monsterHealth);
            setMessage(response.data.message);
            setVictory(response.data.victory);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            style={{
                textAlign: "center",
                marginTop: "50px"
            }}
        >
            <h1>⚔️ Battle Arena ⚔️</h1>

            <button onClick={handleStartBattle}>
                Start Battle
            </button>

            <h2>🧙 Player</h2>
            <progress
                value={playerHealth}
                max={maxPlayerHealth}
                style={{ width: "300px" }}
            />
            <p>{playerHealth} / {maxPlayerHealth} HP</p>

            <h2>👹 Monster</h2>
            <progress
                value={monsterHealth}
                max={maxMonsterHealth}
                style={{ width: "300px" }}
            />
            <p>{monsterHealth} / {maxMonsterHealth} HP</p>

            <h3>{message}</h3>

            {battleId && !victory && (
                <button onClick={handleAttack}>
                    Attack ⚔️
                </button>
            )}
        </div>
    );
}

export default Battle;