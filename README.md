# Experimental command line for Decentralized Web Nodes

This can be used for DID to DID messaging/communication from the command line. And is a showcase for the api.

## Installation

`npm install`

(optional): add `./bin` to your path.


## Usage

It's a command line (you can read through the JS if you wanted to make it a web app)

```
./bin/heyo

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  add
  get
  resolve
  send
  show            shows you things
  help [command]  display help for command
```

The first time it runs it will create a "DID" for you in `./etc`. It has an endpoint pre-set for DWNs so others can reach you.

You can get the did with:

`./bin/heyo get did`

Send this did to a friend, and they can drop you a message: 

`./bin/heyo send dm`

And then put in the did of the person you want to send a message to.

To read any conversations: 

`./bin/heyo show conversations`

## Interesting code

The protocol used is in `resources` - and have a poke around `src` and especially `src/lib`.