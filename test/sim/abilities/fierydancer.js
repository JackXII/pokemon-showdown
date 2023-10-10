'use strict';

const assert = require('../../assert');
const common = require('../../common');

let battle;

describe('Fiery Dancer', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('should boost spa after using dance moves', function () {
		battle = common.createBattle([[
			{species: 'Quetzillian', ability: 'fierydancer', moves: ['swordsdance']},
		], [
			{species: 'Oricorio', ability: 'dancer', moves: ['protect']},
		]]);
		battle.makeChoices('move swordsdance', 'move protect');
		assert.statStage(battle.p1.active[0], 'atk', 2);
		assert.statStage(battle.p1.active[0], 'spa', 1);
		assert.statStage(battle.p2.active[0], 'atk', 2);
	});

	it('should not boost spa after another pokemon use a dance moves', function () {
		battle = common.createBattle([[
			{species: 'Quetzillian', ability: 'fierydancer', moves: ['protect']},
		], [
			{species: 'Oricorio', ability: 'dancer', moves: ['swordsdance']},
		]]);
		battle.makeChoices('move protect', 'move swordsdance');
		assert.statStage(battle.p1.active[0], 'atk', 0);
		assert.statStage(battle.p1.active[0], 'spa', 0);
		assert.statStage(battle.p2.active[0], 'atk', 2);
	});

	
});
