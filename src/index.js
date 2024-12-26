#!/usr/bin/env node

const {getData, commitCount, issueCount, pullCount, deleteCount, starredCount } = require('./func.js');

const args = process.argv.slice(2); //argumentos do command line

async function main() {
	try{
		let [events, starred] = await getData(args[0]);
		commitCount(events);
		issueCount(events);
		pullCount(events);
		deleteCount(events);
		starredCount(starred);
	}catch(err) {
		console.error(err);
	}
}

main();