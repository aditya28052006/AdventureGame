package com.aditya.adventuregame.service;


import com.aditya.adventuregame.dto.BattleRequest;
import com.aditya.adventuregame.dto.BattleResponse;
import com.aditya.adventuregame.dto.StartBattleResponse;
import com.aditya.adventuregame.entity.*;
import com.aditya.adventuregame.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BattleService {

    private final CharacterRepository characterRepository;
    private final MonsterRepository monsterRepository;
    private final BattleRepository battleRepository;
    private final ItemRepository itemRepository;
    private final InventoryRepository inventoryRepository;

    public BattleResponse fight(BattleRequest request){
        GameCharacter character=characterRepository
                .findByName(request.getCharacterName())
                .orElseThrow(()-> new RuntimeException("Character not found"));

        Monster monster=monsterRepository
                .findByName(request.getMonsterName())
                .orElseThrow(()-> new RuntimeException("Monster not found"));

        int newMonsterHp=monster.getHealth()-character.getAttack();
        if(newMonsterHp<0){
            newMonsterHp=0;
        }

        int newPlayerHp=character.getCurrentHealth()-monster.getAttack();
        if(newPlayerHp<0){
            newPlayerHp=0;
        }
        boolean victory =newMonsterHp==0;
        String message;

        if(victory){
            message="Victory! You defeated the "+monster.getName();
        }else{
            message="You hit "+monster.getName()+" for "+character.getAttack()+" damage.";

        }
        return new BattleResponse(
                newPlayerHp,
                newMonsterHp,
                message,
                victory
        );
    }

    public StartBattleResponse startBattle(BattleRequest request){

        GameCharacter character=characterRepository
                .findByName(request.getCharacterName())
                .orElseThrow(()-> new RuntimeException("Character not found"));

        Monster monster=monsterRepository
                .findByName(request.getMonsterName())
                .orElseThrow(()-> new RuntimeException("Monster not found"));

        Battle battle=Battle.builder()
                .playerHealth(character.getMaxHealth())
                .monsterHealth(monster.getHealth())
                .finished(false)
                .gameCharacter(character)
                .monster(monster)
                .build();

        battleRepository.save(battle);

        return new StartBattleResponse(
                battle.getId(),
                battle.getPlayerHealth(),
                battle.getMonsterHealth(),
                "Battle Started!"
        );
    }


    public BattleResponse attack(Long battleId){
        Battle battle=battleRepository.findById(battleId)
                .orElseThrow(()-> new RuntimeException("Battle Not Found!"));

        if(battle.isFinished()){
            throw new RuntimeException("Battle already finished!");
        }

        GameCharacter character=battle.getGameCharacter();
        Monster monster=battle.getMonster();

        int newMonsterHealth= battle.getMonsterHealth()-character.getAttack();
        if(newMonsterHealth<0){
            newMonsterHealth=0;
        }
        battle.setMonsterHealth(newMonsterHealth);

        boolean victory =newMonsterHealth==0;

        String message;
        if(victory){
            battle.setFinished(true);
            character.setXp(
                    character.getXp()+monster.getXpReward()
            );

            Item lootItem;
            switch(monster.getName()){
                case "Goblin":
                    lootItem=itemRepository.findByName("Health Potion").orElseThrow();
                    break;
                case "Skeleton":
                    lootItem = itemRepository
                            .findByName("Iron Sword")
                            .orElseThrow();
                    break;

                case "Orc":
                    lootItem = itemRepository
                            .findByName("Steel Armor")
                            .orElseThrow();
                    break;

                case "Dragon":
                    lootItem = itemRepository
                            .findByName("Steel Armor")
                            .orElseThrow();
                    break;

                default:
                    lootItem = itemRepository
                            .findByName("Health Potion")
                            .orElseThrow();
            }
            InventoryItem inventoryItem=inventoryRepository.findByGameCharacterAndItem(
                    character,lootItem
            ).orElse(null);

            if(inventoryItem==null){
                inventoryItem=InventoryItem.builder()
                        .gameCharacter(character)
                        .item(lootItem)
                        .quantity(1)
                        .build();
            }else{
                inventoryItem.setQuantity(
                        inventoryItem.getQuantity()+1
                );
            }
            character.setCurrentHealth(battle.getPlayerHealth());
            inventoryRepository.save(inventoryItem);


            message="Victory! You defeated "+ monster.getName()+" and found a "+lootItem.getName()+"!";
            if(character.getXp()>=100){
                character.setLevel(character.getLevel()+1);
                character.setXp(character.getXp()-100);
                character.setAttack(character.getAttack()+5);
                character.setMaxHealth(character.getMaxHealth()+20);
                character.setDefense(character.getDefense()+3);
                message+=" Level Up! "+character.getName()+" is now level "+character.getLevel();
            }


            characterRepository.save(character);

        }
        else{
            int newPlayerHealth= battle.getPlayerHealth()-monster.getAttack();

            if(newPlayerHealth<0){
                newPlayerHealth=0;
            }
            battle.setPlayerHealth(newPlayerHealth);
            character.setCurrentHealth(newPlayerHealth);
            characterRepository.save(character);
            if(newPlayerHealth==0){
                battle.setFinished(true);
                message="Defeat! "+monster.getName()+" defeated you!!";
            }
            else {
                message = "You hit " + monster.getName() + " for " + character.getAttack() + " damage.";
            }

        }
        battleRepository.save(battle);
        return new BattleResponse(
                battle.getPlayerHealth(),
                battle.getMonsterHealth(),
                message,
                victory
        );
    }
}
