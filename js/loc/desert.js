/*
 * 
 * Desert area
 * 
 */

// Create namespace
world.loc.Desert = {
	Drylands         : new Event("Drylands")
}

//
// Den entrance
//
world.loc.Desert.Drylands.description = function() {
	Text.Add("You’re standing in the drylands, the border between the fertile plains and the barren desert. Beyond here, you’d need the help of the desert dwellers to cross; venturing into the sandy wastes on your own would be foolhardy.");
}

world.loc.Desert.Drylands.enc = new EncounterTable();

world.loc.Desert.Drylands.enc.AddEnc(function() {
	return Scenes.Momo.MomoEnc;
}, 1.0, function() { return momo.Wandering(); });

world.loc.Desert.Drylands.enc.AddEnc(function() {
	return Scenes.Oasis.DesertCaravanEncounter;
}, 1.0, function() { return true; });

world.loc.Desert.Drylands.enc.AddEnc(function() {
	return function() {
		var parse = {
			
		};
		
		Text.Clear();
		Text.Add("Wandering the desert, you find a tiny, spiky turtle slowly crawling across the sands. Taking care to avoid the prickly needles on its back, you pick up the thing and put it in your inventory.", parse);
		Text.NL();
		Text.Add("<b>Received a cactoid!</b>", parse);
		
		party.Inv().AddItem(Items.Quest.Cactoid);
		
		if(party.Inv().QueryNum(Items.Quest.Cactoid) >= 3) {
			burrows.flags["BruteTrait"] = Burrows.TraitFlags.Gathered;
			Text.NL();
			Text.Add("You think you've gathered enough of these for now, you should return them to Ophelia.", parse);
		}
		Text.Flush();
		
		world.TimeStep({minute: 15});
		
		Gui.NextPrompt();
	};
}, 1.0, function() { return burrows.Access() && burrows.flags["BruteTrait"] == Burrows.TraitFlags.Inactive; });

world.loc.Desert.Drylands.links.push(new Link(
	"Crossroads", true, true,
	null,
	function() {
		MoveToLocation(world.loc.Plains.Crossroads, {hour: 2});
	}
));

world.loc.Desert.Drylands.enc.AddEnc(function() {
	return Scenes.Roaming.FindSomeCoins;
}, 0.5, function() { return true; });

world.loc.Desert.Drylands.AddEncounter({
	nameStr : "Lizard",
	func    : function() {
		return Scenes.Lizards.GroupEnc();
	}, odds : 1.0, enc : true,
	visible : true, enabled : true, hunt : true
});

world.loc.Desert.Drylands.AddEncounter({
	nameStr : "Naga",
	func    : function() {
		return Scenes.Naga.LoneEnc();
	}, odds : 1.0, enc : true,
	visible : true, enabled : true, hunt : true
});

world.loc.Desert.Drylands.AddEncounter({
	nameStr : "Scorpion",
	func    : function() {
		return Scenes.Scorpion.LoneEnc();
	}, odds : 1.0, enc : true,
	visible : true, enabled : true, hunt : true
});
