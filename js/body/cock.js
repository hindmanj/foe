
CockType = {
	ordinary : 0,
//	clitcock : 1,
	tentacle : 2,
	ovipositor : 3
}

function Cock(race, color) {
	BodyPart.call(this, race, color);
	this.thickness = new Stat(3);
	this.length    = new Stat(15);
	this.type      = CockType.ordinary;
	this.vag       = null; // For clitcock
	this.knot      = 0;
	this.isStrapon = false;
}
Cock.prototype = new BodyPart();
Cock.prototype.constructor = Cock;

Cock.prototype.ToStorage = function(full) {
	var storage = {
		len    : this.length.base.toFixed(2),
		thk    : this.thickness.base.toFixed(2)
	};
	if(full) {
		storage.race = this.race.id.toFixed();
		storage.col  = this.color.toFixed();
		if(this.type != CockType.ordinary) storage.type = this.type.toFixed();
		if(this.knot != 0) storage.knot = this.knot.toFixed();
	}
	return storage;
}

Cock.prototype.FromStorage = function(storage) {
	storage = storage || {};
	this.race           = RaceDesc.IdToRace[parseInt(storage.race)] || this.race;
	this.color          = parseInt(storage.col)    || this.color;
	this.type           = parseInt(storage.type)   || this.type;
	this.length.base    = parseFloat(storage.len)  || this.length.base;
	this.thickness.base = parseFloat(storage.thk)  || this.thickness.base;
	this.knot           = parseInt(storage.knot)   || this.knot;
}

Cock.prototype.Clone = function() {
	var cock            = new Cock(this.race, this.color);
	cock.thickness.base = this.thickness.base;
	cock.length.base    = this.length.base;
	cock.knot           = this.knot;
	return cock;
}

Cock.prototype.Len = function() {
	return this.length.Get();
}
Cock.prototype.Thickness = function() {
	return this.thickness.Get();
}
Cock.prototype.Size = function() {
	return this.thickness.Get() * this.length.Get();
}
Cock.prototype.Volume = function() {
	var r = this.thickness.Get() / 2;
	return Math.PI * r * r * this.length.Get();
}
Cock.prototype.Knot = function() {
	return this.knot != 0;
}
Cock.prototype.Sheath = function() {
	return this.race.isRace(
		Race.Horse,
		Race.Cow,
		Race.Sheep,
		Race.Goat,
		Race.Feline,
		Race.Canine,
		Race.Musteline,
		Race.Rabbit);
}
Cock.prototype.Strapon = function() {
	return this.isStrapon;
}

Cock.prototype.noun = function() {
	var noun = [];
	if(this.vag) {
		noun.push("clit-cock");
		noun.push("girl-cock");
	}
	if(this.type == CockType.tentacle) {
		noun.push("tentacle");
		noun.push("tentacle-cock");
	}
	else if(this.type == CockType.ovipositor) {
		noun.push("ovipositor");
		noun.push("egg-layer");
	}
	else {
		noun.push("cock");
		noun.push("dick");
		noun.push("manhood");
		noun.push("member");
		noun.push("slab of meat");
		noun.push("penis");
		noun.push("phallus");
		noun.push("prick");
		noun.push("rod");
		noun.push("shaft");
		noun.push("dong");	
	}
	return _.sample(noun);
}
Cock.prototype.nounPlural = function() {
	var noun = [];
	noun.push("cocks");
	noun.push("dicks");
	noun.push("manhoods");
	noun.push("members");
	noun.push("slabs of meat");
	noun.push("penises");
	noun.push("phalluses");
	noun.push("pricks");
	noun.push("rods");
	noun.push("shafts");
	noun.push("dongs");
	return _.sample(noun);
}
Cock.prototype.Desc = function() {
	var ret;
	var cockArea = this.thickness.Get() * this.length.Get();
	if     (cockArea <= 10 ) ret = {a:"a", adj: "tiny"};
	else if(cockArea <= 20 ) ret = {a:"a", adj: "small"};
	else if(cockArea <= 30 ) ret = {a:"a", adj: "below average"};
	else if(cockArea <= 40 ) ret = {a:"a", adj: "well-proportioned"};
	else if(cockArea <= 50 ) ret = {a:"a", adj: "strapping"};
	else if(cockArea <= 70 ) ret = {a:"a", adj: "big"};
	else if(cockArea <= 90 ) ret = {a:"a", adj: "large"};
	else if(cockArea <= 120) ret = {a:"a", adj: "huge"};
	else if(cockArea <= 200) ret = {a:"an", adj: "enormous"};
	else if(cockArea <= 400) ret = {a:"an", adj: "immense"};
	else if(cockArea <= 800) ret = {a:"a", adj: "gargantuan"};
	else                     ret = {a:"a", adj: "titanic"};
	
	ret.len = (MEASUREUNIT == Unit.american) ?
		Unit.CmToInch(this.length.Get()) + " inches" :
		this.length.Get() + " cms";
	ret.thickness = (MEASUREUNIT == Unit.american) ?
		Unit.CmToInch(this.thickness.Get()) + " inches" :
		this.thickness.Get() + " cms";
	
	return ret;
}
Cock.prototype.Short = function() {
	var desc = this.Desc();
	var noun = this.noun();
	var knotted = (this.Knot() && (Math.random() < 0.5)) ? ", knotted"  : "";
	var sheath  = (this.Sheath() && (Math.random() < 0.5)) ? ", sheathed" : "";
	var race = " ";
	if((this.race == Race.Human) && (Math.random() < 0.1)) race += this.race.Short(Gender.male);
	if((this.race != Race.Human) && (Math.random() < 0.5)) race += this.race.Short(Gender.male);
	return desc.adj + knotted + sheath + race + " " + noun;
}
// TODO
Cock.prototype.TipShort = function() {
	var adj = "";
	
	if(this.race.isRace(Race.Horse)) adj = "flared ";
	else if(this.race.isRace(Race.Canine, Race.Reptile)) adj = "tapered ";
	else if(this.race.isRace(Race.Feline)) adj = "barbed ";
	
	var nouns = [
	"tip",
	"head"
	];
	var noun = _.sample(nouns);
	
	return adj + noun;
}
// TODO (knot size?)
Cock.prototype.KnotShort = function() {
	return "knot";
}
// TODO: Better descriptions
Cock.prototype.aLong = function() {
	var desc    = this.Desc();
	var noun    = this.noun();
	var knotted = this.Knot() ? ", knotted" : "";
	var sheath  = this.Sheath() ? ", sheathed" : "";
	return desc.a + " " + desc.adj + knotted + sheath + " " + this.race.Short(Gender.male) + " " + noun + ", " + desc.len + " long and " + desc.thickness + " thick";
}
// TODO: Better descriptions
Cock.prototype.Long = function() {
	var desc    = this.Desc();
	var noun    = this.noun();
	var knotted = this.Knot() ? ", knotted" : "";
	var sheath  = this.Sheath() ? ", sheathed" : "";
	return desc.adj + knotted + sheath + " " + this.race.Short(Gender.male) + " " + this.noun() + ", " + desc.len + " long and " + desc.thickness + " thick";
}
