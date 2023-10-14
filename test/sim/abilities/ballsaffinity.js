'use strict';

const assert = require('../../assert');
const common = require('../../common');

let battle;

describe('Ball\'s Affinity', function () {
	afterEach(function () {
		battle.destroy();
	});

	it("if held pokeball than random boost 1 stat", function () {
		battle = common.createBattle([[
			{species: 'bowllo', item: 'pokeball', ability: 'ballsaffinity', moves: ['lunge']},
		], [
			{species: 'shiftry', ability: 'aftermath', moves: ['sleeptalk']},
		]]);
		battle.makeChoices();
		const attacker = battle.p1.active[0];
		assert.equal(1, attacker.boosts['accuracy']);
	});

	it("if should have bug and water type when holding netball ", function () {
		battle = common.createBattle([[
			{species: 'bowllo', item: 'netball', ability: 'ballsaffinity', moves: ['lunge']},
		], [
			{species: 'shiftry', ability: 'aftermath', moves: ['sleeptalk']},
		]]);
		battle.makeChoices();
		const attacker = battle.p1.active[0];
		assert.equal(true, attacker.hasType('Bug'));
	});
});
