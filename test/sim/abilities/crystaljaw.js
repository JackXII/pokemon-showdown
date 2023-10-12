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
		let defender = battle.p2.active[0];
		const lostHpDefender = defender.maxhp - defender.hp;
		battle = common.createBattle([[
			{species: 'diglett', moves: ['earthquake']},
		], [
			{species: 'diglett', moves: ['earthquake']},
		]]);
		battle.makeChoices();
		defender = battle.p2.active[0];
		const lostHpDefender2 = defender.maxhp - defender.hp;
		assert.notEqual(lostHpDefender, lostHpDefender2);
	});

	it("should deal more damage with special move when having crystal jaw targeting a pokemon with less def then sp. def", function () {
		battle = common.createBattle([[
			{species: 'florges', ability: 'crystaljaw',moves: ['moonblast']},
		], [
			{species: 'florges', moves: ['sleeptalk']},
		]]);
		battle.makeChoices();
		let defender = battle.p2.active[0];
		const lostHpDefender = defender.maxhp - defender.hp;
		battle = common.createBattle([[
			{species: 'florges', moves: ['moonblast']},
		], [
			{species: 'florges', moves: ['sleeptalk']},
		]]);
		battle.makeChoices();
		defender = battle.p2.active[0];
		const lostHpDefender2 = defender.maxhp - defender.hp;
		assert.notEqual(lostHpDefender, lostHpDefender2);
	});
});
