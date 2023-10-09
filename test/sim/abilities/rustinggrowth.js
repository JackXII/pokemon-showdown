'use strict';

const assert = require('../../assert');
const common = require('../../common');

let battle;

describe('Rusting Growth', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('should be super effective against Steel-type pokemon ', function () {
		battle = common.createBattle({gameType: 'singles'}, [[
			{species: 'gastronaut', ability: 'rustinggrowth', moves: ['seedbomb']},
		], [
			{species: 'copperajah', moves: ['sleeptalk']},
		]]);

		battle.makeChoices('move seedbomb 1', 'auto');
		const copperajah = battle.p2.active[0];
		let damage = copperajah.maxhp - copperajah.hp;
		assert.bounded(damage, [168, 196]);
	});

	it('should be super effective against Steel/Neutral to Grass-type pokemon ', function () {
		battle = common.createBattle({gameType: 'singles'}, [[
			{species: 'gastronaut', ability: 'rustinggrowth', moves: ['seedbomb']},
		], [
			{species: 'gholdengo', moves: ['sleeptalk']},
		]]);

		battle.makeChoices('move seedbomb 1', 'auto');
		const gholdengo = battle.p2.active[0];
		let damage = gholdengo.maxhp - gholdengo.hp;
		assert.bounded(damage, [128, 152]);
	});

	it('should be neutral effective against Steel/Resist to Grass-type pokemon ', function () {
		battle = common.createBattle({gameType: 'singles'}, [[
			{species: 'gastronaut', ability: 'rustinggrowth', moves: ['seedbomb']},
		], [
			{species: 'skarmory', moves: ['sleeptalk']},
		]]);

		battle.makeChoices('move seedbomb 1', 'auto');
		const skarmory = battle.p2.active[0];
		let damage = skarmory.maxhp - skarmory.hp;
		assert.bounded(damage, [22, 52]);
	});

	it('should be x4 effective against Steel/Weak to Grass-type pokemon ', function () {
		battle = common.createBattle({gameType: 'singles'}, [[
			{species: 'gastronaut', ability: 'rustinggrowth', moves: ['seedbomb']},
		], [
			{species: 'empoleon', moves: ['sleeptalk']},
		]]);

		battle.makeChoices('move seedbomb 1', 'auto');
		const empoleon = battle.p2.active[0];
		let damage = empoleon.maxhp - empoleon.hp;
		assert.bounded(damage, [268, 324]);
	});

});
