PHONY:=ucd.nounihan.flat.xml
EXTRA_JSON:=$(shell find unicode -type f -name \*.json)
CURRENT_GIT:=$(shell git describe --long --tags --always --dirty 2> /dev/null|| echo unknown)

run: http-pub/data.json
	(cd http-pub; python -m SimpleHTTPServer)

# Set up git pages
# (cd gh-pages; git checkout --orphan gh-pages; git rm -rf .)
gh-pages:
	git clone git@github.com:msiebuhr/unicodefinder.git gh-pages

commit-gh-pages: http-pub/data.json gh-pages
	cp http-pub/* gh-pages/
	(cd gh-pages; git add .; git commit --edit --message="Publish master@$(CURRENT_GIT).")

push-gh-pages:
	(cd gh-pages; git push origin gh-pages)

ucd.nounihan.flat.xml:
	wget -c http://www.unicode.org/Public/6.1.0/ucdxml/ucd.nounihan.flat.zip -O /tmp/ucd.nounihan.flat.zip
	unzip -p /tmp/ucd.nounihan.flat.zip > $@

w3c-unicode.xml:
	wget -c http://www.w3.org/2003/entities/2007xml/unicode.xml -O $@

unicode/01-w3c-unicode.json: w3c-unicode.xml w3c-xml2json.js
	./w3c-xml2json.js -i $< -o $@

unicode/00-base-unicode.json: ucd.nounihan.flat.xml ucd-xml2json.js
	./ucd-xml2json.js -i $< -o $@

http-pub/data.json: unicode/00-base-unicode.json unicode/01-w3c-unicode.json $(EXTRA_JSON)
	./compact-json.js -o $@ $^

clean:
	rm -rf http-pub/data.json
	rm -rf unicode/00-base-unicode.json
	rm -rf /tmp/ucd.*.flat.zip
