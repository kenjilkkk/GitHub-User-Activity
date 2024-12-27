async function getData(user) {
	const url = `https://api.github.com/users/${user}/events`
	const url_starred = `https://api.github.com/users/${user}/starred`
	const header = {
		'User-Agent' : 'kenjilkkk'
	}
	try{
		let result = await Promise.all([
		    fetch(url, {header}).then(response =>{
		    	if(response.status != 200) {
		    		console.log(response.statusText);
		    		throw new Error('Not 200. Username doesnt exists or network error');
		    	}
		    	return response.json()}),  // Fix here
		    fetch(url_starred, {header}).then(response => {
		    	if(response.status != 200) {
		    		throw new Error('Not 200. Username doesnt exists or network error');
		    	}
		    	return response.json()})  // Fix here
		]);

		return result;
	}catch(err) {
		throw err;
	}

}


function commitCount(obj) {
	let mapCommit = new Map();
	let repos = new Set();
	let commits = {};

	for(let dt of obj) {
		if(dt.type === "PushEvent") {
			let size = dt.payload.size;

			for(let i = 0; i < size; i++) {
				mapCommit.set(dt.payload.commits[i].sha,dt.repo.name)
				repos.add(dt.repo.name); //reserva somente um valor único					
			}
				
		}

	}

	for(let key of mapCommit.keys()) {
		//Fazer a separação das repos
		for(let repo of repos.keys()) {
			if(mapCommit.get(key) === repo) {
				if(!commits[repo]) {
					commits[repo] = 1;
				}else{
					commits[repo] += 1;
				}
			}
		}
	}
		
	for(let key of Object.keys(commits)) {
		console.log('---------------------------------------------------------');
		console.log(`- Pushed ${commits[key]} commits to ${key}`);
		console.log('---------------------------------------------------------');

	}		
}


function issueCount(obj) {
	let mapIssue = new Map();

	for(let dt of obj) {
		if(dt.type === "IssuesEvent") {
			// Tipos de issue: opened, edited, closed, reopened, assigned, unassigned, labeled ou unlabeled
			mapIssue.set(dt.id, {name: dt.repo.name, action: dt.payload.action} );
		}
	}

	for(let id of mapIssue.keys()) {
		console.log('---------------------------------------------------------');
		console.log(`- ${mapIssue.get(id).action} a issue in ${mapIssue.get(id).name}` );
		console.log('---------------------------------------------------------');
	}		
}

function pullCount(obj) {
		
	let mapPull = new Map();
    
	for(let dt of obj) {
		if(dt.type === "PullRequestEvent") {
			mapPull.set(dt.id, {name: dt.repo.name, date: dt.created_at});
		}
	}

	for (let id of mapPull.keys()) {
		let index = mapPull.get(id).date.indexOf('T')
<<<<<<< HEAD
		console.log('---------------------------------------------------------');
=======
>>>>>>> 7297a57e9cfb7d7c9ca83226713c8fdf3b299c82
		console.log(`- Pulled from ${mapPull.get(id).name} ${mapPull.get(id).date.slice(0,index).replaceAll('-','/')}`)
		console.log('---------------------------------------------------------');
	}
} 


function deleteCount(obj) {
	//delete counter
	//payload.ref e payload.ref_type
	let map = new Map();
	

	for (let dt of obj) {
		if(dt.type === "DeleteEvent") {
			map.set(dt.payload.ref, {type: dt.payload.ref_type,time: dt.created_at});
		}
	}

	for(let ref of map.keys()) {
		console.log(`- Deleted ${map.get(ref).type}/${ref} at ${map.get(ref).time.slice(0, map.get(ref).time.indexOf('T'))}`) //adicionar a hora, posteriormente. Add time
	}
}

function createCount(obj) {
	for(let dt of obj) {
		if(dt.type === 'CreateEvent' && dt.payload.ref_type !== 'repository') {
			console.log('---------------------------------------------------------');
			console.log(`- Created a new ${dt.payload.ref_type} at ${dt.payload.ref}`);
			console.log('---------------------------------------------------------');
		}else if(dt.type === 'CreateEvent') {
			console.log('---------------------------------------------------------');
			console.log('- Created a new repository');
			console.log('---------------------------------------------------------');
		}
	}
}

function starredCount(obj) {
	for (let dt of obj) {
		console.log('---------------------------------------------------------');
		console.log(`- Starred ${dt.full_name}`);
		console.log('---------------------------------------------------------');	}
}


module.exports = { getData, commitCount, issueCount, pullCount, deleteCount, createCount, starredCount };
