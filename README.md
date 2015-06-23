# [Pellet](http://.github.io/pellet)

Demo project for Vevo + San Francisco ReactJS meetup

The presentation can be found at [Pellet -VEVO](https://prezi.com/kjiwtdfknktj/pellet-vevo/)

## Installation

This demo requires orientdb and the sample MovieRatings database. You can download orientdb at orientdb.com.

```
$ git clone https://github.com/Rebelizer/pellet-meetup-demo.git
$ cd pellet-meetup-demo
$ npm i
```

orientdb is a good neighbor, so it installs it self into a single directory. To uninstall/delete orientdb just delete that directory and all traces and database will be deleted. orientdb does not store any files outside of this directory.

```
visit http://orientdb.com/download/
or
$ wget "http://orientdb.com/download.php?email=unknown@unknown.com&file=orientdb-community-2.0.11.tar.gz&os=mac" -O orientdb-community-2.0.11.tar.gz
$ tar -xvf orientdb-community-2.0.11.tar.gz
$ cd orientdb-community-2.0.11
$ ./bin/server.sh
type in a root password at:
Root password [BLANK=auto generate it]: myrootpass
```

Before using the demo, please start orientdb via ./bin/server.sh and visit http://127.0.0.1:2480. At this point, you can download/install the MovieRatings database. Click on the download button (the button with a cloud and down arrow next to the red trash can). Then pick MovieRatings database.

Now you have the database installed and running. You will need to update the ./config/common.json with the database user/pass. Just look for "orientdb": {...} and update it with you user/pass/host/port.

Now you can start the demo via pellet
```
$ pellet run --watch --clean
```

I have also included a simple shell script to make walking throw the demo easy. Just include the ./bin/git-demo into your path or copy the script to your ~/bin /usr/local/bin etc.

Then you can list all the step in the presentation via:
```
$ git demo
```

And you can jump to any step via:

```
$ git demo 3
```
