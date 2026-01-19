#!/usr/bin/env bash

echo "Creating project..."

mkdir project
cd project

git init

touch README.md
mkdir resources
touch "resources/family picture.jpg"
touch resources/icon.png
touch resources/logo.png
touch settings.conf
mkdir src
mkdir src/database
mkdir src/profile
touch src/program.java

git add .
git commit -m "initial commit"

sleep 3

echo "Setup project..."

echo "Welcome to my project" > README.md

rm -rf src/profile

rm "resources/family picture.jpg"

git add .
git commit -m "Remove profile folder and update README"

sleep 3

ls resources

echo "Setup javascript..."

mv src/program.java src/program.js

echo "console.log('JavaScript works!');" > src/program.js


node src/program.js

git add .
git commit -m "Convert Java program to JavaScript and run it with Node"

ls ~

echo "All done!"