rm -rf docs/ && clojure -m figwheel.main --optimizations whitespace -bo dev
cp -r resources/public docs/
