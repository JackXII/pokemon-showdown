'use strict';

const assert = require('../../assert');
const common = require('../../common');

let battle;

describe('First Impact', function () {
	afterEach(function () {
		battle.destroy();
	});

	it(`should deal 1/4 maxhp damages entering battle`, function () {
		battle = common.createBattle([[
			{species: 'wynaut', ability: 'firstimpact', moves: ['psystrike']},
		], [
			{species: 'cleffa', evs: {hp: 252}, ability: 'shellarmor', moves: ['sleeptalk']},
		]]);
		let cleffa = battle.p2.active[0];
		let damage = cleffa.maxhp - cleffa.hp;
		assert.bounded(damage, [(cleffa.maxhp/4)-1, (cleffa.maxhp/4)+1]);
	});

	it(`should deal 1/4 maxhp damages entering battle to every other pokemon`, function () {
		battle = common.createBattle({gameType: 'doubles'}, [[
			{species: 'aron', ability: 'firstimpact', moves: ['ironhead']},
			{species: 'aron', moves: ['ironhead']},
		], [
			{species: 'wynaut', moves: ['sleeptalk']},
			{species: 'wynaut', moves: ['sleeptalk']},
		]]);
		const aronAlly = battle.p1.active[1];
		const wynautLeft = battle.p2.active[0];
		const wynautRight = battle.p2.active[1];
		let damageAlly = aronAlly.maxhp - aronAlly.hp;
		let damageLeft = wynautLeft.maxhp - wynautLeft.hp;
		let damageRight = wynautRight.maxhp - wynautRight.hp;
		
		assert.bounded(damageLeft, [(wynautLeft.maxhp/4)-1, (wynautLeft.maxhp/4)+1]);
		assert.bounded(damageRight, [(wynautRight.maxhp/4)-1, (wynautRight.maxhp/4)+1]);
		assert.bounded(damageAlly, [(aronAlly.maxhp/4)-1, (aronAlly.maxhp/4)+1]);
	});

	it(`should deal 1/4 maxhp damages entering battle and switching out should not repeat`, function () {
		battle = common.createBattle([[
			{species: 'wynaut', ability: 'firstimpact', moves: ['psystrike']},
			{species: 'wynaut', moves: ['psystrike']},
			{species: 'wynaut', moves: ['psystrike']},
			{species: 'wynaut', moves: ['psystrike']},
			{species: 'wynaut', moves: ['psystrike']},
		], [
			{species: 'cleffa', evs: {hp: 252}, ability: 'shellarmor', moves: ['sleeptalk']},
		]]);
		
		battle.makeChoices('switch 1', 'move sleeptalk');
		let cleffa = battle.p2.active[0];
		let damage1 = cleffa.maxhp - cleffa.hp;
		battle.makeChoices('switch 1', 'move sleeptalk');
		let damage2 = cleffa.maxhp - cleffa.hp;
		assert.equal(damage1, damage2);
	});

});
