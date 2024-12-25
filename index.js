	async function getData(user) {
		const url = `https://api.github.com/users/${user}/events`
		let response;
		let result
		try{
			response = await fetch(url, {
				username: `${user}`,
				headers: {
    				'X-GitHub-Api-Version': '2022-11-28'
  				}
			});
		}catch(err) {
			console.log(err);
		}
		
		try {
			result = await response.json();
		}catch(err) {
			console.log(err);
		}

		return result;

	}

	async function processData() {
		let map = new Map();
		let repos = new Set();
		let commits = {};

		let data = await getData('kenjilkkk');
		
		for(let dt of data) {
			if(dt.payload.commits) {
				map.set(dt.payload.commits[0].sha,dt.repo.name)
				repos.add(dt.repo.name); //reserva somente um valor único
				
			}
		}

		for(let key of map.keys()) {
			//Fazer a separação das repos
			for(let repo of repos.keys()) {
				if(map.get(key) === repo) {
					if(!commits[repo]) {
						commits[repo] = 1;
					}else{
						commits[repo] += 1;
					}
				}
			}
		}
		
		for(let key of Object.keys(commits)) {
			console.log(`Pushed ${commits[key]} commits to ${key}`)

		}
	}

	processData();