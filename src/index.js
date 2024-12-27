#!/usr/bin/env node

const {getData, commitCount, issueCount, pullCount, deleteCount, createCount ,starredCount } = require('./func.js');

const args = process.argv.slice(2); //argumentos do command line

async function main() {
	// filter -> ./index.js <option> <user> 
	try{
		let [events, starred] = await getData(args[0]);
		commitCount(events); //commits
		issueCount(events); //issues
		pullCount(events); //pullRequests
		deleteCount(events); //delete
		createCount(events);
		starredCount(starred); //starred
	}catch(err) {
		console.error(err);
	}
}

main();