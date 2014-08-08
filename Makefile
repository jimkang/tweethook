PM2 = node_modules/pm2/bin/pm2

run: 
	$(PM2) stop tweethook || $(PM2) start index.js -i 1 --name tweethook -f

test:
	node tests/bareminimum.js
