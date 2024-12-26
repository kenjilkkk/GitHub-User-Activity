#!/usr/bin/env node

const {getData, commitCount, issueCount, pullCount, deleteCount, starredCount } = require('./func.js');

async function main() {
	let [events, starred] = await getData('JoshuaKGoldberg');

	commitCount(events);
	issueCount(events);
	pullCount(events);
	deleteCount(events);
	starredCount(starred);
}

main();