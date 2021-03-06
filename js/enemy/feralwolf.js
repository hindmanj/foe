/*
 *
 * Mothgirl, lvl 4-6
 *
 */

Scenes.FeralWolf = {};

function FeralWolf(levelbonus) {
	Entity.call(this);
	this.ID = "wolf";

	this.avatar.combat     = Images.wolf;
	this.name              = "Wolf";
	this.monsterName       = "the wolf";
	this.MonsterName       = "The wolf";
	this.body.DefMale(); // TODO: Feral form
	this.FirstCock().thickness.base = 6;
	this.FirstCock().length.base = 28;
	this.Balls().size.base = 5;

	this.maxHp.base        = 200;
	this.maxSp.base        = 60;
	this.maxLust.base      = 45;
	// Main stats
	this.strength.base     = 25;
	this.stamina.base      = 20;
	this.dexterity.base    = 19;
	this.intelligence.base = 15;
	this.spirit.base       = 19;
	this.libido.base       = 18;
	this.charisma.base     = 14;

	this.level             = 4 + Math.floor(Math.random() * 4);
	this.sexlevel          = 2;
	if(levelbonus)
		this.level += levelbonus;

	this.combatExp         = 5 + this.level;
	this.coinDrop          = 2 + this.level * 4;

	this.body.SetRace(Race.Wolf);
	this.body.SetBodyColor(Color.gray);

	this.body.SetEyeColor(Color.gold);

	TF.SetAppendage(this.Back(), AppendageType.tail, Race.Wolf, Color.gray);

	// Set hp and mana to full
	this.SetLevelBonus();
	this.RestFull();
}
FeralWolf.prototype = new Entity();
FeralWolf.prototype.constructor = FeralWolf;

FeralWolf.prototype.DropTable = function() {
	var drops = [];
	if(Math.random() < 0.05) drops.push({ it: Items.Lobos });
	if(Math.random() < 0.5)  drops.push({ it: Items.WolfFang });
	if(Math.random() < 0.5)  drops.push({ it: Items.Wolfsbane });
	if(Math.random() < 0.5)  drops.push({ it: Items.CanisRoot });

	if(Math.random() < 0.1)  drops.push({ it: Items.DogBiscuit });
	if(Math.random() < 0.1)  drops.push({ it: Items.DogBone });
	if(Math.random() < 0.1)  drops.push({ it: Items.FoxBerries });
	if(Math.random() < 0.1)  drops.push({ it: Items.Foxglove });

	if(Math.random() < 0.01) drops.push({ it: Items.Canis });
	if(Math.random() < 0.01) drops.push({ it: Items.Vulpinix });
	if(Math.random() < 0.01) drops.push({ it: Items.Testos });
	if(Math.random() < 0.01) drops.push({ it: Items.Virilium });
	return drops;
}

FeralWolf.prototype.Act = function(encounter, activeChar) {
	// TODO: Very TEMP
	Text.Add(this.name + " acts! Growl!");
	Text.NL();
	Text.Flush();

	// Pick a random target
	var t = this.GetSingleTarget(encounter, activeChar);

	var parseVars = {
		name   : this.name,
		hisher : this.hisher(),
		tName  : t.name
	};

	var choice = Math.random();
	if(choice < 0.5)
		Abilities.Attack.Use(encounter, this, t);
	else if(choice < 0.7 && Abilities.Physical.DAttack.enabledCondition(encounter, this))
		Abilities.Physical.Pierce.Use(encounter, this, t);
	else if(choice < 0.95 && Abilities.Physical.CrushingStrike.enabledCondition(encounter, this))
		Abilities.Physical.CrushingStrike.Use(encounter, this, t);
	else
		Abilities.Seduction.Tease.Use(encounter, this, t);
}

Scenes.FeralWolf.LoneEnc = function() {
	var enemy = new Party();
	enemy.AddMember(new FeralWolf());
	var enc = new Encounter(enemy);
	/*
	enc.canRun = false;
	enc.onEncounter = ...
	enc.onLoss = ...
	enc.onVictory = ...
	enc.VictoryCondition = ...
	*/
	return enc;
}
