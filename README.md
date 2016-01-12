# Welcome to Kudu Examples

This project shows off the main features of KuduJS. View examples [here](http://kudujs.github.io/kudu-examples/).

Run
---
You can run the examples on __node express__ as follows:

```
1. navigate to the _web_ folder, 
2. run 'web>npm install' to download the node modules
3. run 'web>node server' to start the express server and open a browser window at the examples url
```

Build
-----
To build kudu examples, perform the following steps:

```
cd kudujs
git clone https://github.com/kudujs/kudu-examples.git
git clone https://github.com/kudujs/kudu-examples.git --branch gh-pages kudu-examples-pages
cd kudu-examples/jsbuild
npm install
node build
```

"node build" will create an optimized version of the examples and copy the output to the folder 'build/web/'.

The output will also be copied to the project 'kudu-examples-pages'.
The 'kudu-examples-pages' project can be committed to Github which deploys the examples at the url: http://kudujs.github.io/kudu-examples/.

Windows Symlink problem
-----------------------
Kudu-examples has a symbolic link to kudu sources. If you run "node build" and receive the following error:
```
Error: EPERM: operation not permitted, symlink 
```
it means the user does not have permission to create symbolic links.

Solution is to run the "node build" script as an administrator, "Window Start -> cmd -> right click -> run as administrator