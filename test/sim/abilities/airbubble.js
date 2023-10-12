'use strict';

const assert = require('../../assert');
const common = require('../../common');

let battle;

describe('Aftermath', function () {
	afterEach(function () {
		battle.destroy();
	});

	it("should be immune to spore", function () {
		battle = common.createBattle([[
			{species: 'galvantula', moves: ['spore']},
		], [
			{species: 'diglett', ability: 'airbubble', moves: ['sleeptalk']},
		]]);
		battle.makeChoices();
		const defender = battle.p2.active[0];
		assert.equal('', defender.status);
	});

	it("should deal double damage using Flying physical/special move", function () {
		battle = common.createBattle([[
			{species: 'galvantula', moves: ['aerialace']},
		], [
			{species: 'diglett', moves: ['sleeptalk']},
		]]);
		battle.makeChoices();
		const defender = battle.p2.active[0];
		const lostHPWithOutAirBubble = defender.maxhp - defender.hp;

		battle = common.createBattle([[
			{species: 'galvantula', ability: 'airbubble', moves: ['aerialace']},
		], [
			{species: 'diglett', moves: ['sleeptalk']},
		]]);
		battle.makeChoices();
		const defender2 = battle.p2.active[0];
		const lostHPWithAirBubble = defender2.maxhp - defender2.hp;

		battle = common.createBattle([[
			{species: 'galvantula', moves: ['gust']},
		], [
			{species: 'diglett', moves: ['sleeptalk']},
		]]);
		battle.makeChoices();
		const defender3 = battle.p2.active[0];
		const lostHPWithOutAirBubbleSpecial = defender3.maxhp - defender3.hp;

		battle = common.createBattle([[
			{species: 'galvantula', ability: 'airbubble', moves: ['gust']},
		], [
			{species: 'diglett', moves: ['sleeptalk']},
		]]);
		battle.makeChoices();
		const defender4 = battle.p2.active[0];
		const lostHPWithAirBubbleSpecial = defender4.maxhp - defender4.hp;

		assert.notEqual(lostHPWithOutAirBubble, lostHPWithAirBubble);
		assert.notEqual(lostHPWithOutAirBubbleSpecial, lostHPWithAirBubbleSpecial);
	});

	it("should receive half damage receiving Ground physical/special move", function () {
		battle = common.createBattle([[
			{species: 'galvantula', moves: ['earthquake']},
		], [
			{species: 'diglett', moves: ['sleeptalk']},
		]]);
		battle.makeChoices();
		const defender = battle.p2.active[0];
		const lostHPWithOutAirBubble = defender.maxhp - defender.hp;

		battle = common.createBattle([[
			{species: 'galvantula', moves: ['earthquake']},
		], [
			{species: 'diglett', ability: 'airbubble', moves: ['sleeptalk']},
		]]);
		battle.makeChoices();
		const defender2 = battle.p2.active[0];
		const lostHPWithAirBubble = defender2.maxhp - defender2.hp;

		battle = common.createBattle([[
			{species: 'galvantula', moves: ['earthpower']},
		], [
			{species: 'diglett', moves: ['sleeptalk']},
		]]);
		battle.makeChoices();
		const defender3 = battle.p2.active[0];
		const lostHPWithOutAirBubbleSpecial = defender3.maxhp - defender3.hp;

		battle = common.createBattle([[
			{species: 'galvantula', moves: ['earthpower']},
		], [
			{species: 'diglett', ability: 'airbubble', moves: ['sleeptalk']},
		]]);
		battle.makeChoices();
		const defender4 = battle.p2.active[0];
		const lostHPWithAirBubbleSpecial = defender4.maxhp - defender4.hp;

		assert.notEqual(lostHPWithOutAirBubble, lostHPWithAirBubble);
		assert.notEqual(lostHPWithOutAirBubbleSpecial, lostHPWithAirBubbleSpecial);
	});
});
