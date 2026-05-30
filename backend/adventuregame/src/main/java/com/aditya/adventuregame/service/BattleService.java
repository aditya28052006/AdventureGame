package com.aditya.adventuregame.service;


import com.aditya.adventuregame.dto.BattleRequest;
import com.aditya.adventuregame.dto.BattleResponse;
import com.aditya.adventuregame.dto.StartBattleResponse;
import com.aditya.adventuregame.entity.Battle;
import com.aditya.adventuregame.entity.GameCharacter;
import com.aditya.adventuregame.entity.Monster;
import com.aditya.adventuregame.repository.BattleRepository;
import com.aditya.adventuregame.repository.CharacterRepository;
import com.aditya.adventuregame.repository.MonsterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BattleService {

    private final CharacterRepository characterRepository;
    private final MonsterRepository monsterRepository;
    private final BattleRepository battleRepository;

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

        int newPlayerHp=character.getHealth()-monster.getAttack();
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
                .playerHealth(character.getHealth())
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

            message="Victory! You defeated "+ monster.getName();
            if(character.getXp()>=100){
                character.setLevel(character.getLevel()+1);
                character.setXp(character.getXp()-100);
                character.setAttack(character.getAttack()+5);
                character.setHealth(character.getHealth()+20);
                character.setDefense(character.getDefense()+3);
                message+="Level Up! "+character.getName()+" is now level "+character.getLevel();
            }


            characterRepository.save(character);

        }
        else{
            int newPlayerHealth= battle.getPlayerHealth()-monster.getAttack();

            if(newPlayerHealth<0){
                newPlayerHealth=0;
            }
            battle.setPlayerHealth(newPlayerHealth);
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
