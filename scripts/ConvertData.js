const fs = require('fs');
const _ = require('lodash');

const fileName = process.argv[2];

if (!fileName) {
    console.error('Please provide a file name as an argument.');
    process.exit(1);
}

fs.readFile(fileName, 'utf-8', (err, data) => {
	if (err) {
		console.error(err);
		return;
	}

	const serverStats = JSON.parse(data);
	const dataFrames = {};
	for (const serverStat of serverStats) {
		const serverId = serverStat['server_id'];
		const date = new Date(serverStat['collection_date']).toISOString().split('T')[0];
		const gheStats = serverStat['ghe_stats'];
		if (!(serverId in dataFrames)) {
			dataFrames[serverId] = {};
		}

		for (const [key, value] of Object.entries(gheStats)) {
			if (!(key in dataFrames[serverId])) {
				dataFrames[serverId][key] = [];
			}
			for (const [subKey, subValue] of Object.entries(value)) {
				const newRow = { Date: date, Type: subKey, Count: subValue };
				dataFrames[serverId][key].push(newRow);
			}
		}

		dataFrames[serverId]['info'] = {
			server_id: serverId,
			schema_version: serverStat['schema_version'],
			ghes_version: serverStat['ghes_version'],
			github_connect: serverStat['github_connect'],
			host_name: serverStat['host_name'],
		};
	}

	const allData = {};

	
	fs.writeFile('src/data/data.json', JSON.stringify(allData, null, 4), err => {
		if (err) {
			console.error(err);
			return;
		}
	});
});
