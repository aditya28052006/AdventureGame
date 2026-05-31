import { useState } from "react";
import { startBattle, attack } from "../api/battleApi";
import {getCharacter} from "../api/characterApi";
import { useEffect } from "react";
import { getInventory } from "../api/inventoryApi";
import {usePotion} from "../api/inventoryApi";

function Battle() {

    const [battleId, setBattleId] = useState(null);

    const [playerHealth, setPlayerHealth] = useState(0);
    const [monsterHealth, setMonsterHealth] = useState(0);
    const [maxPlayerHealth, setMaxPlayerHealth] = useState(0);
    const [maxMonsterHealth, setMaxMonsterHealth] = useState(0);

    const [message, setMessage] = useState("");

    const [victory, setVictory] = useState(false);

    const [character, setCharacter] = useState(null);

    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        loadCharacter();
        loadInventory();
    }, []);



    const loadCharacter = async () => {

        try{
            const response =await getCharacter("ShadowHunter");
            setCharacter(response.data);
        }catch(error){
            console.error(error);
        }
    };


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
            if(response.data.victory){
                loadCharacter();
                loadInventory();
            }

        } catch (error) {
            console.error(error);
        }
    };

    const loadInventory = async () => {
        try {
            const response = await getInventory(1);
            setInventory(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUsePotion = async () => {
        try {
            const response = await usePotion(1);
            setMessage(response.data.message);
            loadCharacter();
            loadInventory();
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
            {character && (

                <div
                    style={{
                        border: "1px solid gray",
                        padding: "15px",
                        marginBottom: "20px"
                    }}
                >

                    <h2>⚔️ {character.name}</h2>

                    <p>Class: {character.characterClass}</p>

                    <p>Level: {character.level}</p>

                    <p>XP: {character.xp}</p>

                    <p>Attack: {character.attack}</p>

                    <p>Defense: {character.defense}</p>

                    <p>Health: {character.health}</p>

                </div>
            )}
            <div
                style={{
                    border: "1px solid gray",
                    padding: "15px",
                    marginBottom: "20px"
                }}
            >

                <h2>🎒 Inventory</h2>
                {inventory.some(
                    item =>
                        item.itemName === "Health Potion"
                        && item.quantity > 0
                ) && (
                    <button onClick={handleUsePotion}>
                        Use Potion 🧪
                    </button>
                )}

                {inventory.map((item, index) => (

                    <p key={index}>
                        {item.itemName} x{item.quantity}
                    </p>

                ))}

            </div>
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