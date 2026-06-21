import { useState, useEffect } from "react";
import { startBattle, attack } from "../api/battleApi";
import { getMyCharacter } from "../api/characterApi";
import { getInventory, usePotion, equipItem } from "../api/inventoryApi";
import { useNavigate } from "react-router-dom";
import warriorImg from "../assets/warrior.png";
import mageImg from "../assets/mage.png";
import rogueImg from "../assets/rogue.png";
import goblinImg from "../assets/goblin.png";
import skeletonImg from "../assets/skeleton.png";
import orcImg from "../assets/orc.png";
import dragonImg from "../assets/dragon.png";
import backgroundImg from "../assets/background.png";
import "../styles/Battle.css";

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
    const [selectedMonster, setSelectedMonster] = useState(localStorage.getItem("selectedMonster") || "Goblin");
    const navigate = useNavigate();

    useEffect(() => { loadCharacter();}, []);

    const loadCharacter = async () => {
        try { const r = await getMyCharacter(); 
            setCharacter(r.data); 
            const inventoryResponse = await getInventory(r.data.id);
            setInventory(inventoryResponse.data);
        }
        catch(e){
            navigate("/create-character");
        }
    };

    const handleStartBattle = async () => {
        try {
            const r = await startBattle({ characterName: character.name, monsterName: selectedMonster });
            setBattleId(r.data.battleId);
            setPlayerHealth(r.data.playerHealth);
            setMonsterHealth(r.data.monsterHealth);
            setMaxPlayerHealth(character.maxHealth);
            setMaxMonsterHealth(r.data.monsterHealth);
            setMessage(r.data.message);
            setBattleLog([r.data.message]);
            setVictory(false);
        } catch(e) { console.error(e); }
    };

    const handleAttack = async () => {
        try {
            const r = await attack(battleId);
            setPlayerHealth(r.data.playerHealth);
            setMonsterHealth(r.data.monsterHealth);
            setMessage(r.data.message);
            setBattleLog(prev => [...prev, r.data.message]);
            setVictory(r.data.victory);
            if (r.data.victory) { await loadCharacter(); }
        } catch(e) { console.error(e); }
    };

    const loadInventory = async (charId) => {
        try { const r = await getInventory(charId);
            console.log("Inventory ID:", charId);
            setInventory(r.data); }
        catch(e) { console.error(e); }
    };

    const handleUsePotion = async () => {
        try {
            const r = await usePotion(character.id);
            setMessage(r.data.message);
            setBattleLog(prev => [...prev, r.data.message]);
            await loadCharacter();
        } catch(e) { console.error(e); }
    };

    const handleEquipItem = async (itemId) => {
        try {
            const r = await equipItem(character.id, itemId);
            setMessage(r.data.message);
            setBattleLog(prev => [...prev, r.data.message]);
            loadCharacter();
        } catch(e) { console.error(e); }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    const getCharacterImage = () => {
        if (!character) return warriorImg;
        switch(character.characterClass) {
            case "Warrior": return warriorImg;
            case "Mage":    return mageImg;
            case "Rogue":   return rogueImg;
            default:        return warriorImg;
        }
    };

    const getMonsterImage = () => {
        switch(selectedMonster) {
            case "Goblin":   return goblinImg;
            case "Skeleton": return skeletonImg;
            case "Orc":      return orcImg;
            case "Dragon":   return dragonImg;
            default:         return goblinImg;
        }
    };

    const getLogColor = (entry) => {
        if (entry.includes("Victory"))  return "#60c060";
        if (entry.includes("defeated")) return "#60c060";
        if (entry.includes("Level Up")) return "#ffd700";
        if (entry.includes("attacked")) return "#e06060";
        return "#c8b890";
    };

    const itemIcon = (t) => t === "WEAPON" ? "⚔️" : t === "ARMOR" ? "🛡️" : "🧪";
    const playerPct  = maxPlayerHealth  > 0 ? (playerHealth  / maxPlayerHealth)  * 100 : 100;
    const monsterPct = maxMonsterHealth > 0 ? (monsterHealth / maxMonsterHealth) * 100 : 100;

    return (
        <div className="b-root" style={{
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            minHeight: "100vh"
        }}>
            <div style={{ backgroundColor: "rgba(0,0,0,0.70)", minHeight: "100vh" }}>
                <div style={{ maxWidth: "1680px", width: "100%", margin: "0 auto", padding: "16px" }}>

                    <div className="b-layout">

                        {/* ══ LEFT PANEL ══ */}
                        <div className="b-left">

                            {character && (
                                <div className="b-card">
                                    <img src={getCharacterImage()} alt="hero" className="b-portrait" />
                                    <p className="b-cname">{character.characterClass.toUpperCase()}</p>
                                    <p className="b-csub">✕ {character.name}</p>
                                    <hr className="b-hdiv" />
                                    <div className="b-srow"><span className="b-slabel">Class</span><span className="b-sval">{character.characterClass}</span></div>
                                    <div className="b-srow"><span className="b-slabel">Level</span><span className="b-sval">{character.level}</span></div>
                                    <div className="b-srow"><span className="b-slabel">XP</span><span className="b-sval">{character.xp}</span></div>
                                    <div className="b-srow"><span className="b-slabel">Attack</span><span className="b-sval">{character.attack}</span></div>
                                    <div className="b-srow"><span className="b-slabel">Defense</span><span className="b-sval">{character.defense}</span></div>
                                    <hr className="b-hdiv" />
                                    <div className="b-srow"><span className="b-slabel">⚔️ Weapon</span><span className="b-sval" style={{ fontSize: "11px" }}>{character.equippedWeapon || "None"}</span></div>
                                    <div className="b-srow"><span className="b-slabel">🛡️ Armor</span><span className="b-sval" style={{ fontSize: "11px" }}>{character.equippedArmor || "None"}</span></div>
                                    <div className="b-srow"><span className="b-slabel">❤️ Health</span><span className="b-sval hp">{character.currentHealth}/{character.maxHealth}</span></div>
                                </div>
                            )}

                            <div className="b-card">
                                <div className="b-ph"><span>🎒</span><h2>Inventory</h2></div>
                                <div className="b-inv-container">
                                    {inventory.map((item, idx) => (
                                        <div key={idx} className="b-irow">
                                            <span className="b-ileft">
                                                {itemIcon(item.itemType)} {item.itemName}
                                                <span className="b-iqty">x{item.quantity}</span>
                                            </span>
                                            {(item.itemType === "WEAPON" || item.itemType === "ARMOR") && (
                                                <button className="b-equip" onClick={() => handleEquipItem(item.itemId)}>Equip</button>
                                            )}
                                            {item.itemType === "POTION" && item.itemName === "Health Potion" && item.quantity > 0 && (
                                                <button className="b-use" onClick={handleUsePotion}>Use</button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ══ CENTER PANEL ══ */}
                        <div className="b-center">

                            <div className="b-card">
                                <h1 className="b-title">
                                    <span className="b-tswords">✕ </span>Battle Arena<span className="b-tswords"> ✕</span>
                                </h1>
                                <div className="b-tdiv" />

                                <div className="b-controls">
                                    <select
                                        className="b-mselect"
                                        value={selectedMonster}
                                        onChange={e => {
                                            setSelectedMonster(e.target.value);
                                            localStorage.setItem("selectedMonster", e.target.value);
                                        }}
                                    >
                                        <option value="Goblin">Goblin</option>
                                        <option value="Skeleton">Skeleton</option>
                                        <option value="Orc">Orc</option>
                                        <option value="Dragon">Dragon</option>
                                    </select>
                                    <button className="b-startbtn" onClick={handleStartBattle}>Start Battle ✕</button>
                                </div>

                                <div className="b-combatants">

                                    {/* Player */}
                                    <div className="b-fighter player">
                                        <img src={getCharacterImage()} alt="player" className="b-fimg" />
                                        <div className="b-finfo">
                                            <p className="b-fclass">{character?.characterClass?.toUpperCase() || "WARRIOR"}</p>
                                            <p className="b-fname">{character?.name}</p>
                                        </div>
                                        <div className="b-hpwrap">
                                            <div className="b-hptrack">
                                                <div className="b-hpfill" style={{ width: `${playerPct}%` }} />
                                            </div>
                                        </div>
                                        {battleId && <p className="b-hptext">{playerHealth} / {maxPlayerHealth}</p>}
                                    </div>

                                    {/* Middle — VS / Attack / Victory */}
                                    <div className="b-mid">
                                        {!battleId && <div className="b-vs">VS</div>}
                                        {battleId && !victory && (
                                            <button className="b-attackbtn" onClick={handleAttack}>⚔ ATTACK ⚔</button>
                                        )}
                                        {victory && <div className="b-victory">🏆<br />VICTORY</div>}
                                    </div>

                                    {/* Monster */}
                                    <div className="b-fighter monster">
                                        <img src={getMonsterImage()} alt={selectedMonster} className="b-fimg" />
                                        <div className="b-finfo">
                                            <p className="b-fclass">{selectedMonster.toUpperCase()}</p>
                                            <p className="b-fname">{selectedMonster}</p>
                                        </div>
                                        <div className="b-hpwrap">
                                            <div className="b-hptrack">
                                                <div className="b-hpfill" style={{ width: `${monsterPct}%`, background: "linear-gradient(to right,#5a0000,#991010)" }} />
                                            </div>
                                        </div>
                                        {battleId && <p className="b-hptext">{monsterHealth} / {maxMonsterHealth}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Battle Log */}
                            <div className="b-card">
                                <div className="b-ph"><span>📜</span><h2>Battle Log</h2></div>
                                <div className="b-logscroll">
                                    {battleLog.map((entry, i) => (
                                        <div key={i} className="b-logentry" style={{ color: getLogColor(entry) }}>{entry}</div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ══ RIGHT PANEL ══ */}
                        <div className="b-right">
                            <div className="b-card">
                                <div className="b-ph"><span>📊</span><h2>Quick Info</h2></div>
                                <div className="b-qrow"><span className="b-qlabel">❤️ HP</span><span className="b-qval">{character?.currentHealth}/{character?.maxHealth}</span></div>
                                <div className="b-qrow"><span className="b-qlabel">⚔️ ATK</span><span className="b-qval">{character?.attack}</span></div>
                                <div className="b-qrow"><span className="b-qlabel">🛡️ DEF</span><span className="b-qval">{character?.defense}</span></div>
                                <div className="b-qrow"><span className="b-qlabel b">🧪 Potions</span><span className="b-qval">{inventory.filter(i => i.itemType === "POTION").reduce((a, i) => a + i.quantity, 0)}</span></div>
                                <div className="b-qrow"><span className="b-qlabel">🎒 Items</span><span className="b-qval">{inventory.length}</span></div>
                                <div className="b-qrow"><span className="b-qlabel">👹 Monster</span><span className="b-qval">{selectedMonster}</span></div>
                                <div className="b-qrow"><span className="b-qlabel p">🏆 Status</span><span className="b-qval">{victory ? "Victory" : "Ready"}</span></div>
                                <div className="b-skull">💀</div>
                                <button className="b-logout" onClick={handleLogout}>Logout</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Battle;