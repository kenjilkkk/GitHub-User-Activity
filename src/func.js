async function getData(user) {
	const url = `https://api.github.com/users/${user}/events`
	const url_starred = `https://api.github.com/users/${user}/starred`

	try{
		let result = await Promise.all([
		    fetch(url).then(response =>{
		    	if(response.status != 200) {
		    		throw new Error('Not 200. Username doesnt exists or network error');
		    	}
		    	return response.json()}),  // Fix here
		    fetch(url_starred).then(response => {
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
		console.log(`- Pushed ${commits[key]} commits to ${key}`)

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
		console.log(`- ${mapIssue.get(id).action} a issue in ${mapIssue.get(id).name}` )	
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
		console.log(`- Pulled from ${mapPull.get(id).name} ${mapPull.get(id).date.slice(0,index).replaceAll('-','/')}`)
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
		console.log(`Deleted ${map.get(ref).type}/${ref} at ${map.get(ref).time.slice(0, map.get(ref).time.indexOf('T'))}`) //adicionar a hora, posteriormente. Add time
	}
}

function starredCount(obj) {
	for (let dt of obj) {
		console.log(`Starred ${dt.full_name}`)
	}
}

module.exports = { getData, commitCount, issueCount, pullCount, deleteCount, starredCount };
