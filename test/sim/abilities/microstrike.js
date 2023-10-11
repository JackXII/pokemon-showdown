'use strict';

const assert = require('../../assert');
const common = require('../../common');

let battle;

describe('Micro Strike', function () {
	afterEach(function () {
		battle.destroy();
	});

	it(`should increase the damage of moves based on the lightness of the target`, function () {
		battle = common.createBattle([[
			{species: 'wynaut', ability: 'microstrike', moves: ['psystrike']},
		], [
			{species: 'cleffa', evs: {hp: 252}, ability: 'shellarmor', moves: ['sleeptalk']},
		]]);
		battle.p2.active[0].weighthg = 9000;
		battle.makeChoices();
		let cleffa = battle.p2.active[0];
		let damage = cleffa.maxhp - cleffa.hp;
		assert.bounded(damage, [96, 114]);

		battle = common.createBattle([[
			{species: 'wynaut', ability: 'microstrike', moves: ['psystrike']},
		], [
			{species: 'cleffa', evs: {hp: 252}, ability: 'shellarmor', moves: ['sleeptalk']},
		]]);
		battle.p2.active[0].weighthg = 8000;
		battle.makeChoices();
		cleffa = battle.p2.active[0];
		damage = cleffa.maxhp - cleffa.hp;
		assert.bounded(damage, [96*1.2, 114*1.2]);

		battle = common.createBattle([[
			{species: 'wynaut', ability: 'microstrike', moves: ['psystrike']},
		], [
			{species: 'cleffa', evs: {hp: 252}, ability: 'shellarmor', moves: ['sleeptalk']},
		]]);
		battle.p2.active[0].weighthg = 5500;
		battle.makeChoices();
		cleffa = battle.p2.active[0];
		damage = cleffa.maxhp - cleffa.hp;
		assert.bounded(damage, [96*1.4, 114*1.4]);

		battle = common.createBattle([[
			{species: 'wynaut', ability: 'microstrike', moves: ['psystrike']},
		], [
			{species: 'cleffa', evs: {hp: 252}, ability: 'shellarmor', moves: ['sleeptalk']},
		]]);
		battle.p2.active[0].weighthg = 4000;
		battle.makeChoices();
		cleffa = battle.p2.active[0];
		damage = cleffa.maxhp - cleffa.hp;
		assert.bounded(damage, [96*1.6, 114*1.6]);

		battle = common.createBattle([[
			{species: 'wynaut', ability: 'microstrike', moves: ['psystrike']},
		], [
			{species: 'cleffa', evs: {hp: 252}, ability: 'shellarmor', moves: ['sleeptalk']},
		]]);
		battle.p2.active[0].weighthg = 2000;
		battle.makeChoices();
		cleffa = battle.p2.active[0];
		damage = cleffa.maxhp - cleffa.hp;
		assert.bounded(damage, [96*1.8, 114*1.8]);

		battle = common.createBattle([[
			{species: 'wynaut', ability: 'microstrike', moves: ['psystrike']},
		], [
			{species: 'cleffa', evs: {hp: 252}, ability: 'shellarmor', moves: ['sleeptalk']},
		]]);
		battle.makeChoices();
		cleffa = battle.p2.active[0];
		damage = cleffa.maxhp - cleffa.hp;
		assert.bounded(damage, [96*2, 114*2]);
	});

});
