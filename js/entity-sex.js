
Entity.prototype.Genitalia = function() {
	return this.body.gen;
}

// TODO: affect with things such as stretch, lust, perks etc
Entity.prototype.VagCap = function() {
	return this.FirstVag().capacity.Get();
}
Entity.prototype.OralCap = function() {
	return this.Mouth().capacity.Get();
}
Entity.prototype.AnalCap = function() {
	return this.Butt().capacity.Get();
}

Entity.prototype.ResetVirgin = function() {
	this.Butt().virgin = true;
	var vags = this.AllVags();
	for(var i = 0; i < vags.length; i++)
		vags[i].virgin = true;
}

// Convenience functions, cock
Entity.prototype.NumCocks = function() {
	return this.body.cock.length;
}
Entity.prototype.FirstCock = function() {
	return this.body.cock[0];
}
Entity.prototype.FirstClitCockIdx = function() {
	for(var i=0,j=this.body.cock.length; i<j; i++) {
		var c = this.body.cock[i];
		if(c.vag)
			return i;
	}
	return -1;
}
Entity.prototype.BiggestCock = function(cocks, incStrapon) {
	cocks = cocks || this.body.cock;
	var c = cocks[0];
	if(c) {
		var cSize = cocks[0].length.Get() * cocks[0].thickness.Get();
		for(var i=1,j=cocks.length; i<j; i++) {
			var newSize = cocks[i].length.Get() * cocks[i].thickness.Get();
			if(newSize > cSize) {
				cSize = newSize;
				c = cocks[i];
			}
		};
	}
	if(c)
		return c;
	else if(incStrapon && this.strapOn)
		return this.strapOn.cock;
}
Entity.prototype.CocksThatFit = function(orifice, onlyRealCocks, extension) {
	var ret = [];
	for(var i=0,j=this.body.cock.length; i<j; i++) {
		var c = this.body.cock[i];
		if(!orifice || orifice.Fits(c, extension))
			ret.push(c);
	};
	if(ret.length == 0 && !onlyRealCocks && this.strapOn) {
		var c = this.strapOn.cock;
		if(!orifice || orifice.Fits(c, extension))
			ret.push(c);
	}
	return ret;
}
Entity.prototype.AllCocksCopy = function() {
	var ret = [];
	for(var i=0,j=this.body.cock.length; i<j; i++) {
		var c = this.body.cock[i];
			ret.push(c);
	};
	return ret;
}
Entity.prototype.AllCocks = function() {
	return this.body.cock;
}
// TODO: Race too
Entity.prototype.MultiCockDesc = function(cocks) {
	cocks = cocks || this.body.cock;
	if(cocks.length == 0) {
		if(this.strapOn)
			return this.strapOn.cock.Short();
		else
			return "[NO COCKS]";
	}
	else if(cocks.length == 1)
		return cocks[0].Short();
	else
		return Text.Quantify(cocks.length) + " of " + cocks[0].Desc().adj + " " + cocks[0].nounPlural();
}



// Convenience functions, vag
Entity.prototype.NumVags = function() {
	return this.body.vagina.length;
}
Entity.prototype.FirstVag = function() {
	return this.body.vagina[0];
}
Entity.prototype.VagsThatFit = function(capacity) {
	for(var i=0,j=this.body.vagina.length; i<j; i++) {
		var size = this.body.vagina[i].capacity.Get();
		if(size >= capacity)
			return this.body.vagina[i];
	};
	return null;
}
Entity.prototype.AllVags = function() {
	return this.body.vagina;
}
Entity.prototype.UnfertilezedWomb = function() {
	var ret = new Array();
	for(var i=0,j=this.body.vagina.length; i<j; i++){
		var womb = this.body.vagina[i].womb;
		if(womb.pregnant == false)
			ret.push(womb);
	};
	return ret;
}


// Convenience functions, breasts
Entity.prototype.NumBreastRows = function() {
	return this.body.breasts.length;
}
Entity.prototype.FirstBreastRow = function() {
	return this.body.breasts[0];
}
Entity.prototype.AllBreastRows = function() {
	return this.body.breasts;
}
Entity.prototype.BiggestBreasts = function() {
	var breasts = this.body.breasts;
	var c = breasts[0];
	var cSize = breasts[0].Size();
	for(var i=1,j=breasts.length; i<j; i++) {
		var newSize = breasts[i].Size();
		if(newSize > cSize) {
			cSize = newSize;
			c = breasts[i];
		}
	};
	return c;
}
Entity.prototype.SmallestBreasts = function() {
	var breasts = this.body.breasts;
	var c = breasts[0];
	var cSize = breasts[0].Size();
	for(var i=1,j=breasts.length; i<j; i++) {
		var newSize = breasts[i].Size();
		if(newSize < cSize) {
			cSize = newSize;
			c = breasts[i];
		}
	};
	return c;
}
Entity.prototype.BiggestNips = function() {
	var breasts = this.body.breasts;
	var c = breasts[0];
	var cSize = breasts[0].NipSize();
	for(var i=1,j=breasts.length; i<j; i++) {
		var newSize = breasts[i].NipSize();
		if(newSize > cSize) {
			cSize = newSize;
			c = breasts[i];
		}
	};
	return c;
}
Entity.prototype.SmallestNips = function() {
	var breasts = this.body.breasts;
	var c = breasts[0];
	var cSize = breasts[0].NipSize();
	for(var i=1,j=breasts.length; i<j; i++) {
		var newSize = breasts[i].NipSize();
		if(newSize < cSize) {
			cSize = newSize;
			c = breasts[i];
		}
	};
	return c;
}
Entity.prototype.NipplesThatFitLen = function(capacity) {
	var ret = new Array();
	for(var i=0,j=this.body.breasts.length; i<j; i++) {
		var row = this.body.breasts[i];
		if(row.nippleType == NippleType.lipple ||
			row.nippleType == NippleType.cunt) {
			if(row.NipSize() >= capacity)
				ret.push(row);
		}
	};
	return ret;
}



Entity.prototype.AllOrfices = function(capacity) {
	capacity = capacity || 0;
	var ret = new Array();
	
	var vags = this.VagsThatFit(capacity);
	for(var i=0,j=vags.length; i<j; i++)
		ret.push({type: BodyPartType.vagina, obj: vags[i]});
	var nips = this.NipplesThatFitLen(capacity);
	for(var i=0,j=nips.length; i<j; i++)
		ret.push({type: BodyPartType.nipple, obj: nips[i]});
	if(this.body.ass.capacity.Get() >= capacity)
		ret.push({type: BodyPartType.ass, obj: this.body.ass});
	if(this.body.head.mouth.capacity.Get() >= capacity)
		ret.push({type: BodyPartType.mouth, obj: this.body.head.mouth});
	
	return ret;
}

Entity.prototype.AllPenetrators = function(orifice) {
	var ret = new Array();
	
	var cocks = this.CocksThatFit(orifice);
	for(var i=0,j=cocks.length; i<j; i++)
		ret.push({type: BodyPartType.cock, obj: cocks[i]});
	// TODO: Tongue, Nipple-cock, Clitcock
	
	return ret;
}

Entity.prototype.Lactation = function() {
	return this.lactHandler.Lactation();
}
Entity.prototype.Milk = function() {
	return this.lactHandler.milk.Get();
}
Entity.prototype.MilkCap = function() {
	return this.lactHandler.MilkCap();
}
Entity.prototype.LactationProgress = function(oldMilk, newMilk, lactationRate) {
	//Placeholder, implement in each entity if applicable
}

Entity.prototype.Fuck = function(cock, expMult) {
	expMult = expMult || 1;
	this.AddSexExp(expMult);
	// TODO: Stretch
}

// Fuck entitys mouth (vag, cock)
Entity.prototype.FuckOral = function(mouth, cock, expMult) {
	expMult = expMult || 1;
	this.AddSexExp(expMult);
	// TODO: Stretch
}

// Fuck entitys anus (anus, cock)
Entity.prototype.FuckAnal = function(butt, cock, expMult) {
	var parse = {
		name   : this.NameDesc(),
		has    : this.has(),
		hisher : this.hisher()
	};
	expMult = expMult || 1;
	if(butt.virgin) {
		butt.virgin = false;
		Text.Add("<b>[name] [has] lost [hisher] anal virginity.</b>", parse);
		Text.NL();
		this.AddSexExp(5 * expMult);
	}
	else
		this.AddSexExp(expMult);
	
	if(cock) {
		butt.StretchOrifice(this, cock, false);
	}
	Text.Flush();
}

// Fuck entitys vagina (vag, cock)
Entity.prototype.FuckVag = function(vag, cock, expMult) {
	var parse = {
		name   : this.NameDesc(),
		has    : this.has(),
		hisher : this.hisher()
	};
	expMult = expMult || 1;
	if(vag.virgin) {
		vag.virgin = false;
		Text.Add("<b>[name] [has] lost [hisher] virginity.</b>", parse);
		Text.NL();
		this.AddSexExp(5 * expMult);
	}
	else
		this.AddSexExp(expMult);
	
	if(cock) {
		vag.StretchOrifice(this, cock, false);
	}
	Text.Flush();
}

/*
 * New Sex functions
 */
Sex = {};

Sex.Cunnilingus = function(giver, reciever) {
	if(giver)    giver.sex.gCunn++;
	if(reciever) reciever.sex.rCunn++;
}
Sex.Blowjob = function(giver, reciever) {
	if(giver)    giver.sex.gBlow++;
	if(reciever) reciever.sex.rBlow++;
}
Sex.Vaginal = function(giver, reciever) {
	if(giver)    giver.sex.gVag++;
	if(reciever) reciever.sex.rVag++;
}
Sex.Anal = function(giver, reciever) {
	if(giver)    giver.sex.gAnal++;
	if(reciever) reciever.sex.rAnal++;
}
Sex.Preg = function(father, mother, num) {
	num = num || 1;
	if(father) father.sex.sired += num;
	if(mother) mother.sex.birth += num;
}

Entity.prototype.Sexed = function() {
	if(this.flags["Sexed"] && this.flags["Sexed"] != 0)
		return true;
	for(var flag in this.sex)
		if(this.sex[flag] != 0)
			return true;
	return false;
}

Entity.prototype.RestoreCum = function(quantity) {
	quantity = quantity || 1;
	var balls = this.Balls();
	return balls.cum.IncreaseStat(balls.CumCap(), quantity);
}
// TODO
Entity.prototype.Cum = function() {
	return this.Balls().cum.Get();
}
Entity.prototype.CumOutput = function(mult) {
	mult = mult || 1;
	var balls = this.Balls();
	var cum = mult * balls.CumCap() / 4;
	cum *= this.LustLevel() + 0.5;
	
	cum = Math.min(cum, this.Cum());
	return cum;
}
// TODO test
Entity.prototype.OrgasmCum = function(mult) {
	mult = mult || 1;
	var balls = this.Balls();
	var cumQ  = this.CumOutput(mult);
	
	this.AddLustFraction(-1);
	
	balls.cum.DecreaseStat(0, cumQ);
	if(DEBUG) {
		Text.NL();
		Text.Add("<b>[name] came ([cum]).</b>", {name: this.NameDesc(), cum: cumQ.toFixed(2)});
		Text.NL();
		Text.Flush();
	}
	return cumQ;
}
