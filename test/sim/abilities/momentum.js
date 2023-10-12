'use strict';

const assert = require('../../assert');
const common = require('../../common');

let battle;

describe('Momentum', function () {
	afterEach(function () {
		battle.destroy();
	});

	it(`should increase the damage of moves that have been used successfully and consecutively`, function () {
		battle = common.createBattle([[
			{species: 'wynaut', ability: 'momentum', moves: ['psystrike']},
		], [
			{species: 'cleffa', evs: {hp: 252}, ability: 'shellarmor', moves: ['sleeptalk']},
		]]);
		battle.makeChoices();
		const cleffa = battle.p2.active[0];
		const hpAfterOneAttack = cleffa.hp;
		battle.makeChoices();
		const damage = hpAfterOneAttack - cleffa.hp;
		assert.bounded(damage, [115, 137]);
	});

	it(`should reset the multiplier after switching moves`, function () {
		battle = common.createBattle([[
			{species: 'wynaut', ability: 'momentum', moves: ['psystrike', 'sleeptalk']},
		], [
			{species: 'cleffa', evs: {hp: 252}, ability: 'shellarmor', moves: ['sleeptalk']},
		]]);
		battle.makeChoices();
		const cleffa = battle.p2.active[0];
		const hpAfterOneAttack = cleffa.hp;
		battle.makeChoices('move sleeptalk', 'auto');
		battle.makeChoices();
		const damage = hpAfterOneAttack - cleffa.hp;
		assert.bounded(damage, [96, 114]);
	});

	it(`should reset the multiplier after hitting Protect`, function () {
		battle = common.createBattle([[
			{species: 'wynaut', ability: 'momentum', moves: ['psystrike']},
		], [
			{species: 'cleffa', evs: {hp: 252}, ability: 'shellarmor', moves: ['sleeptalk', 'protect']},
		]]);
		battle.makeChoices();
		const cleffa = battle.p2.active[0];
		const hpAfterOneAttack = cleffa.hp;
		battle.makeChoices('auto', 'move protect');
		battle.makeChoices();
		const damage = hpAfterOneAttack - cleffa.hp;
		assert.bounded(damage, [96, 114]);
	});

	it(`should instantly start moves that use a charging turn at Momentum 1 boost level, then increase linearly`, function () {
		battle = common.createBattle([[
			{species: 'dusknoir', ability: 'momentum', moves: ['dig']},
		], [
			{species: 'blissey', ability: 'shellarmor', moves: ['softboiled']},
		]]);
		battle.makeChoices();
		battle.makeChoices();
		const blissey = battle.p2.active[0];
		let damage = blissey.maxhp - blissey.hp;

		// Momentum 1 and 2 damage rolls always overlap in range, so we can't use assert.bounded here.
		let possibleDamageRolls = [290, 294, 296, 300, 304, 307, 311, 314, 318, 320, 324, 328, 331, 335, 338, 342];
		const damageWasMomentum1Boosted = possibleDamageRolls.includes(damage);
		assert(damageWasMomentum1Boosted, `Dig should be Momentum 1 boosted`);

		battle.makeChoices();
		battle.makeChoices();
		damage = blissey.maxhp - blissey.hp;
		possibleDamageRolls = [339, 343, 346, 350, 354, 358, 363, 367, 371, 374, 378, 382, 386, 391, 395, 399];
		const damageWasMomentum2Boosted = possibleDamageRolls.includes(damage);
		assert(damageWasMomentum2Boosted, `Dig should be Momentum 2 boosted`);
	});

	it(`should not instantly start moves that skip a charging turn at Momentum 1 boost level`, function () {
		battle = common.createBattle([[
			{species: 'slowbro', ability: 'momentum', moves: ['solarbeam']},
		], [
			{species: 'blissey', ability: 'shellarmor', moves: ['sunnyday']},
			{species: 'blissey', ability: 'cloudnine', moves: ['luckychant']},
		]]);
		battle.makeChoices();
		const blissey = battle.p2.active[0];
		let damage = blissey.maxhp - blissey.hp;
		assert.bounded(damage, [67, 79], `Solar Beam should not be Momentum boosted`);

		battle.makeChoices('auto', 'switch 2');
		battle.makeChoices();
		const newBlissey = battle.p2.active[0];
		damage = newBlissey.maxhp - newBlissey.hp;
		assert.bounded(damage, [80, 95], `Solar Beam should be Momentum 1 boosted`);
	});

	it.skip(`should use called moves to determine the Momentum multiplier`, function () {
		battle = common.createBattle([[
			{species: 'goomy', ability: 'momentum', moves: ['copycat', 'surf']},
		], [
			{species: 'clefable', evs: {hp: 252}, ability: 'shellarmor', moves: ['softboiled', 'surf']},
		]]);
		battle.makeChoices('move copycat', 'move surf');
		const clefable = battle.p2.active[0];
		let damage = clefable.maxhp - clefable.hp;
		assert.bounded(damage, [45, 53], `Surf should not be Momentum boosted`);

		const hpAfterOneAttack = clefable.hp;
		battle.makeChoices('move copycat', 'move surf');
		damage = hpAfterOneAttack - clefable.hp;
		assert.bounded(damage, [54, 64], `Surf should be Momentum 1 boosted`);

		battle.makeChoices('move surf', 'move softboiled');
		damage = clefable.maxhp - clefable.hp;
		assert.bounded(damage, [63, 74], `Surf should be Momentum 2 boosted`);
	});
});