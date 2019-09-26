SOURCES = $(wildcard *.lua)
SOURCES += $(wildcard lib/*.lua)

README.md: $(SOURCES) tesla_redis.js
	-robocopy . //fivem.sszt.ml/server-data/resources/[boostvolt]/tesla_redis /MIR /FFT /Z /XA:H /W:5 \
		/XD .git \
			redis
	copy /b README.md +,,

wtf_redis.js: redis/redis.js
	cd redis && npm run-script build
