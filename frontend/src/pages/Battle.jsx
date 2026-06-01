import { useState } from "react";
import { startBattle, attack } from "../api/battleApi";
import {getCharacter} from "../api/characterApi";
import { useEffect } from "react";
import { getInventory } from "../api/inventoryApi";
import {usePotion,equipItem} from "../api/inventoryApi";
import warriorImg from "../assets/warrior.png";
import mageImg from "../assets/mage.png";
import rogueImg from "../assets/rogue.png";
import goblinImg from "../assets/goblin.png";
import skeletonImg from "../assets/skeleton.png";
import orcImg from "../assets/orc.png";
import dragonImg from "../assets/dragon.png";
import backgroundImg from "../assets/background.png";


function Battle() {

    const [battleId, setBattleId] = useState(null);

    const [playerHealth, setPlayerHealth] = useState(0);
    const [monsterHealth, setMonsterHealth] = useState(0);
    const [maxPlayerHealth, setMaxPlayerHealth] = useState(0);
    const [maxMonsterHealth, setMaxMonsterHealth] = useState(0);

    const [message, setMessage] = useState("");
    const [battleLog, setBattleLog] = useState([]);

    const [victory, setVictory] = useState(false);

    const [character, setCharacter] = useState(null);

    const [inventory, setInventory] = useState([]);

    const [selectedMonster, setSelectedMonster] =
    useState("Goblin");

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
                monsterName: selectedMonster
            });

            setBattleId(response.data.battleId);
            setPlayerHealth(response.data.playerHealth);
            setMonsterHealth(response.data.monsterHealth);
            setMaxPlayerHealth(character.maxHealth);
            setMaxMonsterHealth(response.data.monsterHealth);
            setMessage(response.data.message);
            setBattleLog([response.data.message]);
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
            setBattleLog(prev => [...prev, response.data.message]);
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
            setBattleLog(prev => [...prev, response.data.message]);
            loadCharacter();
            loadInventory();
        } catch (error) {
            console.error(error);
        }
    };


    const handleEquipItem = async (itemId) => {
        try {
            const response = await equipItem(1, itemId);
            setMessage(response.data.message);
            setBattleLog(prev => [...prev, response.data.message]);
            loadCharacter();
        } catch (error) {
            console.error(error);
        } 
    };  


    const cardStyle = {
        ackgroundColor: "rgba(0, 0, 0, 0.7)",
        color: "white",
        border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: "15px",
        padding: "20px",
        marginBottom: "20px",
        backdropFilter: "blur(5px)"
    };

    const getCharacterImage = () => {

        if (!character) return null;

        switch(character.characterClass){

            case "Warrior":
                return warriorImg;

            case "Mage":
                return mageImg;

            case "Rogue":
                return rogueImg;

            default:
                return warriorImg;
        }
    };

    const getMonsterImage = () => {

        switch(selectedMonster){

            case "Goblin":
                return goblinImg;

            case "Skeleton":
                return skeletonImg;

            case "Orc":
                return orcImg;

            case "Dragon":
                return dragonImg;

            default:
                return goblinImg;
        }
    };



    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                minHeight: "100vh"
            }}
        >
            <div
                style={{
                backgroundColor: "rgba(0,0,0,0.65)",
                minHeight: "100vh"
            }}
            >
                <div
                    style={{
                        textAlign: "center",
                        margin: "0 auto",
                        maxWidth: "1200px",
                        color: "white",
                        padding: "20px"
                    }}
                >

                    {character && (

                        <div
                            style={cardStyle}
                        >

                            <h2>⚔️ {character.name}</h2>

                            <p>Class: {character.characterClass}</p>

                            <p>Level: {character.level}</p>

                            <p>XP: {character.xp}</p>

                            <p>Attack: {character.attack}</p>

                            <p>Defense: {character.defense}</p>

                            <p>
                                ⚔️ Equipped Weapon:
                                {" "}
                                {character.equippedWeapon}
                            </p>

                            <p>
                                🛡️ Equipped Armor:
                                {" "}
                                {character.equippedArmor}
                            </p>

                            <p>
                                Health:
                                {" "}
                                {character.currentHealth}
                                /
                                {character.maxHealth}
                            </p>

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

                            <div
                                key={index}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "10px",
                                    marginBottom: "10px"
                                }}
                            >
                                <span>
                                    {item.itemType === "WEAPON" && "⚔️"}
                                    {item.itemType === "ARMOR" && "🛡️"}
                                    {item.itemType === "POTION" && "🧪"}

                                    {" "}
                                    {item.itemName}
                                    {" "}
                                    x{item.quantity}
                                </span>

                                {(item.itemType === "WEAPON" ||
                                item.itemType === "ARMOR") && (

                                    <button
                                        onClick={() =>
                                            handleEquipItem(item.itemId)
                                        }
                                    >
                                        Equip
                                    </button>

                                )}
                            </div>

                        ))}

                    </div>
                    <h1>⚔️ Battle Arena ⚔️</h1>
                    <select
                        style={{
                            padding: "8px",
                            borderRadius: "8px",
                            backgroundColor: "#222",
                            color: "white"
                        }}
                        value={selectedMonster}
                        onChange={(e) =>
                            setSelectedMonster(e.target.value)
                        }
                    >
                        <option value="Goblin">Goblin</option>
                        <option value="Skeleton">Skeleton</option>
                        <option value="Orc">Orc</option>
                        <option value="Dragon">Dragon</option>
                    </select>

                    <br />
                    <br />
                    <h3>
                        Selected Monster:
                        {" "}
                        {selectedMonster}
                    </h3>
                    <button onClick={handleStartBattle}>
                        Start Battle
                    </button>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "100px",
                            alignItems: "center",
                            marginBottom: "20px"
                        }}
                    >
                        <div>
                            <img
                                src={getCharacterImage()}
                                style={{
                                    width: "250px",
                                    height: "250px",
                                    objectFit: "contain",
                                    borderRadius: "10px"
                                }}
                            />
                            <h3>{character?.name}</h3>
                            <progress
                                value={playerHealth}
                                max={maxPlayerHealth}
                                style={{
                                    width: "250px"
                                }}
                            />

                            <p>
                                {playerHealth} / {maxPlayerHealth}
                            </p>
                        </div>

                        <h1>⚔️ VS ⚔️</h1>

                        <div>
                            <img
                                src={getMonsterImage()}
                                style={{
                                    width: "250px",
                                    height: "250px",
                                    objectFit: "contain",
                                    borderRadius: "10px"
                                }}
                            />
                            <h3>{selectedMonster}</h3>
                            <progress
                            value={monsterHealth}
                            max={maxMonsterHealth}
                            style={{
                                width: "250px"
                            }}
                        />

                        <p>
                            {monsterHealth} / {maxMonsterHealth}
                        </p>
                        </div>
                    </div>
                

                    <h3>{message}</h3>
                    <h2>📜 Battle Log</h2>

                    <div
                        style={{
                            border: "1px solid gray",
                            padding: "10px",
                            height: "200px",
                            width: "500px",
                            margin: "10px auto",
                            overflowY: "auto",
                            textAlign: "left"
                        }}
                    >
                        {battleLog.map((entry, index) => (
                            <div
                                key={index}
                                style={{
                                    marginBottom: "8px"
                                }}
                            >
                                {entry}
                            </div>
                        ))}
                    </div>

                    {battleId && !victory && (
                        <button onClick={handleAttack}>
                            Attack ⚔️
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Battle;