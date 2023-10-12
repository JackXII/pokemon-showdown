'use strict';

const assert = require('../../assert');
const common = require('../../common');

let battle;

describe('Crystal Jaw', function () {
	afterEach(function () {
		battle.destroy();
	});

	it("should deal half damage with physical move when having crystal jaw", function () {
		battle = common.createBattle([[
			{species: 'diglett', ability: 'crystaljaw',moves: ['earthquake']},
		], [
			{species: 'diglett', moves: ['earthquake']},
		]]);
		battle.makeChoices();
		const attacker = battle.p1.active[0];
		const defender = battle.p2.active[0];
		const lostHpAttacker = attacker.maxhp - attacker.hp;
		const lostHpDefender = defender.maxhp - defender.hp;
		assert.notEqual(lostHpAttacker, lostHpDefender);
	});

	it("should deal more damage with special move when having crystal jaw targeting a pokemon with less def then sp. def", function () {
		battle = common.createBattle([[
			{species: 'florges', ability: 'crystaljaw', moves: ['moonblast']},
		], [
			{species: 'florges', ability: 'shellarmor', moves: ['moonblast']},
		]]);
		battle.makeChoices();
		const attacker = battle.p1.active[0];
		const defender = battle.p2.active[0];
		const lostHpAttacker = attacker.maxhp - attacker.hp;
		const lostHpDefender = defender.maxhp - defender.hp;
		assert.notEqual(lostHpAttacker, lostHpDefender);
	});
});
