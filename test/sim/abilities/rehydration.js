'use strict';

const assert = require('../../assert');
const common = require('../../common');

let battle;

describe('Rehydration', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('should change the user\'s type when struck by a water move', function () {
		battle = common.createBattle([[
			{species: "Maractus-Mazah", ability: "rehydration", moves: ['recover']},
		], [
			{species: "Paras", ability: 'damp', moves: ['bubble']},
		]]);
		const maraMazah = battle.p1.active[0];
		battle.makeChoices('move Recover', 'move Bubble');
		assert(maraMazah.hasType('Grass'));
	});

	it('should not change the user\'s type if it had a Substitute when hit', function () {
		battle = common.createBattle([[
			{species: "Maractus-Mazah", ability: "rehydration", moves: ['substitute']},
		], [
			{species: "Machamp", ability: 'purepower', item: 'laggingtail', moves: ['bubble']},
		]]);
		const maraMazah = battle.p1.active[0];
		battle.makeChoices('move Substitute', 'move Bubble');
		assert.false(maraMazah.hasType('Grass'));
	});
});
