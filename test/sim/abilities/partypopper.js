'use strict';

const assert = require('../../assert');
const common = require('../../common');

let battle;

describe('Party Popper', function () {
	afterEach(function () {
		battle.destroy();
	});

	it("should heal entering ally to their max HP when this Pokemon is KOed", function () {
		battle = common.createBattle([[
			{species: 'joltik', moves: ['sleeptalk']},
			{species: 'galvantula', ability: "partypopper", moves: ['lunge']},
		], [
			{species: 'shiftry', ability: 'noguard', moves: ['fissure', 'cut', 'sleeptalk']},
		]]);
		battle.makeChoices('move sleeptalk', 'move cut');
		let attacker = battle.p1.active[0];
		battle.makeChoices('switch 2', 'move fissure');
		attacker = battle.p1.active[0];
		battle.makeChoices('switch 2', 'move sleeptalk');
		attacker = battle.p1.active[0];
		assert.equal(attacker.hp, attacker.maxhp - Math.floor(attacker.maxhp / 4));
	});
});
