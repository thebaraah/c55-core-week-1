# Write your code here
=======
barbari@baraahs-MBP-2 ~ % pwd
/Users/barbari
barbari@baraahs-MBP-2 ~ % echo "Creating project..."
Creating project...
barbari@baraahs-MBP-2 ~ % mkdir project
mkdir: project: File exists
barbari@baraahs-MBP-2 ~ % cd project
barbari@baraahs-MBP-2 project % git init
Initialized empty Git repository in /Users/barbari/project/.git/
barbari@baraahs-MBP-2 project % ls -a
.	..	.git
barbari@baraahs-MBP-2 project % touch README.md
barbari@baraahs-MBP-2 project % touch settings.conf
barbari@baraahs-MBP-2 project % ls
README.md	settings.conf
barbari@baraahs-MBP-2 project % mkdir resources
barbari@baraahs-MBP-2 project % mkdir src
barbari@baraahs-MBP-2 project % mkdir src/database
barbari@baraahs-MBP-2 project % mkdir src/profile
barbari@baraahs-MBP-2 project % touch src/program.java
barbari@baraahs-MBP-2 project % touch resources/"family picture.jpg"
barbari@baraahs-MBP-2 project % touch resources/icon.png
barbari@baraahs-MBP-2 project % touch resources/logo.png
barbari@baraahs-MBP-2 project % ls -R
README.md	resources	settings.conf	src

./resources:
family picture.jpg	icon.png		logo.png

./src:
database	profile		program.java

./src/database:

./src/profile:
barbari@baraahs-MBP-2 project % git add .
barbari@baraahs-MBP-2 project % git commit -m "initial commit"
[main (root-commit) b69e699] initial commit
 6 files changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 README.md
 create mode 100644 resources/family picture.jpg
 create mode 100644 resources/icon.png
 create mode 100644 resources/logo.png
 create mode 100644 settings.conf
 create mode 100644 src/program.java
barbari@baraahs-MBP-2 project % echo "Setup project.."
Setup project..
barbari@baraahs-MBP-2 project % echo "Welcome to my project" > README.md
barbari@baraahs-MBP-2 project % rm -r src/profile
barbari@baraahs-MBP-2 project % rm resources/"family picture.jpg"
barbari@baraahs-MBP-2 project % git add .
barbari@baraahs-MBP-2 project % git commit -m "Updated"
[main 8c4b760] Updated
 2 files changed, 1 insertion(+)
 delete mode 100644 resources/family picture.jpg
barbari@baraahs-MBP-2 project % ls resources
icon.png	logo.png
barbari@baraahs-MBP-2 project % echo "Setup javascript.."
Setup javascript..
barbari@baraahs-MBP-2 project % mv src/program.java src/program.js
barbari@baraahs-MBP-2 project % echo "console.log('javascript works!');" > src/program.js
barbari@baraahs-MBP-2 project % node src/program.js
javascript works!
barbari@baraahs-MBP-2 project % git add .
barbari@baraahs-MBP-2 project % git commit -m "changed program to JScript and added console.log"
[main e96f04b] changed program to JScript and added console.log
 2 files changed, 1 insertion(+)
 delete mode 100644 src/program.java
 create mode 100644 src/program.js
barbari@baraahs-MBP-2 project % ls ~
Applications		Pictures		iCloud Drive (Archive)
CAPSTONE1		Public			index
Desktop			PycharmProjects		library_system
Documents		app2			libraryweb2
Downloads		eclipse			myWebLibrary
Library			eclipse-workspace	myWebLibrary.zip
LibraryWebProgramming 	file1.txt		myapp
Movies			file2.txt		project
Music			flask web app		project_flask.zip
Notebook python 	hello.js		user
barbari@baraahs-MBP-2 project % echo "All done!"
dquote> 
barbari@baraahs-MBP-2 project % cd ~/project

barbari@baraahs-MBP-2 project % cd ~/project
barbari@baraahs-MBP-2 project % echo "All done"
All done

